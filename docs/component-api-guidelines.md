# QH 组件 API 与 AI 可用性规范

日期：2026-09-18  
状态：Accepted  
依赖：[ADR-0001](adr/0001-component-library-architecture.md)

## 目标

组件 API 必须同时对人和 AI 清晰：名称能表达用途，类型能排除无效组合，示例能直接运行，错误用法能够被测试或 lint 尽早发现。

## 1. 命名原则

- 组件名描述语义，不描述当前视觉。使用 `AlertDialog`，不使用 `RedModal`。
- 行为和导航分开：`Button` 触发动作，`ButtonLink` 导航。
- 危险确认使用 `AlertDialog`，普通表单弹层使用 `Dialog`。
- 状态名称保持统一：`loading`、`disabled`、`invalid`、`required`。
- 视觉枚举保持统一：`variant`、`size`、`tone`。
- 不使用含义模糊的 `type` 同时表达 HTML 类型和视觉类型。

## 2. 属性设计

### 推荐

```ts
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">;
```

### 禁止布尔爆炸

不允许：

```tsx
<Button primary danger compact rounded quiet />
```

这类组合很难判断优先级，也容易让 AI 生成互相冲突的属性。应使用有限枚举或判别联合。

### 默认值

- 默认值必须写入类型 JSDoc、Storybook Controls 和元数据。
- 默认 `size="md"` 对应 44px 控件高度。
- 默认视觉必须满足浅色主题对比度要求。
- 不提供隐式暗色行为。

## 3. 受控与非受控模式

具有状态的组件遵循 React 一致模式：

- 受控：`value` / `open` / `checked` + `onValueChange` / `onOpenChange` / `onCheckedChange`。
- 非受控：`defaultValue` / `defaultOpen` / `defaultChecked`。
- 同一个实例不允许在受控和非受控之间切换。
- 回调名表达状态变化，不使用模糊的 `onChange` 承载多种数据结构，原生 Input 除外。
- 事件回调不吞掉底层原生事件；需要阻止默认行为时必须记录。

## 4. 组合与结构

复杂组件优先使用可发现的 compound API：

```tsx
<Field invalid={Boolean(error)}>
  <Field.Label>邮箱</Field.Label>
  <Input type="email" />
  <Field.Description>用于接收通知</Field.Description>
  <Field.Error>{error}</Field.Error>
</Field>
```

规则：

- 子组件名称带父级命名空间，减少 AI 误配。
- 必需的可访问性关系由组件自动生成 ID 并连接。
- 不依赖 DOM 子节点顺序猜测语义。
- 不允许把关键 Label、Description、Error 仅作为字符串 prop，除非简单组件确有必要。

## 5. 多态与 `asChild`

- v1 不在所有组件上普遍开放 `asChild`。
- 导航使用显式 `ButtonLink` 或 `Link`。
- 只有经过类型、可访问性和 Story 验证的组件才能开放 `asChild`。
- 使用 `asChild` 后，调用者负责保留可聚焦性、语义和事件行为；文档必须展示正确与错误示例。

原因：无限多态会让类型、ref、禁用状态和 AI 推理变得不稳定。

## 6. `className` 与样式逃生口

- 所有顶层 DOM 组件可以接受 `className`。
- `className` 用于外部布局、定位、宽高约束和页面响应式排列。
- 禁止用它长期覆盖品牌颜色、内部间距、焦点、错误态和圆角。
- 内部 slot 不默认开放 className map；确有扩展需求时提供命名 slot API 并单独评审。
- 不提供任意 `color` 字符串；状态色使用 `tone`，品牌层级使用 `variant`。
- 不提供任意 `size: number` 改写控件高度；内容容器类组件除外。

## 7. ref 与 DOM 属性

- 可交互组件必须转发 ref 到主要可交互 DOM 节点。
- 原生兼容属性应尽量透传，但要排除会破坏语义的冲突属性。
- `Button` 默认 `type="button"`，避免在表单中意外提交；提交操作显式传 `type="submit"`。
- 自定义控件若使用 `aria-disabled`，必须同时阻止点击和键盘激活。
- `data-*` 与 `aria-*` 属性允许透传。

## 8. 状态模型

所有交互组件至少覆盖：

- default
- hover（仅在支持 hover 的设备增强）
- pressed/open/selected（适用时）
- focus-visible
- disabled
- loading（异步动作适用时）
- invalid（表单适用时）

状态优先级：

```text
disabled > pressed > hover > default
```

`focus-visible` 可以和 invalid、selected 同时存在，不能被覆盖。

Loading 规则：

- 保持原布局宽度，避免跳动。
- 阻止重复提交。
- 使用 `aria-busy`。
- Spinner 不能成为唯一说明；保留文字或提供 `loadingText`。
- 有真实进度时使用 Progress，而不是无限 Spinner。

## 9. 可访问性契约

- 目标为 WCAG 2.2 AA，但自动化测试不等于完整合规。
- 所有交互组件具有可访问名称。
- 键盘行为遵循对应 WAI-ARIA Pattern。
- Dialog 打开时正确移动焦点，关闭后还原到触发器。
- Tooltip 不能承载关键操作唯一说明。
- 状态不得只通过颜色表达。
- 错误说明通过 `aria-describedby` 关联，并设置 `aria-invalid`。
- 图标按钮必须要求 `aria-label` 或可见文本。
- 装饰图标默认 `aria-hidden="true"`。
- 尊重浏览器缩放、系统字号和 `prefers-reduced-motion`。

## 10. 移动端契约

- 交互目标默认不少于 44px。
- 移动端 Input、Textarea、Select 字号不少于 16px。
- 操作不能只在 hover 出现。
- 弹层最大高度使用动态 viewport，并考虑 safe-area inset。
- 键盘弹出后，当前字段和主要操作仍可访问。
- Popover/Menu 必须处理碰撞和触屏关闭。
- Table 的横向滚动属于 Table 容器，不属于页面。
- 组件本身不根据 user agent 判断设备。

## 11. 响应式 API

- Primitive 不普遍接受响应式对象属性，避免 API 复杂化。
- 响应式布局由 `Stack`、`Inline`、`Grid`、`PageContainer` 或页面 Tailwind class 负责。
- 只有组件行为确实随空间变化时才提供响应式组件，例如经过验证的 `ResponsiveOverlay`。
- 不自动把所有 Dialog 在移动端变成 Drawer；语义和焦点行为变化必须显式。

## 12. 表单契约

- `placeholder` 不能替代 Label。
- `Field` 负责 Label、Description、Error 和控件之间的关联。
- Input 保持原生 `name`、`value`、`defaultValue`、`autoComplete` 等能力。
- Select、Checkbox、RadioGroup、Switch 使用对应原生或 Radix 语义。
- 校验库不绑定在核心组件中；提供与 React Hook Form 等工具组合的示例，而不将其变为 peer dependency。

## 13. Overlay 契约

| 需求                     | 使用组件     |
| ------------------------ | ------------ |
| 普通补充任务或表单       | Dialog       |
| 不可逆或高风险确认       | AlertDialog  |
| 从屏幕边缘进入的辅助任务 | Drawer/Sheet |
| 与触发元素相关的少量内容 | Popover      |
| 短暂动作列表             | Menu         |
| 非关键短说明             | Tooltip      |

所有 Overlay 必须测试：Portal、层级、Escape、外部点击、焦点捕获、焦点还原、内容溢出和嵌套场景。

## 14. Server Rendering

- 模块初始化阶段禁止访问 `window`、`document`、`navigator` 或布局信息。
- 需要浏览器 API 的逻辑放到 effect 或事件处理器中。
- 服务端和客户端首屏结构必须一致，避免 hydration mismatch。
- 自动生成 ID 使用 React `useId` 或底层原语提供的稳定机制。
- 交互组件保留 `use client`；构建不得移除该指令。

## 15. 组件元数据

每个 `*.meta.json` 至少包含：

```json
{
  "name": "AlertDialog",
  "summary": "确认不可逆或高风险操作",
  "status": "stable",
  "import": "import { AlertDialog } from '@qh-design/react'",
  "storybookId": "overlays-alertdialog",
  "whenToUse": ["删除无法恢复的数据"],
  "avoidWhen": ["普通信息展示", "可安全撤销的轻量操作"],
  "mobile": ["操作按钮在窄屏纵向排列"],
  "accessibility": ["初始焦点优先落在取消按钮"],
  "related": ["Dialog", "Toast"],
  "stories": ["Default", "LongContent", "Mobile"]
}
```

状态只能是：`experimental`、`beta`、`stable`、`deprecated`。

元数据必须通过 JSON Schema 验证，并用于生成组件索引、`llms.txt` 和 Storybook 补充文档。

## 16. Story 要求

每个组件至少包含：

- `Default`
- `Playground`
- `States`
- `Mobile`
- `LongContent`
- `Disabled` / `Loading` / `Invalid`（适用时）
- 关键键盘交互的 `play` test

Story 应展示一个明确概念，并解释“为什么使用”，而不是只展示外观。

反例可以进入文档，但必须标记为反例并关闭相应自动可访问性检查的范围；不得为了让 CI 通过而全局关闭 a11y。

## 17. AI 决策规则

AI 在生成 UI 时遵循：

1. 先按用户意图查询组件和 Pattern。
2. 查询目标组件的完整属性和示例。
3. 使用语义组件，不使用 `div` 模拟已有控件。
4. 不猜测未记录的 prop。
5. 不添加 HEX、任意灰色或未定义品牌色。
6. 不通过大量 class 覆盖组件内部视觉。
7. 为生成结果建立或更新 Story。
8. 运行相关交互、a11y 和响应式检查。
9. 无现成能力时报告缺口，先在业务层实现，不擅自扩大核心 API。

## 18. 新组件准入

新组件进入 `@qh-design/react` 前必须满足：

- 至少两个真实项目或两个明确场景需要，基础无业务组件除外。
- 无现有组件或 Pattern 能合理覆盖。
- 语义、键盘行为和移动端行为已经定义。
- API 评审通过，没有明显布尔爆炸或无效组合。
- Story、测试、元数据和变更说明完整。
- Bundle 和依赖成本已评估。

尚未稳定的能力先进入业务项目或 Registry Pattern，达到复用条件后再提升。
