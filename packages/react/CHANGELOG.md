# @qhkg/react

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
