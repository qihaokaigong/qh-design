# QH Design System

QH Design System 是面向多个 React + TypeScript 项目的公共组件库。项目采用移动端优先设计，并把“人类可读、AI 可查询、示例可执行”作为同一套文档体系的要求。

当前状态：**Batch 0–4 与首批业务 Pattern 已进入 beta；Storybook、Registry、AI 文档和 Storybook MCP 已公开部署。**

## 决策文档

- [ADR-0001：公共 React 组件库总体架构](docs/adr/0001-component-library-architecture.md)
- [开源案例审计](docs/open-source-benchmarks.md)
- [组件 API 与 AI 可用性规范](docs/component-api-guidelines.md)
- [v1 组件范围与实施顺序](docs/v1-scope.md)
- [发布与外部配置手册](docs/release-runbook.md)

## 公共入口

- Storybook 与组件文档：`https://design.qihao.dev/`
- Registry 目录：`https://design.qihao.dev/r/registry.json`
- Registry 单项：`https://design.qihao.dev/r/{name}.json`
- AI 索引：`https://design.qihao.dev/llms.txt`
- MCP：`https://design.qihao.dev/mcp`

## 当前组件

- Actions：Button、ButtonLink、IconButton
- Forms：Field、Input、Textarea、Checkbox、RadioGroup、Switch、Select
- Foundation：VisuallyHidden
- Surfaces：Card、Separator
- Feedback：Alert、Progress、Skeleton、EmptyState
- Data Display：Badge、Table
- Layout：PageContainer、Stack、Inline、Grid
- Navigation：Tabs、Menu
- Overlays：Popover、Tooltip、Dialog、AlertDialog、Drawer
- Feedback（即时）：Toast

## 当前 Registry Pattern

- LoginForm：登录表单
- SettingsForm：项目设置表单
- FilterBar：响应式筛选栏
- DeleteConfirmation：高风险删除确认
- MobileBottomActionBar：适配安全区的移动端底部操作栏

Pattern 通过公开 shadcn Registry 交付，安装后代码归业务项目所有；它们组合 `@qhkg/react` 核心组件，但不复制核心组件实现。安装与接入方式见 [Registry 使用说明](registry/README.md)。

所有核心组件均包含 TypeScript 类型、Story、测试和 AI 元数据；Pattern 包含可交互 Story、Registry 元数据和 AI 接入说明。`design.qihao.dev` 由 Cloudflare Pages 托管，`/mcp` 由独立 Cloudflare Worker 提供 Storybook 文档工具。仓库已具备跨浏览器 CI、部署检查、发布包契约检查和 npm OIDC 发布工作流；首次 npm Trusted Publisher 配置和公共包发布仍待完成。
