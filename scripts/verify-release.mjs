import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageDirectories = [
  path.join(root, "packages/tokens"),
  path.join(root, "packages/react"),
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
  const exportTargets = collectExportTargets(manifest.exports).map((target) =>
    target.replace(/^\.\//, ""),
  );

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

  for (const target of exportTargets) {
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

  for (const target of exportTargets) {
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
const registry = await readJson(path.join(root, "registry/registry.json"));
const generatedRegistryRoot = path.join(root, "apps/storybook/public/r");
const builtStorybookRoot = path.join(root, "apps/storybook/storybook-static");

for (const item of registry.items) {
  assert(
    item.dependencies?.includes("@qh-design/react@^" + reactPackage.version),
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

console.log(
  JSON.stringify(
    {
      packages,
      registryItems: registry.items.length,
      ssrImport: "passed",
      staticDocumentation: "passed",
    },
    null,
    2,
  ),
);
