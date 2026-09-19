import type { Meta, StoryObj } from "@storybook/react-vite";

import { Progress } from "./Progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs", "ai-generated"],
  args: { label: "上传进度", showValue: true, value: 64 },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24, maxWidth: 480 }}>
      <Progress label="尚未开始" value={0} showValue />
      <Progress label="进行中" value={48} showValue />
      <Progress label="已完成" value={100} showValue />
    </div>
  ),
};
export const Indeterminate: Story = {
  args: { label: "正在准备文件", value: null, showValue: false },
};
export const LongContent: Story = {
  args: {
    label: "正在上传项目归档和所有关联的设计资源",
    value: 72,
    showValue: true,
  },
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
