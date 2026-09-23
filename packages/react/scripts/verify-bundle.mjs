import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const virtualEntry = "virtual:qh-on-demand-entry";

const result = await build({
  configFile: false,
  logLevel: "silent",
  root: packageRoot,
  plugins: [
    {
      name: "qh-on-demand-entry",
      resolveId(id) {
        if (id === virtualEntry) return `\0${virtualEntry}`;
      },
      load(id) {
        if (id === `\0${virtualEntry}`) {
          return [
            'import "@qhkg/react/theme.css";',
            'import "@qhkg/react/avatar.css";',
            'export { Avatar } from "@qhkg/react/avatar";',
          ].join("\n");
        }
      },
    },
  ],
  build: {
    cssCodeSplit: false,
    minify: "esbuild",
    rollupOptions: {
      external: (id) =>
        id === "react" || id === "react-dom" || id === "react/jsx-runtime",
      input: virtualEntry,
      preserveEntrySignatures: "strict",
      output: {
        entryFileNames: "avatar.js",
        assetFileNames: "avatar[extname]",
      },
    },
    write: false,
  },
});

assert(!Array.isArray(result), "Bundle verification must produce one output");

const chunks = result.output.filter((output) => output.type === "chunk");
const cssAssets = result.output.filter(
  (output) => output.type === "asset" && output.fileName.endsWith(".css"),
);
const qhComponentModules = chunks
  .flatMap((chunk) => Object.keys(chunk.modules))
  .filter((id) => id.includes("/dist/components/"));
const unexpectedComponents = qhComponentModules.filter(
  (id) => !id.includes("/dist/components/avatar/"),
);
const javascriptBytes = chunks.reduce(
  (total, chunk) => total + Buffer.byteLength(chunk.code),
  0,
);
const cssBytes = cssAssets.reduce((total, asset) => {
  const source =
    typeof asset.source === "string"
      ? asset.source
      : Buffer.from(asset.source).toString("utf8");
  return total + Buffer.byteLength(source);
}, 0);
const componentAssetsRoot = path.join(packageRoot, "dist/assets/components");
const componentCssAssets = (
  await readdir(componentAssetsRoot, { recursive: true })
).filter((file) => file.endsWith(".css"));
const fullComponentsCssBytes = (
  await Promise.all(
    componentCssAssets.map(async (file) =>
      Buffer.byteLength(await readFile(path.join(componentAssetsRoot, file))),
    ),
  )
).reduce((total, size) => total + size, 0);

assert(qhComponentModules.length > 0, "Avatar bundle did not include Avatar");
assert.deepEqual(
  unexpectedComponents,
  [],
  `Avatar subpath included unrelated QH components:\n${unexpectedComponents.join("\n")}`,
);
assert(
  javascriptBytes <= 12 * 1024,
  `Avatar JavaScript exceeded the 12 KiB budget: ${javascriptBytes} bytes`,
);
assert(cssBytes > 0, "Avatar on-demand bundle did not emit CSS");
assert(
  cssBytes < fullComponentsCssBytes / 4,
  `Avatar CSS is not meaningfully smaller than the full component stylesheet: ${cssBytes} bytes`,
);

console.log(
  JSON.stringify(
    {
      component: "avatar",
      cssBytes,
      javascriptBytes,
      qhComponentModules: qhComponentModules.length,
      status: "passed",
    },
    null,
    2,
  ),
);
