import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./Badge";

const meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs", "ai-generated"],
  args: { children: "进行中" },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "info", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--qh-space-2)" }}
    >
      <Badge>草稿</Badge>
      <Badge tone="info">进行中</Badge>
      <Badge tone="success">已完成</Badge>
      <Badge tone="warning">待处理</Badge>
      <Badge tone="danger">失败</Badge>
    </div>
  ),
};
export const LongContent: Story = { args: { children: "等待管理员审核" } };
export const Mobile: Story = {
  ...States,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
