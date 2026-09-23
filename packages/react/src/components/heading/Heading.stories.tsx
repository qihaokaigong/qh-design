import type { Meta, StoryObj } from "@storybook/react-vite";

import { Heading } from "./Heading";

const meta = {
  title: "Foundation/Heading",
  component: Heading,
  tags: ["autodocs", "ai-generated"],
  args: { children: "项目概览", level: 2 },
  argTypes: {
    level: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)" }}>
      <Heading level={1}>一级标题</Heading>
      <Heading level={2}>二级标题</Heading>
      <Heading level={3}>三级标题</Heading>
      <Heading level={4}>四级标题</Heading>
    </div>
  ),
};
export const LongContent: Story = {
  args: {
    children: "一个会在较窄内容区域自然换行的较长页面标题",
    level: 2,
  },
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
