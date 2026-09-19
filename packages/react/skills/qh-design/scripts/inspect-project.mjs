#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const STYLE_IMPORT_PATTERN =
  /(?:import\s*["']@qhkg\/react\/styles\.css["']|@import\s*["']@qhkg\/react\/styles\.css["'])/;
const SOURCE_EXTENSIONS = new Set([
  ".cjs",
  ".css",
  ".js",
  ".jsx",
  ".less",
  ".mjs",
  ".sass",
  ".scss",
  ".ts",
  ".tsx",
]);
const IGNORED_DIRECTORIES = new Set([
  ".git",
  ".agents",
  ".next",
  ".turbo",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "storybook-static",
]);

function parseCwd(argv) {
  const index = argv.indexOf("--cwd");
  if (index === -1) return process.cwd();
  if (!argv[index + 1]) throw new Error("--cwd requires a directory");
  return path.resolve(argv[index + 1]);
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function packageManagerFrom(projectPackage, fileNames) {
  if (typeof projectPackage.packageManager === "string") {
    return projectPackage.packageManager.split("@")[0];
  }
  if (fileNames.has("pnpm-lock.yaml")) return "pnpm";
  if (fileNames.has("yarn.lock")) return "yarn";
  if (fileNames.has("bun.lock") || fileNames.has("bun.lockb")) return "bun";
  if (fileNames.has("package-lock.json")) return "npm";
  return "unknown";
}

async function resolveInstalledPackage(projectRoot, packageName) {
  let current = projectRoot;
  const packageSegments = packageName.split("/");
  while (true) {
    const manifestPath = path.join(
      current,
      "node_modules",
      ...packageSegments,
      "package.json",
    );
    try {
      const manifest = await readJson(manifestPath);
      if (manifest.name === packageName) return { manifest, manifestPath };
    } catch {
      // Continue through Node's parent node_modules lookup locations.
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return null;
}

async function findStyleImports(directory, projectRoot, matches = []) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && IGNORED_DIRECTORIES.has(entry.name)) continue;
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await findStyleImports(entryPath, projectRoot, matches);
      continue;
    }

    if (!SOURCE_EXTENSIONS.has(path.extname(entry.name))) continue;
    const source = await readFile(entryPath, "utf8");
    if (STYLE_IMPORT_PATTERN.test(source)) {
      matches.push(path.relative(projectRoot, entryPath));
    }
  }

  return matches;
}

export async function inspectProject(projectRoot) {
  const resolvedRoot = path.resolve(projectRoot);
  const projectPackage = await readJson(
    path.join(resolvedRoot, "package.json"),
  );
  const rootEntries = new Set(await readdir(resolvedRoot));
  const installedReact = await resolveInstalledPackage(
    resolvedRoot,
    "@qhkg/react",
  );
  const dependencyGroups = [
    projectPackage.dependencies,
    projectPackage.devDependencies,
    projectPackage.peerDependencies,
  ].filter(Boolean);
  const declaredVersion = dependencyGroups
    .map((group) => group["@qhkg/react"])
    .find(Boolean);
  const registry = rootEntries.has("components.json")
    ? (await readJson(path.join(resolvedRoot, "components.json"))).registries
    : projectPackage.registries;
  const skillManifest = await readJson(
    path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../references/manifest.json",
    ),
  );
  const instructionCandidates = [
    "AGENTS.md",
    "CLAUDE.md",
    ".github/copilot-instructions.md",
  ];
  const instructionChecks = await Promise.all(
    instructionCandidates.map(async (file) => ({
      file,
      exists: await fileExists(path.join(resolvedRoot, file)),
    })),
  );

  return {
    projectRoot: resolvedRoot,
    packageName: projectPackage.name ?? null,
    packageManager: packageManagerFrom(projectPackage, rootEntries),
    qhDesign: {
      declaredReactVersion: declaredVersion ?? null,
      installedReactVersion: installedReact?.manifest.version ?? null,
      skillContextVersion: skillManifest.componentVersion,
      registryConfigured:
        registry?.["@qh"] === "https://design.qihao.dev/r/{name}.json",
      styleImportFiles: await findStyleImports(resolvedRoot, resolvedRoot),
    },
    projectInstructions: instructionChecks
      .filter((entry) => entry.exists)
      .map((entry) => entry.file),
  };
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) ===
    path.resolve(fileURLToPath(import.meta.url));

if (isMain) {
  try {
    console.log(
      JSON.stringify(await inspectProject(parseCwd(process.argv)), null, 2),
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
