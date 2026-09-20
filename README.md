# QH Design System

QH Design System 是面向多个 React + TypeScript 项目的公共组件库。项目采用移动端优先设计，并把“人类可读、AI 可查询、示例可执行”作为同一套文档体系的要求。

当前状态：**Batch 0–4 与首批业务 Pattern 已进入 beta；Storybook、Registry、AI 文档和 Storybook MCP 已公开部署。**

## 在项目中接入

在已经具有 `package.json` 的 React + TypeScript 项目根目录运行：

```bash
npx @qhkg/create-qh-design@latest
```

该命令只执行可确定的工作：安装 `@qhkg/react` 与
`@qhkg/tokens`、配置公开 `@qh` Registry，并把与组件版本一致的 AI
Skill 安装到项目的 `.agents/skills/qh-design`。它不会判断框架、选择应用入口或修改业务源码。

命令完成后，让 AI 使用 `$qh-design`。Skill 会先读取项目自己的规则和真实结构，再协助开发者决定样式入口与具体实现；结构不明确时必须询问，不得猜测。

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
- Navigation：Tabs、Menu、Pagination
- Overlays：Popover、Tooltip、Dialog、AlertDialog、Drawer
- Feedback（即时）：Toast

## 当前 Registry Pattern

- LoginForm：登录表单
- SettingsForm：项目设置表单
- FilterBar：响应式筛选栏
- DeleteConfirmation：高风险删除确认
- MobileBottomActionBar：适配安全区的移动端底部操作栏

Pattern 通过公开 shadcn Registry 交付，安装后代码归业务项目所有；它们组合 `@qhkg/react` 核心组件，但不复制核心组件实现。安装与接入方式见 [Registry 使用说明](registry/README.md)。

所有核心组件均包含 TypeScript 类型、Story、测试和 AI 元数据；Pattern 包含可交互 Story、Registry 元数据和 AI 接入说明。`design.qihao.dev` 由 Cloudflare Pages 托管，`/mcp` 由独立 Cloudflare Worker 提供 Storybook 文档工具。仓库已具备跨浏览器 CI、部署检查、发布包契约检查和 npm OIDC 发布工作流；npm Trusted Publisher 与 2FA 已启用，`@qhkg/react@0.3.0` 和 `@qhkg/tokens@0.2.0` 已公开发布。
