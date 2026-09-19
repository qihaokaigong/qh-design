# 开源组件库案例审计

日期：2026-09-18  
状态：已完成，作为 ADR-0001 的输入

## 审计目的

QH 组件库不是从零发明一套工程方法，而是组合已经在公开组件库中验证过的实践。审计重点是：React + TypeScript、多项目复用、公共 npm、组件文档、可访问性、自动测试，以及 AI 对组件知识的访问。

不存在一个成熟项目与 QH 的全部目标完全相同，因此不复制单个模板，而是为不同架构层选择最合适的对标。

## 对标矩阵

| 案例                | 已验证能力                                                                                  | QH 借鉴                                       | QH 不照搬                     |
| ------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------- |
| GitHub Primer React | React/TS monorepo、公共 npm、Token 分包、Storybook、Playwright、组件元数据、MCP、Agent 规则 | 工程组织、发布治理、组件元数据、AI 工具结构   | CSS 技术栈与全部 API 设计     |
| Radix Themes        | 基于 Radix 的完整公开组件库、CSS Token、npm 多入口、视觉回归                                | Radix 封装、样式交付、包导出与测试思路        | 其完整视觉主题和多主题能力    |
| Tremor Raw          | React、Tailwind、Radix、Storybook、Vitest、Playwright                                       | Radix + Tailwind 的实现案例、数据组件与 Story | Copy & Paste 作为核心分发方式 |
| shadcn Registry     | Registry、命名空间、依赖解析、MCP、AI 自然语言安装                                          | 页面区块、规则、初始化文件的分发              | 复制核心组件源码到每个项目    |
| Storybook MCP       | 从真实组件、类型、Story 和文档生成 AI 可查询知识，并运行组件测试                            | v1 AI 查询、预览和验证入口                    | 把 preview 功能作为唯一知识源 |

## 1. GitHub Primer React

Primer 是 QH 最重要的总体工程对标。

- `@primer/react` 与 `@primer/primitives` 分别发布组件和设计 Token。
- 组件实现、Story、测试、类型测试和 `docs.json` 元数据共置。
- 使用 Changesets 管理版本。
- 使用 Storybook 进行组件开发，使用 Vitest、Playwright、视觉回归和可访问性验证。
- `@primer/mcp` 允许 AI 查询组件 API、示例、使用边界、可访问性规则、Pattern、Token 和图标。

QH 采用的结论：

1. Token 与 React 组件必须分包。
2. 每个组件必须同时拥有实现、Story、测试和机器可读元数据。
3. 文档网站与 AI 数据必须从组件事实源生成。
4. 自定义 MCP 不是 v1 前置条件；组件规模扩大后再参考 Primer 的专用工具。

资料：

- [Primer React npm](https://www.npmjs.com/package/%40primer/react)
- [Primer React 贡献与目录规范](https://github.com/primer/react/blob/main/contributor-docs/CONTRIBUTING.md)
- [Primer MCP](https://primer-docs-preview.github.com/product/getting-started/foundations/mcp/)

## 2. Radix Themes

Radix Themes 验证了“在 Radix 行为原语上封装可公开发布的品牌组件库”这一方向。

- 发布 ESM、CJS、类型声明和完整 CSS。
- Token、组件 CSS、工具 CSS可按不同入口使用。
- React 和 React DOM 作为 peer dependencies。
- 使用 CSS Variables 作为主题契约。
- 使用 Playwright 做跨浏览器视觉回归。

QH 采用的结论：

1. 使用 Radix Primitives，而不是重新实现复杂焦点和键盘交互。
2. QH 组件拥有稳定 API，不直接暴露底层原语的全部能力。
3. 公共 npm 包直接交付编译后的 CSS，使用方无需扫描组件源码。
4. CSS Token 和组件样式都必须有稳定、可单独导入的入口。

资料：

- [Radix Themes 仓库](https://github.com/radix-ui/themes)
- [Radix Themes 包结构](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/package.json)
- [Radix Primitives 可访问性](https://www.radix-ui.com/primitives/docs/overview/accessibility)

## 3. Tremor Raw

Tremor Raw 与 QH 的实现技术最接近：React、TypeScript、Tailwind CSS、Radix、Storybook、Vitest 和 Playwright。

它证明了 Radix + Tailwind 能覆盖完整组件、Dashboard 与图表场景，也提供了大量真实状态示例。

但 Tremor Raw 明确选择 Copy & Paste。这种方式适合单项目深度定制，不适合 QH 的多项目一致性要求。复制核心组件会使修复、Radix 升级、Token 更新和 AI 修改分散到每个项目。

QH 仅借鉴其组件实现与 Story 设计，不采用其核心分发模式。

资料：

- [Tremor 仓库](https://github.com/tremorlabs/tremor)
- [Tremor Raw 架构说明](https://www.tremor.so/docs/getting-started/about)

## 4. shadcn Registry

shadcn Registry 能够分发组件、页面、主题、规则、文档、配置和 Agent 文件，并能通过 MCP 搜索和安装。

QH 将 Registry 用作组合层：

- 发布 `init`、页面区块、Pattern、Agent 规则和迁移工具。
- Registry 中的页面区块依赖 `@qhkg/react`。
- 不在 Registry 中复制 Button、Input、Dialog 等核心组件实现。
- 核心组件的版本始终由 npm 依赖决定。

资料：

- [shadcn Registry](https://ui.shadcn.com/docs/registry)
- [Registry Item 格式](https://ui.shadcn.com/docs/registry/registry-item-json)
- [shadcn MCP](https://ui.shadcn.com/docs/mcp)

## 5. Storybook MCP

Storybook MCP 能从 TypeScript、JSDoc、Stories 和组件清单中暴露真实组件知识，并允许 AI 生成 Story、预览结果、运行组件测试和可访问性检查。

该能力当前仍为 preview，QH 接受在自主项目阶段使用，但保留以下降级入口：

- TypeScript 类型和 JSDoc。
- Storybook 静态文档。
- 组件元数据 JSON。
- `llms.txt` / `llms-full.txt`。
- 根目录 `AGENTS.md`。

资料：

- [Storybook MCP](https://storybook.js.org/docs/ai/mcp/overview)
- [Storybook AI 文档最佳实践](https://storybook.js.org/docs/ai/best-practices)
- [共享 Storybook MCP](https://storybook.js.org/docs/ai/mcp/sharing)

## 关键风险结论

### 不把 Tailwind 扫描责任交给使用方

Tailwind 默认不扫描 `node_modules`。如果 npm 组件只发布包含 Tailwind class 的源码，每个使用项目都必须配置 `@source`，容易出现组件存在但样式缺失、版本差异或动态 class 未生成等问题。

因此 QH 核心组件发布已编译 CSS；Tailwind 只用于使用项目、Storybook 和 Registry 页面区块。参见 [Tailwind 外部库扫描说明](https://tailwindcss.com/docs/detecting-classes-in-source-files)。

### 不让 Registry 成为第二份组件源码

Registry 负责组合和安装，npm 负责核心组件。两者如果同时维护 Button 等基础组件，会立即出现双重事实源。

### 不让 preview MCP 成为唯一文档入口

AI 能力必须建立在稳定的类型、Story 和元数据上。MCP 是访问方式，不是知识本身。
