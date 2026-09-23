import ts from "typescript";
import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourceRoot = path.join(packageRoot, "src");
const sourceComponentsRoot = path.join(sourceRoot, "components");
const distRoot = path.join(packageRoot, "dist");
const distAssetsRoot = path.join(distRoot, "assets");
const componentStylesRoot = path.join(distRoot, "component-styles");
const tokensTheme = path.resolve(packageRoot, "../tokens/src/theme.css");

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? listFiles(file) : [file];
    }),
  );
  return files.flat().sort((left, right) => left.localeCompare(right));
}

async function resolveLocalModule(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const hasSourceExtension = [".css", ".ts", ".tsx"].includes(
    path.extname(base),
  );
  const candidates = hasSourceExtension
    ? [base]
    : [
        `${base}.ts`,
        `${base}.tsx`,
        path.join(base, "index.ts"),
        path.join(base, "index.tsx"),
      ];

  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }

  throw new Error(`Cannot resolve ${specifier} from ${fromFile}`);
}

function localSpecifiers(source, file) {
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
  );
  const specifiers = [];

  for (const statement of sourceFile.statements) {
    if (
      (ts.isImportDeclaration(statement) ||
        ts.isExportDeclaration(statement)) &&
      statement.moduleSpecifier &&
      ts.isStringLiteral(statement.moduleSpecifier) &&
      statement.moduleSpecifier.text.startsWith(".")
    ) {
      specifiers.push(statement.moduleSpecifier.text);
    }
  }

  return specifiers;
}

function cssAssetFor(sourceCss) {
  const relative = path.relative(sourceRoot, sourceCss);
  return path.join(distAssetsRoot, relative);
}

function cssImport(fromFile, targetFile) {
  let relative = path.relative(path.dirname(fromFile), targetFile);
  if (!relative.startsWith(".")) relative = `./${relative}`;
  return `@import ${JSON.stringify(relative.split(path.sep).join("/"))};`;
}

async function collectComponentStyles(entryFile) {
  const visitedModules = new Set();
  const styles = [];
  const seenStyles = new Set();

  async function visit(file) {
    if (visitedModules.has(file)) return;
    visitedModules.add(file);

    const source = await readFile(file, "utf8");
    for (const specifier of localSpecifiers(source, file)) {
      const dependency = await resolveLocalModule(file, specifier);
      if (dependency.endsWith(".css")) {
        const asset = cssAssetFor(dependency);
        if (!(await fileExists(asset))) {
          throw new Error(`Vite did not emit CSS asset for ${dependency}`);
        }
        if (!seenStyles.has(asset)) {
          seenStyles.add(asset);
          styles.push(asset);
        }
      } else {
        await visit(dependency);
      }
    }
  }

  await visit(entryFile);
  return styles;
}

const componentDirectories = (
  await readdir(sourceComponentsRoot, {
    withFileTypes: true,
  })
)
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right));
const allCssAssets = (await listFiles(distAssetsRoot)).filter((file) =>
  file.endsWith(".css"),
);

await mkdir(componentStylesRoot, { recursive: true });
await writeFile(path.join(distRoot, "theme.css"), await readFile(tokensTheme));

const componentsCssFile = path.join(distRoot, "components.css");
await writeFile(
  componentsCssFile,
  `${allCssAssets.map((file) => cssImport(componentsCssFile, file)).join("\n")}\n`,
);

const stylesCssFile = path.join(distRoot, "styles.css");
await writeFile(
  stylesCssFile,
  `${cssImport(stylesCssFile, path.join(distRoot, "theme.css"))}\n${cssImport(
    stylesCssFile,
    componentsCssFile,
  )}\n`,
);

for (const componentName of componentDirectories) {
  const entryFile = path.join(sourceComponentsRoot, componentName, "index.ts");
  if (!(await fileExists(entryFile))) continue;

  const outputFile = path.join(componentStylesRoot, `${componentName}.css`);
  const styles = await collectComponentStyles(entryFile);
  await writeFile(
    outputFile,
    styles.length
      ? `${styles.map((file) => cssImport(outputFile, file)).join("\n")}\n`
      : "/* This component has no component-specific styles. */\n",
  );
}
