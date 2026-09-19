# Registry patterns

Registry patterns are copied into the consuming application and become application-owned source.
Inspect a pattern before installation. Preserve its QH component usage while adapting business state, routing, data access, and copy to the project.

The installer configures `@qh` as `https://design.qihao.dev/r/{name}.json`.
Use the consuming project's package runner to install a pattern, for example `npx shadcn@latest add @qh/login-form`.

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

## Settings Form

Project settings form with native submission and QH validation relationships.

- Registry name: `@qh/settings-form`
- Registry JSON: https://design.qihao.dev/r/settings-form.json
- Status: beta
- Mobile-first: yes
- Uses: Card, Field, Input, Select, Switch, Button
- Integration: Keep validation and persistence in the consuming application. Pass invalid to Field and render Field.Error when server or client validation fails.
