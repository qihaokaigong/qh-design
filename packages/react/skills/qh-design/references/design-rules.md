# QH design rules

## Visual system

- Mobile is the default; add wider layouts with min-width breakpoints.
- Do not hide required actions behind hover.
- Keep default interactive targets at least 44px high.
- Use QH semantic tokens for colors. Do not invent HEX values, arbitrary grays,
  an unapproved brand color, or an inferred dark theme.
- Use `className` for layout, positioning, and page-level size constraints, not
  to replace component colors, focus treatment, radius, or internal spacing.

## Component decisions

- `Button` performs an action; `ButtonLink` navigates to a URL.
- `Dialog` handles an ordinary focused task; `AlertDialog` confirms a dangerous
  or irreversible action.
- Reuse QH form controls and preserve their labels, descriptions, errors, and
  native form behavior.
- Preserve documented keyboard behavior, focus restoration, accessible names,
  disabled/loading states, and reduced-motion behavior.
- Registry patterns are application-owned composition. Adapt their copy, state,
  routing, and data access without copying or replacing QH core components.

## Ownership boundary

QH owns component visuals and interaction contracts. The consuming project owns
business logic, application architecture, routing, authorization, persistence,
and the location of its global style entry.

## Tool-page visual hierarchy

- Tool pages use a semantic h1 with Heading size=lg. Reserve xl for display content.
- Text defaults to body for reading; use variant=ui for page descriptions and short status copy.
- Use FilterBar/Toolbar variant=plain when embedded in a page, outlined for standalone blocks.
- Let one PageContainer own the gutter. Prefer sections, spacing and dividers over repeated card frames.
- Ghost actions remain quiet on hover and press; preserve focus-visible and disabled/loading behavior.
- Use primary for the main action, soft for lower emphasis, outline for a visible secondary action, and ghost for quiet utilities. Existing secondary remains supported. Button, ButtonLink and IconButton share these variants.
- Native fields have one Paper surface; preserve invalid boundaries independently of focus. InputGroup and SearchInput sizes match standalone controls (sm 36px, md 44px, lg 48px); use md by default for touch. SearchInput owns its clear action.
- Keep the selected Tabs accent during hover. Selection controls distinguish hover, pressed, checked, invalid and disabled; do not replace these states with layout classes.
- Select layout className/style apply to its container; native id, name, events and ref target the select. Its SVG arrow is decorative and logical-end aligned.
