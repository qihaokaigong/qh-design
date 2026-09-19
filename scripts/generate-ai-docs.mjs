import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import prettier from "prettier";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsRoot = path.join(root, "packages/react/src/components");
const publicRoot = path.join(root, "apps/storybook/public");
const registryPath = path.join(root, "registry/registry.json");
const schema = JSON.parse(
  await readFile(path.join(root, "schemas/component-meta.schema.json"), "utf8"),
);
const validate = new Ajv2020({ allErrors: true }).compile(schema);

async function collectMetadata(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const metadata = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      metadata.push(...(await collectMetadata(entryPath)));
    } else if (entry.name.endsWith(".meta.json")) {
      const value = JSON.parse(await readFile(entryPath, "utf8"));
      if (!validate(value)) {
        throw new Error(
          `Invalid component metadata at ${path.relative(root, entryPath)}:\n${JSON.stringify(validate.errors, null, 2)}`,
        );
      }
      metadata.push(value);
    }
  }

  return metadata;
}

const components = (await collectMetadata(componentsRoot)).sort((a, b) =>
  a.name.localeCompare(b.name),
);
const registry = JSON.parse(await readFile(registryPath, "utf8"));
const patterns = [...registry.items].sort((a, b) =>
  a.name.localeCompare(b.name),
);
const componentsJson = await prettier.format(JSON.stringify({ components }), {
  parser: "json",
});

const shortIndex = [
  "# QH Design System",
  "",
  "Public React component documentation: https://design.qihao.dev/",
  "Before using a component, inspect its API and examples through Storybook MCP or the linked docs.",
  "Do not invent props, colors, dark mode, or replacements for existing QH components.",
  "",
  ...components.map(
    (component) =>
      `- ${component.name}: ${component.summary} — https://design.qihao.dev/?path=/docs/${component.storybookId}--docs`,
  ),
  "",
  "## Registry patterns",
  "",
  "Install patterns through the public shadcn Registry. Inspect the pattern documentation and source before connecting application data or services.",
  "",
  ...patterns.map(
    (pattern) =>
      `- ${pattern.title}: ${pattern.description} — https://design.qihao.dev/r/${pattern.name}.json`,
  ),
];

const fullIndex = [
  ...shortIndex,
  "",
  "## Component guidance",
  "",
  ...components.flatMap((component) => [
    `### ${component.name}`,
    "",
    component.summary,
    "",
    `Import: \`${component.import}\``,
    `Status: ${component.status}`,
    "",
    `Use when: ${component.whenToUse.join("；")}`,
    `Avoid when: ${component.avoidWhen.join("；")}`,
    `Mobile: ${component.mobile.join("；")}`,
    `Accessibility: ${component.accessibility.join("；")}`,
    `Related: ${component.related.join(", ") || "None"}`,
    "",
  ]),
  "## Registry pattern guidance",
  "",
  "Configure the namespace with `pnpm dlx shadcn@latest registry add @qh=https://design.qihao.dev/r/{name}.json`, then install a pattern with `pnpm dlx shadcn@latest add @qh/<name>`.",
  "Registry patterns are application-owned source. Keep their QH component imports, then adapt business copy, state, validation, routing, and data access inside the consuming project.",
  "Import `@qhkg/react/styles.css` once in the application and include `@qhkg/tokens/tailwind.css` in the Tailwind v4 stylesheet.",
  "",
  ...patterns.flatMap((pattern) => [
    `### ${pattern.title}`,
    "",
    pattern.description,
    "",
    `Registry: https://design.qihao.dev/r/${pattern.name}.json`,
    `Install: \`pnpm dlx shadcn@latest add @qh/${pattern.name}\``,
    `Status: ${pattern.meta?.status ?? "unknown"}`,
    `Mobile-first: ${pattern.meta?.mobileFirst ? "yes" : "no"}`,
    `Uses: ${pattern.meta?.uses?.join(", ") || "None"}`,
    `Integration guidance: ${pattern.docs}`,
    "",
  ]),
];

await mkdir(publicRoot, { recursive: true });
await Promise.all([
  writeFile(path.join(publicRoot, "qh-components.json"), componentsJson),
  writeFile(path.join(publicRoot, "llms.txt"), `${shortIndex.join("\n")}\n`),
  writeFile(
    path.join(publicRoot, "llms-full.txt"),
    `${fullIndex.join("\n")}\n`,
  ),
]);

console.log(
  `Generated AI documentation for ${components.length} components and ${patterns.length} patterns.`,
);
