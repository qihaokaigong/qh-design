# QH Registry

QH Registry 提供可复制到业务项目中的移动端优先 Pattern。Pattern 负责常见页面结构，核心交互和视觉能力仍由公开包 `@qhkg/react` 提供。

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
- `data-table`
- `mobile-nav`
- `header`
- `side-nav`
- `page-header`
- `toolbar`
- `project-list-page`
- `project-detail-page`
- `search-results-page`

## 样式要求

应用入口只需导入一次核心组件样式：

```tsx
import "@qhkg/react/styles.css";
```

Pattern 使用 Tailwind CSS v4 的语义 Token。在应用的 Tailwind 入口样式中导入桥接文件，并让 Tailwind 扫描安装后的 Pattern 目录：

```css
@import "tailwindcss";
@import "@qhkg/tokens/tailwind.css";
@source "./components/qh-patterns";
```

## 使用边界

FilterBar、Toolbar、PageHeader 按内容自然换行；Header 根据自身容器宽度切换导航。桌面侧栏和弹层中的窄区域也应单独检查，不要仅根据窗口宽度选择排列方式。

FilterBar 与 Toolbar 的 `variant="outlined"` 保留独立区块外框，`variant="plain"` 用于嵌入页面。PageHeader 采用工具页标题字阶与 UI 文案节奏。完整页面的 gutter 由一个 PageContainer 负责；避免把筛选、工具和结果重复套入多个带边框的卡片。详细规则见[视觉规范与迁移说明](../docs/visual-style-guidelines.md)。使用新增 Text UI 变体的区块须与下一次 minor 核心版本一起升级。

MobileBottomActionBar 应放在页面内容末尾、同一个主滚动流中。组件自动测量移动端固定操作区并保留等高占位，升级已有副本时移除原先手写的 `pb-32` 等底部补偿；768px 起恢复文档流。每页使用一个操作栏，不放入具有 transform 或独立滚动的祖先中。超长操作区在移动端限制为半个动态视口并可滚动，避免覆盖整页。

- 安装后的 Pattern 代码归业务项目所有，可以调整业务文案、表单状态和页面结构。
- 保留对 `@qhkg/react` 的组合调用，不要复制核心组件实现或自行重做焦点、弹层和无障碍逻辑。
- 数据请求、路由、鉴权和持久化留在业务项目中；Registry Pattern 不预设应用框架。
- 先查看对应 Story 和 Registry 的 `docs`、`meta.uses`，AI 不应猜测组件属性或自动接入后端。
