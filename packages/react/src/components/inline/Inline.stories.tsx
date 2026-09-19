import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "../badge";
import { Button } from "../button";
import { Inline } from "./Inline";

const meta = {
  title: "Layout/Inline",
  component: Inline,
  tags: ["autodocs", "ai-generated"],
  args: { gap: "3", wrap: true },
  argTypes: {
    gap: { control: "select", options: ["1", "2", "3", "4", "6", "8"] },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
  },
} satisfies Meta<typeof Inline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Inline {...args}>
      <Badge>设计</Badge>
      <Badge>开发</Badge>
      <Badge>测试</Badge>
    </Inline>
  ),
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <Inline justify="between">
      <span>项目设置</span>
      <Button size="sm">保存</Button>
    </Inline>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Inline>
      <Badge>跨部门协作项目</Badge>
      <Badge>等待管理员审核</Badge>
      <Badge>计划于本周完成</Badge>
    </Inline>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
