# ADR-0003：日期与时间组件采用 React Aria 和 ISO 字符串边界

日期：2026-09-22  
状态：**Accepted**  
决策者：QH 项目  
适用范围：`Calendar`、`DatePicker`、`DateRangePicker` 与 `TimeField`

## 背景

日期和时间输入不只是格式化文本。完整实现还需要处理：

- 按地区排列和朗读年月日及时、分、秒；
- 分段键盘编辑、方向键增减、日历网格导航与焦点恢复；
- 月份长度、闰年、最小值、最大值和不可用日期；
- 受控、非受控、禁用、只读、必填、无效与表单提交；
- 日历弹层的定位、视口避让、触屏目标和减少动态效果；
- 不同日历系统与后续统一 `locale`、`dir` Provider 的兼容性。

原生日期控件的界面和可定制能力依赖浏览器与平台，无法稳定承载 QH 的统一视觉和内嵌 Calendar。Radix 当前不提供日期或时间输入原语。自行实现上述状态机会复制成熟无障碍原语已经解决的复杂行为。

## 决策

QH 使用 React Aria Components 的 DatePicker、Calendar、RangeCalendar 与 TimeField 作为行为层，并直接依赖 `@internationalized/date` 完成确定性的解析和序列化。

QH 继续负责：

- 稳定、收敛的公共属性；
- Field 上下文集成；
- QH 语义 Token、CSS Modules 与移动端适配；
- Story、测试、组件元数据和发布契约。

日期组件内部不混用 Radix Popover 或其他焦点管理器。React Aria 负责同一交互内的分段输入、日历、弹层和焦点状态。

## 值模型与 API 边界

公共 API 只暴露可序列化字符串，不暴露 React Aria 或 `@internationalized/date` 对象：

```ts
type CalendarDateValue = string; // YYYY-MM-DD

interface DateRangeValue {
  start: string;
  end: string;
}

type TimeValue = string; // HH:mm 或 HH:mm:ss；回调规范化为 HH:mm:ss
```

- 单值继续使用 `value`、`defaultValue` 和 `onValueChange`。
- `Calendar`、`DatePicker` 和 `DateRangePicker` 的日期是无时区的 ISO 8601 日历日期。
- `TimeField` 表示无日期、无时区的本地时刻；不承担时区换算。
- 非空受控值和边界值必须是有效 ISO 字符串。无效字符串直接抛出解析错误，避免静默纠正业务数据。
- `isDateUnavailable` 接收 ISO 日期字符串，使业务规则不依赖底层日期对象。
- `DatePicker` 与 `TimeField` 使用 `name` 参与原生表单，并提交规范化 ISO 字符串。日期范围由 `onValueChange` 显式接入表单状态，避免隐含字段命名协议。

需要瞬时绝对时间、时区、日期时间组合或自然语言解析时，应由业务层先转换成这里的日历日期或本地时间，或另行评审专门组件。

## 国际化

- 组件遵循应用层 React Aria `I18nProvider` 或浏览器语言环境，不在组件内部固定地区。
- 月份、星期、字段顺序和数字由 React Aria 根据地区生成。
- QH 只为自身可见操作提供默认中文文案，例如“打开日历”“上个月”“下个月”，并允许属性覆盖。
- QH 统一的 `locale`、`dir` 与默认朗读文案 Provider 仍按路线图独立交付；本 ADR 不提前创建第二套上下文。

## 样式与移动端

- 默认表单控件高度为 44px，日历日期单元格高度为 44px。
- 日历宽度不得超过视口减去安全边距，320px 视口不得产生页面横向滚动。
- 选中、范围起止、今天、不可用、无效和焦点状态不能只依赖颜色区分。
- 弹层限制动态视口高度并允许内部滚动。
- 过渡使用 QH 时长 Token，并尊重 `prefers-reduced-motion`。

## 包与构建

- `react-aria-components` 与 `@internationalized/date` 是 `@qhkg/react` 的直接 dependencies。
- 两个包在库构建时保持 external，由使用者安装的 `@qhkg/react` 依赖解析，避免重复打包。
- React 与 React DOM 继续作为 peer dependencies。
- 发布验证必须覆盖声明文件、SSR 导入、静态文档和安装后依赖完整性。

## 验证要求

四个组件必须覆盖：

- ISO 字符串解析、回调序列化和受控/非受控状态；
- 键盘分段编辑与日历网格导航；
- 最小值、最大值、不可用日期、禁用、只读、必填和无效状态；
- 弹层关闭后的焦点恢复；
- 320px、375px、长名称和动态视口；
- Storybook a11y、组件测试、SSR 构建和发布包契约。

## 后果

正面影响：日期算法、国际化、键盘和辅助技术行为由成熟实现承担，业务获得可直接持久化的稳定字符串 API。

成本：QH 需要维护字符串与日期对象之间的适配层，并跟踪 React Aria 与 `@internationalized/date` 的兼容版本。将来增加日期时间、时区、多月日历或自定义日历系统时，必须继续遵守此值边界，或通过新 ADR 明确迁移方案。

## 参考

- [React Aria DatePicker](https://react-aria.adobe.com/DatePicker)
- [React Aria Calendar](https://react-aria.adobe.com/Calendar)
- [React Aria DateRangePicker](https://react-aria.adobe.com/DateRangePicker)
- [React Aria TimeField](https://react-aria.adobe.com/TimeField)
- [Internationalized Date](https://react-spectrum.adobe.com/internationalized/date/index.html)
