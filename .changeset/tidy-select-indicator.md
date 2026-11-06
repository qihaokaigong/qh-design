---
"@qhkg/react": patch
---

Replace the platform-dependent Select arrow with a decorative Lucide SVG, inset 12px (16px for lg) from the logical end. Reserve text space, support RTL and disabled states, and restore the native indicator in forced-colors mode. Native selection, form attributes and refs remain on the select; className and style now apply to its outer layout container.
