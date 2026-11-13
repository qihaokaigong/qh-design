# @qhkg/tokens

QH Design System 的框架无关 Design Token 包。

```css
@import "@qhkg/tokens/theme.css";
```

Tailwind CSS v4 项目可以在 Tailwind 之后引入语义变量映射：

```css
@import "tailwindcss";
@import "@qhkg/tokens/theme.css";
@import "@qhkg/tokens/tailwind.css";
```

业务界面只使用 `--qh-color-*` 语义 Token，不直接使用品牌基础色或任意 HEX。

交互表面使用 `--qh-color-surface-hover`、`--qh-color-surface-pressed`；控件 hover 边界使用 `--qh-color-border-control-hover`，装饰线继续使用 `--qh-color-border`。这些角色复用现有品牌色，避免借用文字色作为任意状态边框。Tailwind bridge 提供同名的 `surface-hover`、`surface-pressed`、`border-control-hover` 颜色映射。

低强调操作使用 `--qh-color-action-soft` 背景与 `--qh-color-on-action-soft` 文字，hover 文字使用 `--qh-color-on-action-soft-hover`。控件按下边界使用 `--qh-color-border-control-pressed`。这些角色仍是现有批准色的语义别名，Tailwind bridge 提供同名映射；交互组件优先使用 QH 自带变体。
