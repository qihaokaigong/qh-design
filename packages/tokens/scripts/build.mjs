import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const sourceRoot = path.join(packageRoot, "src");
const outputRoot = path.join(packageRoot, "dist");

await mkdir(outputRoot, { recursive: true });
await Promise.all([
  copyFile(
    path.join(sourceRoot, "theme.css"),
    path.join(outputRoot, "theme.css"),
  ),
  copyFile(
    path.join(sourceRoot, "tailwind.css"),
    path.join(outputRoot, "tailwind.css"),
  ),
]);

const themeCss = await readFile(path.join(sourceRoot, "theme.css"), "utf8");
const tokens = Object.fromEntries(
  [...themeCss.matchAll(/(--qh-[a-z0-9-]+):\s*([^;]+);/g)].map((match) => [
    match[1],
    match[2].replace(/\s+/g, " ").trim(),
  ]),
);

await writeFile(
  path.join(outputRoot, "tokens.json"),
  `${JSON.stringify({ version: "1.0.0", tokens }, null, 2)}\n`,
);
