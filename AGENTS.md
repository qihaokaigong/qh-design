# QH Design System Agent Rules

## Before changing UI

1. Read `docs/adr/0001-component-library-architecture.md` and `docs/component-api-guidelines.md`.
2. Query the QH Storybook MCP for existing components, props, stories and patterns when it is available.
3. Never guess a component prop. Use the exported TypeScript type or documented Story.

## Visual rules

- Use only `--qh-color-*` semantic tokens or documented component tokens for UI colors.
- Do not add HEX, arbitrary gray values, unapproved brand colors or an inferred dark theme.
- QH Blue is a brand color; default primary actions use Blue Dark with Paper text.
- Keep decorative and control borders separate.
- Use the 4px spacing scale, 8px control radius, 12px card radius and 44px default control height.
- Mobile is the default. Add wider layouts with min-width breakpoints.
- Do not hide required actions behind hover.

## Component rules

- Reuse `@qh-design/react` before creating application-local UI primitives.
- Core components live only in the npm package. Registry items compose them and never copy their implementation.
- `Button` performs an action. `ButtonLink` navigates. `AlertDialog` confirms dangerous actions.
- Use `className` for layout, positioning and page-level sizing, not to replace component colors, focus, radius or internal spacing.
- Every interactive component covers hover, pressed/open, focus-visible and disabled; forms add invalid; asynchronous actions add loading.
- Preserve accessible names, keyboard behavior, focus restoration and reduced-motion behavior.

## Required component artifacts

Every component change includes or updates implementation, Story, test, metadata and a Changeset when it affects a published package.

AI-generated stories must use the `ai-generated` tag until a human reviews them.
