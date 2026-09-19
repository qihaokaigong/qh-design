import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const tokensTheme = path.resolve(packageRoot, "../tokens/src/theme.css");
const componentsCss = path.join(packageRoot, "dist/components.css");

const [theme, components] = await Promise.all([
  readFile(tokensTheme, "utf8"),
  readFile(componentsCss, "utf8"),
]);

await writeFile(
  path.join(packageRoot, "dist/styles.css"),
  `${theme.trim()}\n\n${components.trim()}\n`,
);
