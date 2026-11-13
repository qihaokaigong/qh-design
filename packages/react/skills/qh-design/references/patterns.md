# Registry patterns

Registry patterns are copied into the consuming application and become application-owned source.
Inspect a pattern before installation. Preserve its QH component usage while adapting business state, routing, data access, and copy to the project.

The installer configures `@qh` as `https://design.qihao.dev/r/{name}.json`.
Use the consuming project's package runner to install a pattern, for example `npx shadcn@latest add @qh/login-form`.

## Data Table

Project data table pattern with filtering, sorting, row selection, batch actions, states, and pagination.

- Registry name: `@qh/data-table`
- Registry JSON: https://design.qihao.dev/r/data-table.json
- Status: beta
- Mobile-first: yes
- Uses: Table, Pagination, Checkbox, Menu, FilterBar, Alert, EmptyState, Skeleton
- Integration: Copy and adapt the ProjectRow model and columns to the application's domain. Keep server fetching, URL state, authorization, and destructive confirmation in the consuming application. Embedded filters use the plain variant so the table remains the main data boundary. Batch actions use an outline trigger with persistent open feedback.

## Delete Confirmation

Accessible destructive confirmation pattern built with QH AlertDialog.

- Registry name: `@qh/delete-confirmation`
- Registry JSON: https://design.qihao.dev/r/delete-confirmation.json
- Status: beta
- Mobile-first: yes
- Uses: AlertDialog, Button
- Integration: Use only for irreversible or high-risk deletion. Keep the cancel action as the initial focus and execute deletion only from onConfirm.

## Filter Bar

Content-driven project filter bar that wraps within its available container.

- Registry name: `@qh/filter-bar`
- Registry JSON: https://design.qihao.dev/r/filter-bar.json
- Status: beta
- Mobile-first: yes
- Uses: Field, SearchInput, Select, Button, Text
- Integration: Search and status fields wrap by available space, including desktop side panels. Use URL parameters or application state as the source of truth; fetching and routing stay in the application. Use variant=outlined (default) for a standalone block and variant=plain when embedded in a page. Controls retain their own boundaries. Apply uses a soft action so the page primary action remains prominent.

## Header

Responsive application header with synchronized desktop and mobile primary navigation.

- Registry name: `@qh/header`
- Registry JSON: https://design.qihao.dev/r/header.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, ButtonLink, MobileNav
- Integration: Pass route-aware items and URLs from the application. Navigation switches by header container width at 48rem; the primary action remains visible and wraps with the header when space is limited.

## Login Form

Mobile-first email and password login form using QH Field and form controls.

- Registry name: `@qh/login-form`
- Registry JSON: https://design.qihao.dev/r/login-form.json
- Status: beta
- Mobile-first: yes
- Uses: Card, Field, Input, Checkbox, Button
- Integration: Import @qhkg/react/styles.css once at the application entry. Connect onSubmit to the application's authentication service; do not place credentials or data fetching in this pattern.

## Mobile Bottom Action Bar

Safe-area-aware fixed mobile actions with automatic dynamic-height content reservation.

- Registry name: `@qh/mobile-bottom-action-bar`
- Registry JSON: https://design.qihao.dev/r/mobile-bottom-action-bar.json
- Status: beta
- Mobile-first: yes
- Uses: Button
- Integration: Render at the end of the page content in the main scrolling flow. The pattern reserves its measured mobile height; remove previous manual bottom padding. Keep a single bar per page and do not place it in a transformed or separately scrolling ancestor. It becomes inline from 768px. Pass QH Button elements as actions; a single action fills the row.

## Mobile Navigation

Drawer-based mobile primary navigation with current-page state and focus restoration.

- Registry name: `@qh/mobile-nav`
- Registry JSON: https://design.qihao.dev/r/mobile-nav.json
- Status: beta
- Mobile-first: yes
- Uses: Drawer, Button, ButtonLink, IconButton
- Integration: Derive current destinations from the application router. Keep navigation labels visible and preserve Drawer focus behavior. When a responsive layout can hide the trigger while open, pass fallbackFocusRef to a visible focusable entry; Header wires its home link automatically.

## Page Header

Page title region combining breadcrumb hierarchy, supporting copy, and visible actions.

- Registry name: `@qh/page-header`
- Registry JSON: https://design.qihao.dev/r/page-header.json
- Status: beta
- Mobile-first: yes
- Uses: Breadcrumb, Heading, Text
- Integration: Render one page-level h1. Title and action groups wrap by available space. Keep actions visible; use Button for actions and ButtonLink for navigation, with router-aware breadcrumb URLs. Tool-page titles use Heading lg while preserving the semantic h1; supporting text uses Text variant=ui.

## Project Detail Page

Complete project detail page with breadcrumbs, visible actions, overview data, activity, metadata, and resilient page states.

- Registry name: `@qh/project-detail-page`
- Registry JSON: https://design.qihao.dev/r/project-detail-page.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, PageHeader, Card, Badge, Alert, EmptyState, Skeleton
- Integration: Adapt ProjectDetail to the application's domain. Resolve permissions before passing visible actions, keep loading and error state ownership in the route, and use AlertDialog if archive becomes irreversible. Primary sections use spacing and dividers; the auxiliary information card retains a subtle Warm surface. Keep editing as primary and archiving as outline; confirm destructive changes through AlertDialog when required.

## Project List Page

Complete project list page combining hierarchy, visible creation action, filtering, data states, selection, and pagination.

- Registry name: `@qh/project-list-page`
- Registry JSON: https://design.qihao.dev/r/project-list-page.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, PageHeader, ButtonLink, DataTable
- Integration: Replace ProjectRow with the consuming application's domain model. Keep router state, authorization, fetching, mutations, and destructive confirmation outside this copy-first page pattern. PageContainer owns the page gutter; the repeated partition heading remains accessible while visually hidden.

## Search Results Page

Complete search results page with a labelled query, category filter, result cards, loading, error, empty state, and pagination.

- Registry name: `@qh/search-results-page`
- Registry JSON: https://design.qihao.dev/r/search-results-page.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, PageHeader, Toolbar, Select, Card, Link, Pagination, Alert, EmptyState, Skeleton
- Integration: Use URL search parameters as the application source of truth and move filtering and pagination to the server when the result set requires it. Replace demo result categories and URLs with the local search domain. The toolbar embeds without a second frame; PageContainer owns the page gutter.

## Settings Form

Project settings form with native submission and QH validation relationships.

- Registry name: `@qh/settings-form`
- Registry JSON: https://design.qihao.dev/r/settings-form.json
- Status: beta
- Mobile-first: yes
- Uses: Card, Field, Input, Select, Switch, Button
- Integration: Keep validation and persistence in the consuming application. Pass invalid to Field and render Field.Error when server or client validation fails. Keep a single form card, a separated action area and quiet reset action; native reset and submission remain available.

## Side Navigation

Persistent secondary navigation with explicit current-page state.

- Registry name: `@qh/side-nav`
- Registry JSON: https://design.qihao.dev/r/side-nav.json
- Status: beta
- Mobile-first: yes
- Uses: Heading, ButtonLink
- Integration: Use for secondary navigation within a stable application section. Labels wrap within the available width; derive the current item from the router and keep primary destinations in Header or MobileNav.

## Toolbar

Responsive list tool area for search, filters, status, and visible actions.

- Registry name: `@qh/toolbar`
- Registry JSON: https://design.qihao.dev/r/toolbar.json
- Status: beta
- Mobile-first: yes
- Uses: SearchInput, Text
- Integration: Search, filters and actions wrap by available container space. This uses labelled native control groups rather than role=toolbar; do not add the toolbar role without implementing its keyboard model. Use variant=outlined (default) for standalone framing and variant=plain inside a complete page. Status copy uses the UI typography role.
