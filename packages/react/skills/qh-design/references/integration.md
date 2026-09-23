# QH integration contract

The installer handles deterministic package, Registry, and Skill setup. Source
integration remains owned by the consuming project.

## Required outcomes

- `@qhkg/react` is a direct project dependency.
- One style strategy is applied through the project's own global-style
  convention before QH components render:
  - Default: import `@qhkg/react/styles.css` exactly once.
  - On demand: import `@qhkg/react/theme.css` exactly once, then import the CSS
    subpath for every used component, such as `@qhkg/react/avatar.css`.
- The `@qh` Registry namespace resolves to
  `https://design.qihao.dev/r/{name}.json` when Registry patterns are used.
- The installed `qh-design` Skill context version matches the installed
  `@qhkg/react` version.

## Project-aware workflow

1. Read the project's instructions and package scripts.
2. Inspect how global CSS is already loaded; do not select a file from the
   framework name alone.
3. Search for an existing full or on-demand QH style import. Preserve the
   project's current strategy rather than mixing both.
4. If the correct location is clear from the project's conventions, propose the
   smallest change. If it is not clear, ask the developer to choose the location.
5. Do not introduce or replace a CSS framework merely to integrate QH.
6. Run the project's existing typecheck/build commands after an authorized edit.
7. Run `scripts/verify-integration.mjs` for the QH-specific checks.

The absence of a style import is a pending integration task, not permission to
modify an arbitrary source file.

For on-demand loading, import JavaScript from the matching kebab-case subpath:

```tsx
import "@qhkg/react/theme.css";
import "@qhkg/react/avatar.css";
import { Avatar } from "@qhkg/react/avatar";
```

Component CSS entries include styles from QH components they compose. Do not
also import `styles.css`; it already contains the entire theme and component
stylesheet.
