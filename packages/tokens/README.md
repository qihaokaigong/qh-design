# @qh-design/tokens

QH Design System 的框架无关 Design Token 包。

```css
@import "@qh-design/tokens/theme.css";
```

Tailwind CSS v4 项目可以在 Tailwind 之后引入语义变量映射：

```css
@import "tailwindcss";
@import "@qh-design/tokens/theme.css";
@import "@qh-design/tokens/tailwind.css";
```

业务界面只使用 `--qh-color-*` 语义 Token，不直接使用品牌基础色或任意 HEX。
