import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import preserveDirectives from "rollup-preserve-directives";

const externalPackages = new Set([
  "react",
  "react-dom",
  "react/jsx-runtime",
  "class-variance-authority",
  "clsx",
  "lucide-react",
  "radix-ui",
]);

export default defineConfig({
  plugins: [react(), preserveDirectives()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      cssFileName: "components",
    },
    rollupOptions: {
      external: (id) => externalPackages.has(id) || id.startsWith("radix-ui/"),
      output: {
        entryFileNames: "[name].js",
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
