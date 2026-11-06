---
"@qhkg/react": minor
---

Add opt-in content-driven Grid columns with `columns="auto"` and typed
`minItemWidth` presets. Existing fixed and viewport-responsive columns retain
their behavior. Pagination adapts to its own container and restores focus when
numbered controls collapse. Tabs reveal selected and focused labels, including
RTL layouts. Dialog and Drawer handle long content, short dynamic viewports and
safe areas while preserving DOM action order.

Registry patterns now wrap search, filters, headers and actions by available
space. MobileBottomActionBar reserves its own measured height and gives a single
action the full row. When updating copied patterns, remove manual bottom padding
and keep the action bar at the end of the main page scrolling flow.
