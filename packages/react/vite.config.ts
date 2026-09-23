import react from "@vitejs/plugin-react";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import preserveDirectives from "rollup-preserve-directives";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const componentsRoot = path.join(packageRoot, "src/components");
const componentEntries = Object.fromEntries(
  readdirSync(componentsRoot, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        existsSync(path.join(componentsRoot, entry.name, "index.ts")),
    )
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((entry) => [
      `components/${entry.name}/index`,
      path.join(componentsRoot, entry.name, "index.ts"),
    ]),
);

const externalPackages = new Set([
  "react",
  "react-dom",
  "react/jsx-runtime",
  "class-variance-authority",
  "clsx",
  "lucide-react",
  "radix-ui",
  "react-aria-components",
  "@internationalized/date",
]);

export default defineConfig({
  plugins: [react(), preserveDirectives()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: path.join(packageRoot, "src/index.ts"),
        ...componentEntries,
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: (id) =>
        externalPackages.has(id) ||
        id.startsWith("radix-ui/") ||
        id.startsWith("react-aria-components/"),
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
