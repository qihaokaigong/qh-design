# ADR-0002：集合型选择组件采用 React Aria Components

日期：2026-09-22  
状态：**Accepted**  
决策者：QH 项目  
适用范围：`ListBox`、`Combobox`、`MultiSelect` 及后续需要集合导航的复杂输入

## 背景

QH 已使用原生 HTML 和 Radix Primitives 构建基础表单及 Overlay。原生 `select` 适合简单单选，Radix Select 也以单选为主，但 `ListBox`、可筛选 `Combobox` 和多选下拉还需要处理：

- 单选与多选状态模型；
- 方向键、Home、End、Escape、输入过滤和 typeahead；
- 鼠标、键盘、触屏和辅助技术的一致交互；
- 虚拟焦点、选项朗读、禁用项和空结果；
- 浮层定位、碰撞、可视高度和焦点还原；
- 受控、非受控及表单提交。

继续自行组合这些行为会复制成熟原语已经解决的复杂状态机。Radix 当前没有覆盖这三个集合型模式的同一套原语。

## 决策

在 `@qhkg/react` 中增加 `react-aria-components` 作为实现依赖，仅用于集合型复杂选择组件：

- `ListBox` 使用 React Aria ListBox 的集合、选择与键盘模型。
- `Combobox` 使用 React Aria ComboBox 的输入过滤、选项集合和浮层模型。
- `MultiSelect` 使用 React Aria Select 的多选模型和 ListBox 集合。
- QH 继续提供自己的稳定属性、CSS Modules、语义 Token、Field 集成、Story 和元数据，不直接把 React Aria 的全部 API 暴露为公共契约。

Radix 仍是 Button 以外现有交互组件和 Overlay 的默认行为原语。一个组件内部不得把 React Aria 的集合状态机与 Radix 的 Popover、Select 或焦点管理混合使用。

## API 边界

首版集合组件使用明确的字符串值选项：

```ts
interface CollectionOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

原因：字符串值可直接用于表单、URL 和序列化状态，也能避免把底层 `Key`、Collection 泛型与 `Selection = "all" | Set<Key>` 泄漏给使用者和 AI。

公开 API 遵循 QH 一致命名：

- 单选：`value` / `defaultValue` / `onValueChange`。
- 多选：`value: string[]` / `defaultValue: string[]` / `onValueChange`。
- 表单状态：`disabled`、`invalid`、`required`。
- 文案：空结果、占位符和本地化朗读文本由明确属性提供。

首版不开放任意自定义 Item 渲染、异步加载协议、虚拟化、创建新选项或无限多态。真实项目出现稳定需求后再扩展。

## 样式与移动端

- React Aria Components 保持无样式，仅使用 QH CSS Modules 和语义 Token。
- 默认控件高度为 44px，输入字号不小于 16px。
- 浮层宽度至少与触发器一致，最大高度使用动态 viewport 并允许内部滚动。
- 选项触控高度不小于 44px；选择状态不能只靠颜色表达。
- 动画使用 QH duration Token，并尊重 `prefers-reduced-motion`。

## 包与构建

- `react-aria-components` 是 `@qhkg/react` 的直接 dependency，不是 peer dependency。
- React 与 React DOM 继续由 `@qhkg/react` 作为 peer dependencies 管理。
- 构建保留 React Aria 为外部模块，由包管理器解析声明的依赖，避免把整套实现重复打入每个构建模块。
- 发布验证继续检查 SSR 导入、声明文件和静态文档。

## 验证要求

三个组件必须覆盖：

- 鼠标、键盘和触屏可达的选择路径；
- 受控与非受控状态；
- 禁用项、整体禁用、无效和空结果；
- 关闭后的焦点恢复；
- 320px、375px 与长内容；
- Storybook a11y、组件测试、SSR 构建和发布包契约。

## 后果

正面影响：集合导航、筛选、多选和跨输入方式行为由经过验证的实现承担，QH 只维护品牌 API 与视觉。

成本：发布包增加一套行为依赖，需要关注 React Aria 的升级、包体和与 Radix 共存的测试矩阵。后续组件不得因为依赖已经存在就自动采用 React Aria；超出本 ADR 范围仍需单独评审。

## 参考

- [React Aria Getting Started](https://react-aria.adobe.com/getting-started)
- [React Aria ListBox](https://react-aria.adobe.com/ListBox)
- [React Aria ComboBox](https://react-aria.adobe.com/ComboBox)
- [React Aria Select](https://react-aria.adobe.com/Select)
