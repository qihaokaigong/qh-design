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
- Integration: Copy and adapt the ProjectRow model and columns to the application's domain. Keep server fetching, URL state, authorization, and destructive confirmation in the consuming application.

## Delete Confirmation

Accessible destructive confirmation pattern built with QH AlertDialog.

- Registry name: `@qh/delete-confirmation`
- Registry JSON: https://design.qihao.dev/r/delete-confirmation.json
- Status: beta
- Mobile-first: yes
- Uses: AlertDialog, Button
- Integration: Use only for irreversible or high-risk deletion. Keep the cancel action as the initial focus and execute deletion only from onConfirm.

## Filter Bar

Responsive project filter bar that stacks on mobile and expands on wider screens.

- Registry name: `@qh/filter-bar`
- Registry JSON: https://design.qihao.dev/r/filter-bar.json
- Status: beta
- Mobile-first: yes
- Uses: Field, Input, Select, Button
- Integration: Use URL search parameters or application state as the source of truth. The pattern intentionally does not fetch data or assume a router.

## Header

Responsive application header with synchronized desktop and mobile primary navigation.

- Registry name: `@qh/header`
- Registry JSON: https://design.qihao.dev/r/header.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, ButtonLink, MobileNav
- Integration: Pass route-aware items and URLs from the application. The primary action remains visible at every breakpoint, while navigation moves into MobileNav below the desktop breakpoint.

## Login Form

Mobile-first email and password login form using QH Field and form controls.

- Registry name: `@qh/login-form`
- Registry JSON: https://design.qihao.dev/r/login-form.json
- Status: beta
- Mobile-first: yes
- Uses: Card, Field, Input, Checkbox, Button
- Integration: Import @qhkg/react/styles.css once at the application entry. Connect onSubmit to the application's authentication service; do not place credentials or data fetching in this pattern.

## Mobile Bottom Action Bar

Safe-area-aware bottom action bar that becomes an inline panel on wider screens.

- Registry name: `@qh/mobile-bottom-action-bar`
- Registry JSON: https://design.qihao.dev/r/mobile-bottom-action-bar.json
- Status: beta
- Mobile-first: yes
- Uses: Button
- Integration: Add bottom padding to the page content when this bar is fixed so the final content is not covered. Pass QH Button elements as actions.

## Mobile Navigation

Drawer-based mobile primary navigation with current-page state and focus restoration.

- Registry name: `@qh/mobile-nav`
- Registry JSON: https://design.qihao.dev/r/mobile-nav.json
- Status: beta
- Mobile-first: yes
- Uses: Drawer, Button, ButtonLink, IconButton
- Integration: Derive the current item from the consuming application's router. Keep every primary destination visible inside the Drawer and preserve the QH Drawer focus behavior.

## Page Header

Page title region combining breadcrumb hierarchy, supporting copy, and visible actions.

- Registry name: `@qh/page-header`
- Registry JSON: https://design.qihao.dev/r/page-header.json
- Status: beta
- Mobile-first: yes
- Uses: Breadcrumb, Heading, Text
- Integration: Render one page-level h1. Keep actions visible, use Button for in-page actions and ButtonLink for URL navigation, and pass router-aware breadcrumb href values.

## Project Detail Page

Complete project detail page with breadcrumbs, visible actions, overview data, activity, metadata, and resilient page states.

- Registry name: `@qh/project-detail-page`
- Registry JSON: https://design.qihao.dev/r/project-detail-page.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, PageHeader, Card, Badge, Alert, EmptyState, Skeleton
- Integration: Adapt ProjectDetail to the application's domain. Resolve permissions before passing visible actions, keep loading and error state ownership in the route, and use AlertDialog if archive becomes irreversible.

## Project List Page

Complete project list page combining hierarchy, visible creation action, filtering, data states, selection, and pagination.

- Registry name: `@qh/project-list-page`
- Registry JSON: https://design.qihao.dev/r/project-list-page.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, PageHeader, ButtonLink, DataTable
- Integration: Replace ProjectRow with the consuming application's domain model. Keep router state, authorization, fetching, mutations, and destructive confirmation outside this copy-first page pattern.

## Search Results Page

Complete search results page with a labelled query, category filter, result cards, loading, error, empty state, and pagination.

- Registry name: `@qh/search-results-page`
- Registry JSON: https://design.qihao.dev/r/search-results-page.json
- Status: beta
- Mobile-first: yes
- Uses: PageContainer, PageHeader, Toolbar, Select, Card, Link, Pagination, Alert, EmptyState, Skeleton
- Integration: Use URL search parameters as the application source of truth and move filtering and pagination to the server when the result set requires it. Replace demo result categories and URLs with the local search domain.

## Settings Form

Project settings form with native submission and QH validation relationships.

- Registry name: `@qh/settings-form`
- Registry JSON: https://design.qihao.dev/r/settings-form.json
- Status: beta
- Mobile-first: yes
- Uses: Card, Field, Input, Select, Switch, Button
- Integration: Keep validation and persistence in the consuming application. Pass invalid to Field and render Field.Error when server or client validation fails.

## Side Navigation

Persistent secondary navigation with explicit current-page state.

- Registry name: `@qh/side-nav`
- Registry JSON: https://design.qihao.dev/r/side-nav.json
- Status: beta
- Mobile-first: yes
- Uses: Heading, ButtonLink
- Integration: Use for secondary navigation within a stable application section. Derive the current item from the router and keep primary application destinations in Header or MobileNav.

## Toolbar

Responsive list tool area for search, filters, status, and visible actions.

- Registry name: `@qh/toolbar`
- Registry JSON: https://design.qihao.dev/r/toolbar.json
- Status: beta
- Mobile-first: yes
- Uses: SearchInput, Text
- Integration: This pattern uses labelled native control groups rather than role=toolbar. Only add the ARIA toolbar role after implementing roving tabindex and arrow-key navigation for every contained control.
