import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import { Menu } from "./Menu";

const meta = {
  title: "Navigation/Menu",
  component: Menu,
  tags: ["autodocs", "ai-generated"],
  args: { onOpenChange: fn() },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = (props: Story["args"]) => (
  <Menu {...props}>
    <Menu.Trigger asChild>
      <Button variant="secondary">更多操作</Button>
    </Menu.Trigger>
    <Menu.Content>
      <Menu.Label>项目</Menu.Label>
      <Menu.Item>重命名</Menu.Item>
      <Menu.Item>创建副本</Menu.Item>
      <Menu.Item disabled>移动到归档</Menu.Item>
      <Menu.Separator />
      <Menu.Item destructive>删除项目</Menu.Item>
    </Menu.Content>
  </Menu>
);

export const Default: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "更多操作" }));
    await waitFor(() =>
      expect(within(document.body).getByRole("menu")).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
  },
};
export const Playground: Story = Default;
export const KeyboardNavigation: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "更多操作",
    });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    await expect(
      within(document.body).getByRole("menuitem", { name: "重命名" }),
    ).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
    await waitFor(() =>
      expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument(),
    );
  },
};
export const CheckboxItems: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger asChild>
        <Button variant="secondary">显示字段</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Label>字段</Menu.Label>
        <Menu.CheckboxItem defaultChecked>负责人</Menu.CheckboxItem>
        <Menu.CheckboxItem>截止日期</Menu.CheckboxItem>
      </Menu.Content>
    </Menu>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger asChild>
        <Button variant="secondary">项目操作</Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item>将项目复制到另一个团队工作区并保留成员权限</Menu.Item>
        <Menu.Item>导出全部项目数据和历史操作记录</Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
