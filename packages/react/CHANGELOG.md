# @qhkg/react

## 0.8.0

### Minor Changes

- 817d9cc: Add an opt-in Text ui typography variant while preserving the body default. Keep ghost buttons and button links quiet on hover and press, with independent focus feedback, and introduce semantic surface interaction and control hover tokens using existing QH colors. Registry tool pages use restrained titles, embedded filters and a single page gutter; standalone filter and toolbar frames remain available.

### Patch Changes

- 817d9cc: Replace the platform-dependent Select arrow with a decorative Lucide SVG, inset 12px (16px for lg) from the logical end. Reserve text space, support RTL and disabled states, and restore the native indicator in forced-colors mode. Native selection, form attributes and refs remain on the select; className and style now apply to its outer layout container.
- Updated dependencies [817d9cc]
  - @qhkg/tokens@0.8.0

## 0.7.0

### Minor Changes

- a94563f: Add opt-in content-driven Grid columns with `columns="auto"` and typed
  `minItemWidth` presets. Existing fixed and viewport-responsive columns retain
  their behavior. Pagination adapts to its own container and restores focus when
  numbered controls collapse. Tabs reveal selected and focused labels, including
  RTL layouts. Dialog and Drawer handle long content, short dynamic viewports and
  safe areas while preserving DOM action order.

  Registry patterns now wrap search, filters, headers and actions by available
  space. MobileBottomActionBar reserves its own measured height and gives a single
  action the full row. When updating copied patterns, remove manual bottom padding
  and keep the action bar at the end of the main page scrolling flow.

## 0.6.2

### Patch Changes

- 0588f72: Keep Dialog and Drawer compound slots isolated when both components are imported.

## 0.6.1

### Patch Changes

- b9ef312: Prevent compact DatePicker values from overlapping the calendar trigger and keep the calendar popover sized and anchored to its trigger.

## 0.6.0

### Minor Changes

- d9c61a7: Add ListBox, Combobox, and MultiSelect with a shared string option model, controlled and uncontrolled values, keyboard-accessible collection behavior, mobile-first popovers, stories, tests, and AI metadata.
- d9c61a7: Add Avatar, DataList, Code, Kbd, and AspectRatio with native semantics, responsive stories, component tests, accessibility guidance, and AI metadata.
- d9c61a7: Add InputGroup, SearchInput, PasswordInput, and NumberInput with native form semantics, accessible actions, mobile-first styling, stories, tests, and AI metadata.
- d9c61a7: Add stable per-component JavaScript and CSS subpath exports, retain the existing aggregate entries, and verify on-demand bundle size and tree shaking during release checks.
- d9c61a7: Add Fieldset and CheckboxGroup with native grouping semantics, controlled and uncontrolled multi-selection, inherited form states, stories, tests, and AI metadata.
- d9c61a7: Add Calendar, DatePicker, DateRangePicker, and TimeField with serializable ISO string APIs, accessible keyboard behavior, Field integration, mobile-safe styling, stories, tests, metadata, and an explicit date/time architecture decision.
- d9c61a7: Add Text, Heading, Link, AccessibleIcon, and Accordion components with mobile-first styles, accessible semantics, stories, tests, and AI metadata.
- d9c61a7: Add FileUpload and Dropzone with accessible device selection, keyboard-aware drag and drop, controlled and uncontrolled file lists, type/size/count validation, stories, tests, metadata, and an explicit architecture decision that keeps network upload state outside the core package.

## 0.5.0

### Minor Changes

- f66da07: Allow IconButton to display an optional visible label inline with its icon while preserving the existing icon-only API.

## 0.4.0

### Minor Changes

- 5bdda7d: Add a mobile-first Pagination component with controlled button and URL link modes, responsive page ranges, localized labels, and accessible current-page semantics.
- d056378: Add a mobile-first Breadcrumb component with semantic hierarchy, automatic ancestor collapsing, localized expansion controls, custom separators, and RTL support.

## 0.3.0

### Minor Changes

- 6d1c0d6: Add deterministic one-command QH Design onboarding and ship the matching project-local Agent Skill with the React package.

## 0.2.0

### Minor Changes

- 4f22bd4: Add the Batch 2 surface, feedback, and layout foundations: Card, Badge,
  Separator, Alert, Progress, Skeleton, EmptyState, PageContainer, Stack, Inline,
  and Grid.
- 4f22bd4: Add the Batch 3 navigation and overlay components: Tabs, Menu, Popover,
  Tooltip, Dialog, AlertDialog, Drawer, and Toast. They include mobile-first
  layouts, Portal layering, keyboard interaction, focus management, stories,
  tests, and AI-readable metadata.
- 4f22bd4: Add the Batch 4 Table component with native table semantics, numeric alignment,
  and mobile-contained horizontal scrolling. Publish the first QH Registry
  patterns for login, settings, filtering, destructive confirmation, and mobile
  bottom actions, together with Storybook coverage and AI-readable guidance.
- 4f22bd4: Add the Batch 1 form and action foundations: IconButton, Field, Input,
  Textarea, Checkbox, RadioGroup, Switch, and Select. The form controls include
  mobile-first sizing, invalid and disabled states, and automatic Field
  accessibility relationships.

### Patch Changes

- 620050b: Publish the packages under the final `@qhkg` npm scope and update repository
  links after the public GitHub repository was renamed to `qihaokaigong/qh-design`.
- Updated dependencies [620050b]
  - @qhkg/tokens@0.2.0
