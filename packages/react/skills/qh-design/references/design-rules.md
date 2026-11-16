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

## Grouped disclosure lists

- Use QH Accordion for heading/content sections. For a summary with independent business actions, keep one disclosure trigger and sibling actions; never nest buttons inside the trigger or use a centered Button label as a row layout.
- Arrange a left-aligned title and metadata, an aligned aggregate, then actions. Keep the aggregate and primary action visible in both states; share columns with ungrouped rows and reserve non-focusable empty action slots when needed.
- Default repeated groups to collapsed; show a single record directly. Pair the chevron with the title and explicit expand/collapse copy. Let long labels wrap.
- Indent details on a subtle semantic surface with separators; add a light rail and sequence labels when order matters. Avoid repeated group titles and nested cards; preserve full/cross-day values, sync, conflict and error information.
- Use QH outline Button for the frequent labelled action and a persistent ghost IconButton + Menu for editing/deletion. Menu trigger names identify both the group and the detail. Expansion must not mutate data or change business disabled/loading rules.
- At 320px, give titles reading space and move actions to another row. Preserve 44px targets, readable values, and 200% text scaling without clipping or page overflow. Keep QH component visuals intact; put columns and wrapping on application-owned containers.
- Reuse an installed disclosure primitive when the QH API cannot express independent summary actions. Keep business composition in the application; do not add another primitive dependency or core API solely for one list.
- Preserve native list/button semantics, aria-expanded/aria-controls, Enter/Space toggling and normal Tab order. Hidden details cannot receive focus. Menus restore focus on Escape; editing focuses its form and returns focus to the surviving row trigger on completion/cancel.
- Use a short height/chevron transition (180ms is suitable); disable both under prefers-reduced-motion. Check narrow/wide layouts, keyboard/menu focus, correct detail mutation identity and non-mutating expansion.
