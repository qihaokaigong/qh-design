# @qh-design/react

QH Design System 的公共 React + TypeScript 组件包。

```bash
pnpm add @qh-design/react
```

在应用入口导入完整样式：

```tsx
import "@qh-design/react/styles.css";
import { Button, Field, Input } from "@qh-design/react";

export function SaveAction() {
  return (
    <Field required>
      <Field.Label>邮箱</Field.Label>
      <Input name="email" type="email" autoComplete="email" />
      <Field.Description>用于接收服务通知。</Field.Description>
      <Button type="submit">保存</Button>
    </Field>
  );
}
```

公开文档和组件状态见 [design.qihao.dev](https://design.qihao.dev/)。

核心组件的颜色、焦点、圆角和内部间距由 Design System 管理；`className` 用于页面布局和外部尺寸约束。

浮层组件使用复合 API，并在内部统一处理 Portal、层级、Escape 和焦点还原：

```tsx
import { Button, Dialog } from "@qh-design/react";

<Dialog>
  <Dialog.Trigger asChild>
    <Button>编辑项目</Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>编辑项目</Dialog.Title>
    <Dialog.Description>保存后立即生效。</Dialog.Description>
    <Dialog.Footer>
      <Dialog.Close asChild>
        <Button variant="secondary">取消</Button>
      </Dialog.Close>
      <Button>保存</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog>;
```

`Dialog` 用于普通任务；不可逆或高风险确认必须使用 `AlertDialog`。应用根部只需放置一个 `Toast.Provider`，其通知视口会自动创建。

数据表格使用原生表格语义，并把移动端横向滚动限制在组件自身范围内：

```tsx
import { Table } from "@qh-design/react";

<Table minWidth="md">
  <Table.Caption>最近订单</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head>订单</Table.Head>
      <Table.Head numeric>金额</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>#1042</Table.Cell>
      <Table.Cell numeric>¥299.00</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>;
```

`Table` 外层可聚焦，键盘用户可以在窄屏内横向滚动；可用 `scrollContainerLabel` 调整该区域的读屏名称。不要给页面根节点增加横向滚动来容纳表格。
