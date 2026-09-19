# ADR-0001：公共 React 组件库总体架构

日期：2026-09-18  
状态：**Accepted**  
决策者：QH 项目  
适用范围：QH 官网、博客、项目展示、工具类 Web 应用及未来 React + TypeScript 项目

## 背景

QH 需要一套被多个 React + TypeScript 项目共同使用的组件库。它必须：

- 遵循移动端优先原则。
- 落实《QH 网站主题与 Design Token 规范 v1.0》中的视觉和可访问性规则。
- 基于成熟开源原语进行封装，而不是自行实现复杂交互。
- 通过公共 npm 安装，并提供公开 Storybook。
- 让 AI 能发现组件、判断使用场景、生成代码、预览并验证结果。
- 避免不同项目复制组件后逐渐分叉。

开源案例与取舍记录见[开源案例审计](../open-source-benchmarks.md)。

## 决策摘要

采用一个公开 monorepo，核心组件通过公共 npm 包集中发布，页面区块和 AI 初始化内容通过 shadcn-compatible Registry 发布。

```text
Design Tokens
    ↓
@qh-design/tokens
    ↓
Radix Primitives → @qh-design/react → 各 React 项目
                         ↓
                    Storybook
                    ↙       ↘
              人类文档       Storybook MCP
                         ↓
               AI 查询、预览、测试

@qh-design/react → QH Registry → 页面区块 / Pattern / Agent 规则
```

核心原则：

1. npm 包是核心组件唯一事实源。
2. Registry 不复制核心组件，只分发组合区块、规则和初始化文件。
3. npm 包直接交付编译 CSS，不要求使用方扫描 Tailwind class。
4. Story、文档、测试和 AI 元数据与组件实现共置。
5. Storybook MCP 可以使用 preview 能力，但必须有静态降级入口。

## 技术选择

| 领域           | 决策                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------- |
| 语言与框架     | React + TypeScript strict                                                                 |
| React 支持     | React 18.3 与 React 19；新项目默认当前稳定 React 19                                       |
| 行为原语       | Radix Primitives；日期等少数组件可经 ADR 引入 React Aria                                  |
| 核心样式       | CSS Modules + CSS Variables，构建为公共 CSS 文件                                          |
| 应用与区块样式 | Tailwind CSS v4，使用 QH 语义 Token bridge                                                |
| 变体组合       | class-variance-authority + clsx；不动态拼接 Tailwind class                                |
| 图标           | Lucide React，统一 16/20/24px 规格                                                        |
| 工作区         | pnpm workspace + Turborepo                                                                |
| 构建           | Vite library mode + TypeScript declarations；保留 `use client` 指令和可 tree-shake 的 ESM |
| 文档与 Demo    | Storybook 10.6+，React + Vite builder                                                     |
| AI 文档        | Storybook MCP + shadcn MCP + 静态元数据 + `llms.txt` + `AGENTS.md`                        |
| 组件测试       | Storybook Test/Vitest + Testing Library                                                   |
| 浏览器测试     | Playwright，Chromium、Firefox、WebKit                                                     |
| 可访问性       | Storybook a11y/axe + 手工键盘与读屏验收                                                   |
| 发布           | Changesets + GitHub Actions + npm provenance                                              |
| 文档发布       | `https://design.qihao.dev/`；每个 PR 生成可访问预览                                       |

精确 patch 版本在初始化时写入 lockfile；ADR 固定技术边界，不固定会持续变化的 patch 号。

## 仓库结构

```text
blue-design/
├── apps/
│   └── storybook/                 # Demo、文档、状态和 Pattern
├── packages/
│   ├── tokens/                    # Design Token 与 Tailwind bridge
│   └── react/                     # 核心 React 组件
├── registry/
│   ├── blocks/                    # 登录、设置、筛选等页面区块
│   ├── rules/                     # Agent 规则和项目约束
│   ├── templates/                 # 新项目初始化内容
│   └── registry.json
├── docs/
│   ├── adr/
│   ├── component-api-guidelines.md
│   └── open-source-benchmarks.md
├── e2e/                           # Playwright 跨浏览器和视觉回归
└── .changeset/                    # 版本与变更说明
```

v1 不建立 `@qh-design/mcp` 自定义服务器。只有当 Storybook MCP 无法表达 QH Pattern、Token 查询或 lint 能力时，才通过新 ADR 评估专用 MCP。

## 包边界与导入契约

### `@qh-design/tokens`

职责：

- 保存 `qh-theme.css`，它是 v1 Token 的实现事实源。
- 提供不依赖框架的 CSS Variables。
- 提供 Tailwind v4 的语义变量映射，但不注入 Tailwind Preflight。
- 生成供文档和 AI 使用的 Token JSON；JSON 是构建产物，不是第二事实源。

导出：

```text
@qh-design/tokens/theme.css
@qh-design/tokens/tailwind.css
@qh-design/tokens/tokens.json
```

### `@qh-design/react`

职责：

- 提供稳定、带品牌视觉的 React 组件。
- 封装 Radix 的行为和可访问性能力。
- 导出类型声明、ESM 和 CSS。
- 不包含业务数据获取、路由、权限或产品文案。

导出：

```text
@qh-design/react
@qh-design/react/styles.css       # Token + 组件样式，默认入口
@qh-design/react/components.css   # 仅组件样式，高级入口
```

默认接入：

```tsx
import "@qh-design/react/styles.css";
import { Button } from "@qh-design/react";
```

React 和 React DOM 为 peer dependencies。Radix、CVA、clsx 等实现依赖由组件包管理，不要求使用方手工保持相同版本。

## 样式架构

### 核心组件不依赖使用方 Tailwind 构建

核心组件使用 CSS Modules 和 QH CSS Variables，并在发布时编译为带稳定入口的 CSS。理由：

- Tailwind 默认忽略 `node_modules`。
- 不同项目可能有不同 Tailwind 版本、Preflight、prefix 或构建工具。
- 公共组件安装后必须立即拥有完整视觉，不能依赖额外扫描配置。
- AI 生成页面时不应能轻易改写组件内部视觉契约。

### Tailwind bridge 的用途

`@qh-design/tokens/tailwind.css` 只服务于：

- 使用项目自己的布局和页面样式。
- Registry 页面区块。
- Storybook 的场景页面。

业务页面只能使用 QH 语义颜色映射，不使用任意 HEX 或 Tailwind 默认品牌色。

### 覆盖规则

- `className` 允许用于布局、定位和业务级尺寸约束。
- 不允许通过 `className` 改写组件颜色、状态、圆角和内部间距。
- 组件提供必要的 `variant`、`size`、`tone` 等语义属性。
- 确有新视觉需求时扩展组件 API 或 Token，不以任意 class 作为长期补丁。
- QH 样式先于应用样式加载；组件选择器保持低特异性。

## 移动端优先约束

所有 Story 和 Pattern 从 320px 开始设计，宽屏只增加布局能力，不减少移动端能力。

- 默认可交互控件高度至少 44px。
- 移动端表单控件字号至少 16px。
- 页面 gutter 使用 16px，随后在 768px 和 1024px 增大。
- 不依赖 hover 暴露功能；hover 只作为增强。
- 弹层处理安全区、虚拟键盘、可视高度和内容滚动。
- 表格只允许局部横向滚动，不产生页面级非预期横向滚动。
- 断点按内容需要使用，不按设备型号判断。
- 必测 320、375、768、1280px 与 200% 缩放。
- 支持 `prefers-reduced-motion`。

## 组件层级

### Foundation

Token、Typography、Icon、Focus、Portal、VisuallyHidden。

### Primitive Components

Button、ButtonLink、IconButton、Input、Textarea、Checkbox、RadioGroup、Switch、Card、Badge、Separator。

### Composite Components

Field、Select、Tabs、Menu、Popover、Dialog、AlertDialog、Drawer、Alert、Toast、Progress、Table。

### Patterns

登录表单、设置表单、筛选栏、空状态、删除确认、移动端操作区等。Pattern 优先发布到 Registry；只有跨项目长期稳定后才考虑进入 React 包。

组件 API 细则见[组件 API 与 AI 可用性规范](../component-api-guidelines.md)。

## AI 使用体系

### 稳定事实源

每个组件目录必须包含：

```text
Button/
├── Button.tsx
├── Button.module.css
├── Button.types.ts
├── Button.stories.tsx
├── Button.test.tsx
├── Button.meta.json
└── index.ts
```

其中：

- TypeScript + JSDoc 描述可调用 API。
- Story 描述真实状态和组合方式，并能作为测试执行。
- `*.meta.json` 描述用途、不适用场景、移动行为、可访问性和相关组件。
- JSON 由 Schema 在 CI 验证。

### AI 入口

1. Storybook MCP：查询组件、Story 和文档，预览并运行测试。
2. shadcn MCP：搜索和安装 QH Registry 中的 blocks、rules 和 templates。
3. `llms.txt`：组件与文档短索引。
4. `llms-full.txt`：离线完整文档。
5. `AGENTS.md`：项目级不可违反规则。
6. 公共 TypeScript 类型和 JSON 元数据：MCP 不可用时的降级入口。

### AI 安全规则

- AI 使用属性前必须查询 Storybook MCP 或静态 API 文档，不能根据名称猜测。
- AI 优先组合已有组件；找不到组件时不得自行创建视觉相似的替代品。
- 新建 Pattern 先进入业务项目或 Registry，不直接提升为核心组件。
- AI 生成的 Story 使用 `ai-generated` 标签，人工通过后移除。
- AI 改动必须运行相关 Story 测试和可访问性测试。

## Storybook 与公开 Demo

Storybook 同时是：

- 组件开发环境。
- 对外 Demo 和 API 文档。
- 所有视觉状态的状态矩阵。
- Pattern 展示页。
- AI 的组件知识和验证入口。

目录至少包含：Foundations、Actions、Forms、Navigation、Feedback、Overlays、Data、Patterns、State Matrix。

每个组件至少提供：Default、Playground、States、Mobile、Long Content、RTL/国际化相关状态（适用时）、Accessibility Notes。

公开 Storybook 和公开 Registry 不得包含密钥、未发布业务信息、真实用户数据或依赖私有后端的 Story。

公共 URL 契约：

```text
https://design.qihao.dev/                    Storybook 与文档
https://design.qihao.dev/r/{name}.json       Registry item
https://design.qihao.dev/llms.txt            AI 短索引
https://design.qihao.dev/llms-full.txt       AI 完整索引
https://design.qihao.dev/qh-components.json  静态组件元数据
https://design.qihao.dev/mcp                  Storybook MCP
```

部署实现可以更换，但这些公开 URL 不随托管平台变化。

## Registry 架构

Registry 只发布：

- `qh-init`：安装 npm 包、样式入口和基础规则。
- 页面 blocks。
- Pattern 示例。
- `AGENTS.md`/AI 规则。
- 迁移和 codemod 文件。

Registry item 必须明确依赖的 `@qh-design/react` 版本范围。发布的 tag 或版本化 URL 必须可复现；`latest` 只用于人工浏览，不用于生产锁定。

## 测试与质量门槛

### 每个组件

- TypeScript 类型检查。
- 默认渲染和关键属性测试。
- 键盘交互和焦点行为测试。
- disabled、loading、invalid、空内容和长内容状态。
- Storybook a11y 检查设为 CI error。
- SSR import 测试：模块加载时不得访问 `window` 或 `document`。

### 浏览器和视觉

- Playwright 覆盖 Chromium、Firefox、WebKit。
- 关键 Story 做截图回归。
- 320、375、768、1280px 与 200% zoom 验收。
- Dialog、Drawer、Menu、Popover 检查打开、关闭、Escape 和焦点还原。
- 触屏场景检查目标尺寸、滚动和虚拟键盘遮挡。

### 发布阻断条件

- 类型、lint、单元、Story、a11y 或浏览器测试失败。
- 未提供 Changeset。
- 未提供新 API 的 Story 和元数据。
- 出现未授权 HEX、默认 Tailwind 品牌色或残余暗色样式。
- 构建产物缺少 CSS、类型声明或正确 exports。

自动化检查不能替代读屏、键盘、触屏和真实页面人工验收。

## 发布与版本

- 所有包发布到公共 npm。
- npm scope 固定为 `@qh-design`。
- 公开源码使用 MIT License。
- 默认 dist-tag 为 `latest`；预发布使用 `next`。
- 使用 Changesets 生成版本和 changelog。
- Git tag、npm 版本和公开 Storybook 版本关联。
- npm 发布启用 provenance；CI 使用最小权限和受保护环境。

组件版本：

- patch：修复不改变公开契约的缺陷。
- minor：新增兼容组件、属性或状态。
- major：删除、重命名、改变语义或产生迁移要求。

Token 版本延续既有规范：新增兼容 Token 为 minor；已发布视觉值的小范围修正为 patch；删除、重命名或改变语义为 major。大范围视觉重构即使 API 不变，也应发布迁移说明并评估 minor。

## 浏览器与框架边界

- 支持现代 evergreen 浏览器及 Safari/iOS 16.4+。
- 支持 Vite、Next.js 和其他能消费标准 ESM/CSS 的 React 项目。
- 组件不得在模块初始化期间访问浏览器全局对象。
- 交互组件保留正确的 `use client` 边界。
- v1 不承诺 React Native、Vue、Web Components 或旧版浏览器支持。

## 暂不纳入 v1

- 暗色主题。
- 自定义 `@qh-design/mcp`。
- React Native、Vue 或 Web Components 适配。
- 完整图表色系和专业图表组件。
- 富文本编辑器。
- 项目自行覆盖品牌原始 Token。
- 把所有业务 Pattern 提升为核心组件。

## 后果与权衡

### 收益

- 所有项目通过 npm 版本统一升级和回滚。
- 使用方不需要复制核心源码，也不需要适配 Tailwind 扫描。
- Radix 承担复杂交互基础，QH 聚焦视觉、API 和验收。
- 人类文档和 AI 文档共享事实源。
- Story 可以同时承担展示、测试和 AI 示例。

### 成本

- CSS Modules 与 Tailwind bridge 需要同时维护明确边界。
- 公共 API 一旦发布，需要严格遵守 semver。
- Story、测试和元数据提高单个组件的交付成本。
- Storybook MCP 为 preview，需要持续关注升级并保留降级路径。
- npm 与 Registry 两种发布渠道需要自动化避免版本错位。

这些成本是为了换取多项目长期一致性，不应通过跳过文档或测试来降低。

## 开发启动门槛

以下项目全部确认后，才允许初始化实现代码：

- [x] 使用项目为 React + TypeScript。
- [x] npm 包和 Storybook公开访问。
- [x] 接受 npm 核心包 + Registry 组合分发。
- [x] 接受 Storybook MCP preview。
- [x] 完成开源案例审计。
- [x] 确定总体架构和组件 API 规范。
- [x] npm scope 与包名固定为 `@qh-design/react`、`@qh-design/tokens`。
- [x] 公开源码使用 MIT License。
- [x] Storybook、Registry 与 AI 入口使用 `design.qihao.dev`。
- [x] 冻结 v1 首批组件清单与验收顺序。

开发启动门槛已经全部满足。具体范围见 [v1 组件范围与实施顺序](../v1-scope.md)。

## 后续 ADR

以下事项如发生，必须单独记录 ADR：

- 更换 Radix 或同时引入另一套交互原语。
- 改变核心样式方案或让使用方参与 Tailwind 扫描。
- 引入暗色主题或多品牌主题。
- 开发专用 QH MCP。
- 添加新框架适配。
- Registry 开始承载核心组件源码。
