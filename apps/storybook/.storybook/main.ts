import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const reactSource = fileURLToPath(
  new URL("../../../packages/react/src/index.ts", import.meta.url),
);

const config: StorybookConfig = {
  stories: [
    "../../../packages/react/src/**/*.stories.@(ts|tsx|mdx)",
    "../../../registry/**/*.stories.@(ts|tsx|mdx)",
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-mcp",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  features: {
    componentsManifest: true,
  },
  async viteFinal(config) {
    config.plugins ??= [];
    config.plugins.push(tailwindcss());
    config.resolve ??= {};
    const aliases = config.resolve.alias ?? [];
    config.resolve.alias = [
      ...(Array.isArray(aliases)
        ? aliases
        : Object.entries(aliases).map(([find, replacement]) => ({
            find,
            replacement,
          }))),
      { find: /^@qhkg\/react$/, replacement: reactSource },
    ];
    config.optimizeDeps ??= {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include ?? []),
      "lucide-react",
      "radix-ui",
    ];
    return config;
  },
};

export default config;
