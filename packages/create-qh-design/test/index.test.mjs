import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  QH_REGISTRY_URL,
  configureRegistry,
  detectPackageManager,
  doctorProject,
  initProject,
  installCommand,
  syncProject,
} from "../src/index.mjs";

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "qh-design-test-"));
  const projectRoot = path.join(root, "project");
  const reactPackageRoot = path.join(root, "react-package");
  await mkdir(projectRoot, { recursive: true });
  await mkdir(path.join(reactPackageRoot, "skills/qh-design/references"), {
    recursive: true,
  });
  await writeFile(
    path.join(projectRoot, "package.json"),
    `${JSON.stringify(
      {
        name: "fixture",
        dependencies: {
          "@qhkg/react": "0.2.0",
          "@qhkg/tokens": "0.2.0",
        },
      },
      null,
      2,
    )}\n`,
  );
  await writeFile(
    path.join(reactPackageRoot, "skills/qh-design/SKILL.md"),
    "---\nname: qh-design\ndescription: fixture\n---\n",
  );
  await writeFile(
    path.join(reactPackageRoot, "skills/qh-design/references/manifest.json"),
    `${JSON.stringify({
      designSystem: "QH Design",
      componentVersion: "0.2.0",
    })}\n`,
  );
  return {
    projectRoot,
    reactPackageRoot,
    cleanup: () => rm(root, { force: true, recursive: true }),
  };
}

test("selects a package manager without detecting a framework", async () => {
  const { projectRoot, cleanup } = await fixture();
  try {
    await writeFile(
      path.join(projectRoot, "pnpm-lock.yaml"),
      "lockfileVersion: 9\n",
    );
    assert.equal(await detectPackageManager(projectRoot, {}), "pnpm");
    assert.deepEqual(installCommand("pnpm"), {
      command: "pnpm",
      args: ["add", "@qhkg/react@latest", "@qhkg/tokens@latest"],
    });
  } finally {
    await cleanup();
  }
});

test("adds the Registry namespace to existing components.json", async () => {
  const { projectRoot, cleanup } = await fixture();
  try {
    await writeFile(
      path.join(projectRoot, "components.json"),
      `${JSON.stringify({ registries: { "@other": "https://example.com/{name}" } }, null, 2)}\n`,
    );
    const registryFile = await configureRegistry(projectRoot);
    const configured = JSON.parse(await readFile(registryFile, "utf8"));
    assert.equal(configured.registries["@qh"], QH_REGISTRY_URL);
    assert.equal(configured.registries["@other"], "https://example.com/{name}");
  } finally {
    await cleanup();
  }
});

test("sync installs versioned context without editing application source", async () => {
  const { projectRoot, reactPackageRoot, cleanup } = await fixture();
  try {
    await mkdir(path.join(projectRoot, "src"));
    const sourcePath = path.join(projectRoot, "src/main.tsx");
    await writeFile(sourcePath, "export const untouched = true;\n");
    const before = await readFile(sourcePath, "utf8");

    const result = await syncProject({ projectRoot, reactPackageRoot });
    const repeated = await syncProject({ projectRoot, reactPackageRoot });

    assert.equal(result.componentVersion, "0.2.0");
    assert.equal(repeated.componentVersion, "0.2.0");
    assert.equal(
      await readFile(
        path.join(projectRoot, ".agents/skills/qh-design/SKILL.md"),
        "utf8",
      ),
      "---\nname: qh-design\ndescription: fixture\n---\n",
    );
    assert.equal(await readFile(sourcePath, "utf8"), before);
  } finally {
    await cleanup();
  }
});

test("doctor verifies package, Registry, and matching Skill versions", async () => {
  const { projectRoot, reactPackageRoot, cleanup } = await fixture();
  try {
    const installedRoot = path.join(projectRoot, "node_modules/@qhkg/react");
    await mkdir(installedRoot, { recursive: true });
    await writeFile(
      path.join(installedRoot, "package.json"),
      `${JSON.stringify({ name: "@qhkg/react", version: "0.2.0" })}\n`,
    );
    await syncProject({ projectRoot, reactPackageRoot });

    const report = await doctorProject(projectRoot);

    assert.deepEqual(report.errors, []);
    assert.equal(report.installedVersion, "0.2.0");
    assert.equal(report.skillVersion, "0.2.0");
  } finally {
    await cleanup();
  }
});

test("init installs dependencies before deterministic sync", async () => {
  const { projectRoot, reactPackageRoot, cleanup } = await fixture();
  try {
    const calls = [];
    const result = await initProject({
      projectRoot,
      packageManager: "npm",
      reactPackageRoot,
      install: async (...args) => calls.push(args),
    });
    assert.deepEqual(calls, [[projectRoot, "npm"]]);
    assert.equal(result.skillDirectory, ".agents/skills/qh-design");
  } finally {
    await cleanup();
  }
});
