import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageDirectories = [
  path.join(root, "packages/tokens"),
  path.join(root, "packages/react"),
  path.join(root, "packages/create-qh-design"),
];

function collectExportTargets(value) {
  if (typeof value === "string") return [value];
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap(collectExportTargets);
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function assertFile(file, message) {
  await assert.doesNotReject(access(file), undefined, message);
}

async function verifyPackage(packageDirectory) {
  const manifest = await readJson(path.join(packageDirectory, "package.json"));
  const exportTargets = collectExportTargets(manifest.exports)
    .map((target) => target.replace(/^\.\//, ""))
    .filter((target) => !target.includes("*"));
  const binTargets = Object.values(manifest.bin ?? {}).map((target) =>
    target.replace(/^\.\//, ""),
  );
  const packageTargets = [...exportTargets, ...binTargets];

  assert.equal(
    manifest.publishConfig?.access,
    "public",
    manifest.name + " must publish with public access",
  );
  assert.equal(
    manifest.publishConfig?.provenance,
    true,
    manifest.name + " must request npm provenance",
  );

  for (const target of packageTargets) {
    await assertFile(
      path.join(packageDirectory, target),
      manifest.name + " is missing export target " + target,
    );
  }

  const { stdout } = await execFileAsync(
    "npm",
    ["pack", "--dry-run", "--json"],
    { cwd: packageDirectory, maxBuffer: 10 * 1024 * 1024 },
  );
  const [pack] = JSON.parse(stdout);
  const packedPaths = new Set(pack.files.map((file) => file.path));

  for (const target of packageTargets) {
    assert(
      packedPaths.has(target),
      manifest.name + " tarball is missing export target " + target,
    );
  }

  assert(
    !pack.files.some((file) =>
      /\.(stories|test)\.[cm]?[jt]sx?$/.test(file.path),
    ),
    manifest.name + " tarball contains test or Storybook source",
  );

  return {
    entries: pack.entryCount,
    name: manifest.name,
    size: pack.size,
    version: manifest.version,
  };
}

const packages = [];
for (const packageDirectory of packageDirectories) {
  packages.push(await verifyPackage(packageDirectory));
}

const reactPackage = await readJson(
  path.join(root, "packages/react/package.json"),
);
const skillManifest = await readJson(
  path.join(root, "packages/react/skills/qh-design/references/manifest.json"),
);
assert.equal(
  skillManifest.componentVersion,
  reactPackage.version,
  "Packaged QH Design Skill must match the React package version",
);
const registry = await readJson(path.join(root, "registry/registry.json"));
const generatedRegistryRoot = path.join(root, "apps/storybook/public/r");
const builtStorybookRoot = path.join(root, "apps/storybook/storybook-static");

for (const item of registry.items) {
  assert(
    item.dependencies?.includes("@qhkg/react@^" + reactPackage.version),
    item.name + " must pin the current compatible React package range",
  );

  const generatedItem = await readJson(
    path.join(generatedRegistryRoot, item.name + ".json"),
  );
  assert.equal(generatedItem.name, item.name);
  assert(generatedItem.files?.every((file) => file.content?.length > 0));

  await assertFile(
    path.join(builtStorybookRoot, "r", item.name + ".json"),
    "Storybook build is missing Registry item " + item.name,
  );
}

for (const publicFile of [
  "llms.txt",
  "llms-full.txt",
  "qh-components.json",
  "r/registry.json",
]) {
  await assertFile(
    path.join(builtStorybookRoot, publicFile),
    "Storybook build is missing " + publicFile,
  );
}

const llms = await readFile(
  path.join(root, "apps/storybook/public/llms.txt"),
  "utf8",
);
assert(
  registry.items.every((item) => llms.includes("/r/" + item.name + ".json")),
  "AI index does not include every Registry pattern",
);

await import(
  pathToFileURL(path.join(root, "packages/react/dist/index.js")).href +
    "?release-verify"
);

const reactPack = packages.find((entry) => entry.name === "@qhkg/react");
assert(reactPack, "React package verification result is missing");

const { stdout: reactPackOutput } = await execFileAsync(
  "npm",
  ["pack", "--dry-run", "--json"],
  { cwd: path.join(root, "packages/react"), maxBuffer: 10 * 1024 * 1024 },
);
const [packedReact] = JSON.parse(reactPackOutput);
const packedReactPaths = new Set(packedReact.files.map((file) => file.path));
assert(
  packedReact.files.some((file) => file.path === "skills/qh-design/SKILL.md"),
  "React tarball is missing the QH Design Skill",
);

assert.deepEqual(
  reactPackage.exports["./*"],
  {
    types: "./dist/components/*/index.d.ts",
    import: "./dist/components/*/index.js",
  },
  "React package must expose stable component JavaScript subpaths",
);
assert.equal(
  reactPackage.exports["./*.css"],
  "./dist/component-styles/*.css",
  "React package must expose stable component CSS subpaths",
);

const componentEntries = (
  await readdir(path.join(root, "packages/react/src/components"), {
    withFileTypes: true,
  })
)
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right));

for (const componentName of componentEntries) {
  for (const target of [
    `dist/components/${componentName}/index.js`,
    `dist/components/${componentName}/index.d.ts`,
    `dist/component-styles/${componentName}.css`,
  ]) {
    await assertFile(
      path.join(root, "packages/react", target),
      `React package is missing on-demand target ${target}`,
    );
    assert(
      packedReactPaths.has(target),
      `React tarball is missing on-demand target ${target}`,
    );
  }
}

await import("@qhkg/react/avatar");
await import(
  pathToFileURL(path.join(root, "packages/react/scripts/verify-bundle.mjs"))
    .href + "?release-verify"
);

console.log(
  JSON.stringify(
    {
      packages,
      registryItems: registry.items.length,
      onDemandComponents: componentEntries.length,
      onDemandExports: "passed",
      ssrImport: "passed",
      staticDocumentation: "passed",
    },
    null,
    2,
  ),
);
