import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Tabs } from "./Tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = () => (
  <Tabs defaultValue="overview">
    <Tabs.List aria-label="项目设置">
      <Tabs.Trigger value="overview">概览</Tabs.Trigger>
      <Tabs.Trigger value="members">成员</Tabs.Trigger>
      <Tabs.Trigger value="billing">账单</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview">查看项目的关键数据和最新状态。</Tabs.Content>
    <Tabs.Content value="members">管理成员、角色和访问权限。</Tabs.Content>
    <Tabs.Content value="billing">查看套餐和历史账单。</Tabs.Content>
  </Tabs>
);

export const Default: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "成员" }));
    await expect(canvas.getByText("管理成员、角色和访问权限。")).toBeVisible();
  },
};
export const Playground: Story = Default;
export const KeyboardNavigation: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("tab", { name: "概览" });
    first.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "成员" })).toHaveFocus();
  },
};
export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List aria-label="项目设置">
        <Tabs.Trigger value="overview">概览</Tabs.Trigger>
        <Tabs.Trigger value="members" disabled>
          成员
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">项目概览</Tabs.Content>
      <Tabs.Content value="members">成员列表</Tabs.Content>
    </Tabs>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Tabs defaultValue="one">
      <Tabs.List aria-label="较长的标签页名称">
        <Tabs.Trigger value="one">项目整体进展与关键指标</Tabs.Trigger>
        <Tabs.Trigger value="two">成员权限与协作设置</Tabs.Trigger>
        <Tabs.Trigger value="three">通知和自动化规则</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="one">内容可在移动端自然换行。</Tabs.Content>
      <Tabs.Content value="two">成员设置</Tabs.Content>
      <Tabs.Content value="three">通知设置</Tabs.Content>
    </Tabs>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
