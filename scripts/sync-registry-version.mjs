import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const reactPackage = JSON.parse(
  await readFile(path.join(root, "packages/react/package.json"), "utf8"),
);
const registryPath = path.join(root, "registry/registry.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const dependency = "@qhkg/react@^" + reactPackage.version;
let changed = false;

for (const item of registry.items) {
  item.dependencies = (item.dependencies ?? []).map((value) => {
    if (!value.startsWith("@qhkg/react@")) return value;
    if (value === dependency) return value;
    changed = true;
    return dependency;
  });
}

if (changed) {
  const formatted = await prettier.format(JSON.stringify(registry), {
    parser: "json",
  });
  await writeFile(registryPath, formatted);
}

console.log(
  changed
    ? "Updated Registry items to " + dependency + "."
    : "Registry items already use " + dependency + ".",
);
