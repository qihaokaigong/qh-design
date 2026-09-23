# QH Design System 能力补齐路线图

日期：2026-09-21  
状态：进行中

## 目标

在不扩大核心包职责边界的前提下，补齐多个 QH React 项目共同需要的基础语义、表单、数据操作和应用 Pattern，并把已有 beta 组件逐步提升为 stable。

## Batch 5：Foundation 与稳定化

- [x] Text
- [x] Heading
- [x] Link
- [x] AccessibleIcon
- [x] Accordion
- [ ] Story 视觉回归基线与 CI 阻断
- [ ] 320、375、768、1280px 和 200% 缩放自动验收
- [ ] React 18.3 与 React 19 测试矩阵
- [ ] beta 到 stable 的准入清单与逐组件无障碍状态

## Batch 6：表单与搜索

- [x] Fieldset 与 CheckboxGroup
- [x] InputGroup、SearchInput、PasswordInput、NumberInput
- [x] Combobox、ListBox 与 MultiSelect
- [x] React Hook Form 集成 Story

复杂选择组件在引入 React Aria 或其他第二套行为原语前必须新增 ADR。

## Batch 7：数据与应用 Pattern

- [x] Registry DataTable Pattern
- [x] 排序、筛选、选择、批量操作、加载、错误、空状态与分页联动
- [x] Header、MobileNav、SideNav、PageHeader 与 Toolbar Pattern
  - [x] Header 与 MobileNav
  - [x] SideNav、PageHeader 与 Toolbar
- [x] 列表页、详情页和搜索结果页 Pattern

DataTable 优先组合现有 Table、Pagination、Checkbox、Menu 和 FilterBar；只有多个项目需要相同状态模型时，才评审进入核心包。

## Batch 8：专业输入与补充展示

- [x] DatePicker、Calendar、DateRangePicker 与 TimeField
- [x] FileUpload 与 Dropzone
- [x] Avatar、DataList、Code、Kbd 与 AspectRatio
- [ ] Slider、SegmentedControl、ToggleGroup 与 Stepper
- [ ] Toast 队列和命令式通知管理
- [ ] locale、dir 与默认朗读文案 Provider

## 暂不优先

暗色与多品牌主题、图表、富文本编辑器、虚拟化 Tree/Grid、Command Palette 和拖拽排序继续按独立需求评审，不作为通用完整度指标直接加入核心包。

## 每项能力的交付门槛

核心组件必须同时提交实现、Story、测试、元数据和 Changeset。Registry Pattern 必须提交实现、交互 Story、Registry 元数据和至少一条关键端到端路径。所有新增交互必须覆盖键盘、焦点、禁用状态、移动端和减少动态效果。
