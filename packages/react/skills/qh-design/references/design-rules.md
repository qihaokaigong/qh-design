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
