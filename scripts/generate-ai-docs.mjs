import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import prettier from "prettier";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsRoot = path.join(root, "packages/react/src/components");
const publicRoot = path.join(root, "apps/storybook/public");
const registryPath = path.join(root, "registry/registry.json");
const skillReferencesRoot = path.join(
  root,
  "packages/react/skills/qh-design/references",
);
const reactPackagePath = path.join(root, "packages/react/package.json");
const tokensSourcePath = path.join(root, "packages/tokens/src/theme.css");
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
const reactPackage = JSON.parse(await readFile(reactPackagePath, "utf8"));
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

const componentReference = [
  "# Component index",
  "",
  `Generated from QH component metadata for \`${reactPackage.name}@${reactPackage.version}\`.`,
  "Use this index to choose a component, then confirm exact props from the installed TypeScript declarations or Storybook MCP.",
  "",
  ...components.flatMap((component) => [
    `## ${component.name}`,
    "",
    component.summary,
    "",
    `- Import: \`${component.import}\``,
    `- Status: ${component.status}`,
    `- Use when: ${component.whenToUse.join("；")}`,
    `- Avoid when: ${component.avoidWhen.join("；")}`,
    `- Mobile: ${component.mobile.join("；")}`,
    `- Accessibility: ${component.accessibility.join("；")}`,
    `- Related: ${component.related.join(", ") || "None"}`,
    `- Storybook: https://design.qihao.dev/?path=/docs/${component.storybookId}--docs`,
    "",
  ]),
];

const patternReference = [
  "# Registry patterns",
  "",
  "Registry patterns are copied into the consuming application and become application-owned source.",
  "Inspect a pattern before installation. Preserve its QH component usage while adapting business state, routing, data access, and copy to the project.",
  "",
  "The installer configures `@qh` as `https://design.qihao.dev/r/{name}.json`.",
  "Use the consuming project's package runner to install a pattern, for example `npx shadcn@latest add @qh/login-form`.",
  "",
  ...patterns.flatMap((pattern) => [
    `## ${pattern.title}`,
    "",
    pattern.description,
    "",
    `- Registry name: \`@qh/${pattern.name}\``,
    `- Registry JSON: https://design.qihao.dev/r/${pattern.name}.json`,
    `- Status: ${pattern.meta?.status ?? "unknown"}`,
    `- Mobile-first: ${pattern.meta?.mobileFirst ? "yes" : "no"}`,
    `- Uses: ${pattern.meta?.uses?.join(", ") || "None"}`,
    `- Integration: ${pattern.docs}`,
    "",
  ]),
];

const themeCss = await readFile(tokensSourcePath, "utf8");
const tokens = Object.fromEntries(
  [...themeCss.matchAll(/(--qh-[a-z0-9-]+):\s*([^;]+);/g)].map((match) => [
    match[1],
    match[2].replace(/\s+/g, " ").trim(),
  ]),
);
const skillManifest = {
  schemaVersion: 1,
  designSystem: "QH Design",
  componentPackage: reactPackage.name,
  componentVersion: reactPackage.version,
  docsUrl: "https://design.qihao.dev/",
  mcpUrl: "https://design.qihao.dev/mcp",
  registryTemplate: "https://design.qihao.dev/r/{name}.json",
};

await Promise.all([
  mkdir(publicRoot, { recursive: true }),
  mkdir(skillReferencesRoot, { recursive: true }),
]);
await Promise.all([
  writeFile(path.join(publicRoot, "qh-components.json"), componentsJson),
  writeFile(path.join(publicRoot, "llms.txt"), `${shortIndex.join("\n")}\n`),
  writeFile(
    path.join(publicRoot, "llms-full.txt"),
    `${fullIndex.join("\n")}\n`,
  ),
  writeFile(
    path.join(skillReferencesRoot, "manifest.json"),
    await prettier.format(JSON.stringify(skillManifest), { parser: "json" }),
  ),
  writeFile(
    path.join(skillReferencesRoot, "component-api.json"),
    await prettier.format(
      JSON.stringify({
        schemaVersion: 1,
        componentPackage: reactPackage.name,
        componentVersion: reactPackage.version,
        components,
      }),
      { parser: "json" },
    ),
  ),
  writeFile(
    path.join(skillReferencesRoot, "components.md"),
    await prettier.format(`${componentReference.join("\n")}\n`, {
      parser: "markdown",
    }),
  ),
  writeFile(
    path.join(skillReferencesRoot, "patterns.md"),
    await prettier.format(`${patternReference.join("\n")}\n`, {
      parser: "markdown",
    }),
  ),
  writeFile(
    path.join(skillReferencesRoot, "tokens.json"),
    await prettier.format(JSON.stringify({ schemaVersion: 1, tokens }), {
      parser: "json",
    }),
  ),
]);

console.log(
  `Generated AI documentation for ${components.length} components and ${patterns.length} patterns.`,
);
