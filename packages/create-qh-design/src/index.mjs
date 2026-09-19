import { spawn } from "node:child_process";
import {
  access,
  cp,
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

export const QH_REACT_PACKAGE = "@qhkg/react";
export const QH_TOKENS_PACKAGE = "@qhkg/tokens";
export const QH_REGISTRY_URL = "https://design.qihao.dev/r/{name}.json";

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function readProject(projectRoot) {
  const resolvedRoot = path.resolve(projectRoot);
  const manifestPath = path.join(resolvedRoot, "package.json");
  if (!(await exists(manifestPath))) {
    throw new Error(
      `No package.json found in ${resolvedRoot}. Create the React + TypeScript project first, then run this command from its root.`,
    );
  }
  return {
    manifest: await readJson(manifestPath),
    manifestPath,
    projectRoot: resolvedRoot,
  };
}

export async function detectPackageManager(projectRoot, manifest) {
  const configured = manifest.packageManager?.split("@")[0];
  if (["pnpm", "npm", "yarn", "bun"].includes(configured)) return configured;

  const entries = new Set(await readdir(projectRoot));
  if (entries.has("pnpm-lock.yaml")) return "pnpm";
  if (entries.has("yarn.lock")) return "yarn";
  if (entries.has("bun.lock") || entries.has("bun.lockb")) return "bun";
  if (entries.has("package-lock.json")) return "npm";
  return "npm";
}

export function installCommand(packageManager) {
  const packages = [
    `${QH_REACT_PACKAGE}@latest`,
    `${QH_TOKENS_PACKAGE}@latest`,
  ];
  const commands = {
    bun: { command: "bun", args: ["add", ...packages] },
    npm: { command: "npm", args: ["install", ...packages] },
    pnpm: { command: "pnpm", args: ["add", ...packages] },
    yarn: { command: "yarn", args: ["add", ...packages] },
  };
  if (!commands[packageManager]) {
    throw new Error(
      `Unsupported package manager ${packageManager}. Use pnpm, npm, yarn, or bun.`,
    );
  }
  return commands[packageManager];
}

async function runInstall(projectRoot, packageManager) {
  const { command, args } = installCommand(packageManager);
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: projectRoot, stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} failed (${signal ?? `exit ${code}`})`));
    });
  });
}

export async function resolvePackageRoot(projectRoot, packageName) {
  let current = path.resolve(projectRoot);
  const packageSegments = packageName.split("/");
  while (true) {
    const packageRoot = path.join(current, "node_modules", ...packageSegments);
    const manifestPath = path.join(packageRoot, "package.json");
    if (await exists(manifestPath)) {
      const manifest = await readJson(manifestPath);
      if (manifest.name === packageName) return packageRoot;
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  throw new Error(
    `${packageName} is not installed from ${projectRoot}. Run the init command first.`,
  );
}

function jsonIndent(source) {
  const match = source.match(/\n([\t ]+)\S/);
  return match?.[1] ?? "  ";
}

async function writeJson(file, value, source) {
  const temporary = `${file}.qh-design-${process.pid}-${Date.now()}`;
  const contents = `${JSON.stringify(value, null, jsonIndent(source))}\n`;
  await writeFile(temporary, contents);
  await rename(temporary, file);
}

export async function configureRegistry(projectRoot) {
  const componentsPath = path.join(projectRoot, "components.json");
  const registryFile = (await exists(componentsPath))
    ? componentsPath
    : path.join(projectRoot, "package.json");
  const source = await readFile(registryFile, "utf8");
  const contents = JSON.parse(source);
  contents.registries = {
    ...(contents.registries ?? {}),
    "@qh": QH_REGISTRY_URL,
  };
  await writeJson(registryFile, contents, source);
  return registryFile;
}

async function assertManagedSkill(destination) {
  if (!(await exists(destination))) return;
  const manifestPath = path.join(destination, "references/manifest.json");
  try {
    const manifest = await readJson(manifestPath);
    if (manifest.designSystem === "QH Design") return;
  } catch {
    // Refuse to replace an unknown directory, including malformed content.
  }
  throw new Error(
    `${destination} already exists but is not a managed QH Design Skill. Move or rename it before syncing.`,
  );
}

export async function installSkill(projectRoot, reactPackageRoot) {
  const source = path.join(reactPackageRoot, "skills/qh-design");
  const sourceManifest = await readJson(
    path.join(source, "references/manifest.json"),
  );
  const parent = path.join(projectRoot, ".agents/skills");
  const destination = path.join(parent, "qh-design");
  const operationId = `${process.pid}-${Date.now()}`;
  const staging = path.join(parent, `.qh-design-staging-${operationId}`);
  const backup = path.join(parent, `.qh-design-backup-${operationId}`);

  await assertManagedSkill(destination);
  await mkdir(parent, { recursive: true });
  await rm(staging, { force: true, recursive: true });
  await cp(source, staging, { recursive: true });

  const hadDestination = await exists(destination);
  try {
    if (hadDestination) await rename(destination, backup);
    await rename(staging, destination);
    if (hadDestination) await rm(backup, { force: true, recursive: true });
  } catch (error) {
    await rm(staging, { force: true, recursive: true });
    if (
      hadDestination &&
      (await exists(backup)) &&
      !(await exists(destination))
    ) {
      await rename(backup, destination);
    }
    throw error;
  }

  return {
    componentVersion: sourceManifest.componentVersion,
    skillDirectory: destination,
  };
}

export async function syncProject({ projectRoot, reactPackageRoot }) {
  const project = await readProject(projectRoot);
  const packageRoot =
    reactPackageRoot ??
    (await resolvePackageRoot(project.projectRoot, QH_REACT_PACKAGE));
  const [registryFile, skill] = await Promise.all([
    configureRegistry(project.projectRoot),
    installSkill(project.projectRoot, packageRoot),
  ]);
  return {
    projectRoot: project.projectRoot,
    registryFile: path.relative(project.projectRoot, registryFile),
    skillDirectory: path.relative(project.projectRoot, skill.skillDirectory),
    componentVersion: skill.componentVersion,
  };
}

export async function initProject({
  projectRoot,
  packageManager,
  install = runInstall,
  reactPackageRoot,
}) {
  const project = await readProject(projectRoot);
  const selectedPackageManager =
    packageManager ??
    (await detectPackageManager(project.projectRoot, project.manifest));
  installCommand(selectedPackageManager);
  await install(project.projectRoot, selectedPackageManager);
  return syncProject({
    projectRoot: project.projectRoot,
    reactPackageRoot,
  });
}

function declaredDependency(manifest, packageName) {
  return (
    manifest.dependencies?.[packageName] ??
    manifest.devDependencies?.[packageName] ??
    manifest.peerDependencies?.[packageName] ??
    null
  );
}

export async function doctorProject(projectRoot) {
  const project = await readProject(projectRoot);
  const errors = [];
  const warnings = [];
  const reactRange = declaredDependency(project.manifest, QH_REACT_PACKAGE);
  const tokensRange = declaredDependency(project.manifest, QH_TOKENS_PACKAGE);
  if (!reactRange) errors.push(`${QH_REACT_PACKAGE} is not declared`);
  if (!tokensRange) errors.push(`${QH_TOKENS_PACKAGE} is not declared`);

  let installedVersion = null;
  try {
    const packageRoot = await resolvePackageRoot(
      project.projectRoot,
      QH_REACT_PACKAGE,
    );
    installedVersion = (await readJson(path.join(packageRoot, "package.json")))
      .version;
  } catch {
    errors.push(`${QH_REACT_PACKAGE} is not installed`);
  }

  const skillManifestPath = path.join(
    project.projectRoot,
    ".agents/skills/qh-design/references/manifest.json",
  );
  let skillVersion = null;
  try {
    skillVersion = (await readJson(skillManifestPath)).componentVersion;
  } catch {
    errors.push("The project-local qh-design Skill is not installed");
  }
  if (installedVersion && skillVersion && installedVersion !== skillVersion) {
    errors.push(
      `Skill context ${skillVersion} does not match installed ${QH_REACT_PACKAGE} ${installedVersion}`,
    );
  }

  const componentsPath = path.join(project.projectRoot, "components.json");
  const registryOwner = (await exists(componentsPath))
    ? await readJson(componentsPath)
    : project.manifest;
  if (registryOwner.registries?.["@qh"] !== QH_REGISTRY_URL) {
    errors.push("The @qh Registry namespace is not configured");
  }

  warnings.push(
    "Application source integration is project-owned; use $qh-design to verify the stylesheet entry and implementation.",
  );
  return {
    projectRoot: project.projectRoot,
    packageManager: await detectPackageManager(
      project.projectRoot,
      project.manifest,
    ),
    dependencies: {
      [QH_REACT_PACKAGE]: reactRange,
      [QH_TOKENS_PACKAGE]: tokensRange,
    },
    installedVersion,
    skillVersion,
    errors,
    warnings,
  };
}

export function formatDoctorReport(report) {
  const lines = [
    `QH Design doctor: ${report.errors.length === 0 ? "ready" : "needs attention"}`,
    `Project: ${report.projectRoot}`,
    `Package manager: ${report.packageManager}`,
    `Installed component version: ${report.installedVersion ?? "missing"}`,
    `Installed Skill context: ${report.skillVersion ?? "missing"}`,
  ];
  if (report.errors.length > 0) {
    lines.push("", "Errors:", ...report.errors.map((error) => `- ${error}`));
  }
  if (report.warnings.length > 0) {
    lines.push(
      "",
      "Next project-owned step:",
      ...report.warnings.map((warning) => `- ${warning}`),
    );
  }
  return lines.join("\n");
}
