# QH Registry

QH Registry 提供可复制到业务项目中的移动端优先 Pattern。Pattern 负责常见页面结构，核心交互和视觉能力仍由公开包 `@qh-design/react` 提供。

## 接入

先为 shadcn CLI 配置公共命名空间：

```bash
pnpm dlx shadcn@latest registry add @qh=https://design.qihao.dev/r/{name}.json
```

再按需安装 Pattern：

```bash
pnpm dlx shadcn@latest add @qh/login-form
```

公开目录位于 `https://design.qihao.dev/r/registry.json`。可安装项包括：

- `login-form`
- `settings-form`
- `filter-bar`
- `delete-confirmation`
- `mobile-bottom-action-bar`

## 样式要求

应用入口只需导入一次核心组件样式：

```tsx
import "@qh-design/react/styles.css";
```

Pattern 使用 Tailwind CSS v4 的语义 Token。在应用的 Tailwind 入口样式中导入桥接文件，并让 Tailwind 扫描安装后的 Pattern 目录：

```css
@import "tailwindcss";
@import "@qh-design/tokens/tailwind.css";
@source "./components/qh-patterns";
```

## 使用边界

- 安装后的 Pattern 代码归业务项目所有，可以调整业务文案、表单状态和页面结构。
- 保留对 `@qh-design/react` 的组合调用，不要复制核心组件实现或自行重做焦点、弹层和无障碍逻辑。
- 数据请求、路由、鉴权和持久化留在业务项目中；Registry Pattern 不预设应用框架。
- 先查看对应 Story 和 Registry 的 `docs`、`meta.uses`，AI 不应猜测组件属性或自动接入后端。
