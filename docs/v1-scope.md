# QH Design System v1 组件范围

日期：2026-09-18  
状态：Frozen

## 原则

- 每一批都必须形成“组件、Story、测试、元数据、AI 可查询”的完整闭环。
- 未完成当前批次验收前，不并行扩张下一批组件。
- 复杂业务 Pattern 先进入 Registry，不直接进入核心包。

## Batch 0：工程与垂直切片

- Design Token 公共包
- Storybook、a11y、MCP 和 AI 静态索引
- Button
- ButtonLink
- VisuallyHidden

验收：本地可构建两个公共包；Button 的默认、变体、loading、disabled、移动端和交互 Story 可运行；AI 索引能够发现组件。

## Batch 1：基础动作与表单

- IconButton
- Field
- Input
- Textarea
- Checkbox
- RadioGroup
- Switch
- Select

## Batch 2：表面、布局与反馈

- Card
- Badge
- Separator
- Alert
- Progress
- Skeleton
- EmptyState
- PageContainer
- Stack
- Inline
- Grid

## Batch 3：导航与浮层

- Tabs
- Menu
- Pagination
- Popover
- Tooltip
- Dialog
- AlertDialog
- Drawer
- Toast

## Batch 4：数据与首批 Pattern

- Table
- 登录表单
- 设置表单
- 筛选栏
- 删除确认
- 移动端底部操作区

## v1 之外

DatePicker、Combobox、DataTable、Command、复杂导航、图表、富文本编辑器和暗色主题需要独立评审。
