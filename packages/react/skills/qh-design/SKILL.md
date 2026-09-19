---
name: qh-design
description: Use QH Design System in React UI work, including initial integration, component selection, implementation, review, and Registry patterns. Inspect the current project's own conventions before changing source files; never guess component props or project entry points.
license: MIT
---

# QH Design System

Use `@qhkg/react` as the UI implementation source and treat the consuming
project as the authority for its framework, directories, entry points, routing,
state, and data access.

## Start with project facts

1. Read the repository's own instructions before proposing changes.
2. Run the read-only inspector relative to this skill directory:
   `node scripts/inspect-project.mjs --cwd <project-root>`.
3. Use the report as facts only. Do not infer a framework or global entry file
   when the project has not made it clear.
4. If a project-structure choice is ambiguous, explain the required outcome and
   ask the developer where it belongs.

For initial setup or integration review, read
[references/integration.md](references/integration.md). For implementation and
visual decisions, read [references/design-rules.md](references/design-rules.md).

## Choose and use components

- Search [references/components.md](references/components.md) to identify the
  right component and its intended use.
- Read the matching object in
  [references/component-api.json](references/component-api.json) for structured
  guidance.
- Confirm callable props from the installed TypeScript declarations or the QH
  Storybook MCP before writing code. Never invent props from names or another
  component library.
- Prefer composing existing QH components over creating local visual
  primitives. Keep business-specific composition in the consuming project.

For page-level patterns, read
[references/patterns.md](references/patterns.md) and inspect the Registry item
before installing it.

## Preserve project ownership

- Do not rewrite routing, providers, state management, data fetching,
  authentication, or application architecture as part of QH integration.
- Do not choose an import location solely from a framework name. Follow the
  project's existing global-style convention or ask the developer.
- Present source changes before applying them when the requested task has not
  already authorized those changes.
- Run the project's own checks after edits, then run the read-only verifier:
  `node scripts/verify-integration.mjs --cwd <project-root>`.

The public fallback documentation is available at
`https://design.qihao.dev/llms-full.txt`; the structured component source is
`https://design.qihao.dev/qh-components.json`.
