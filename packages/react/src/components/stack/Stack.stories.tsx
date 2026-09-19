import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button";
import { Stack } from "./Stack";

const meta = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs", "ai-generated"],
  args: { gap: "4" },
  argTypes: {
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    gap: { control: "select", options: ["1", "2", "3", "4", "6", "8"] },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Item = ({ children }: { children: string }) => (
  <div
    style={{
      padding: "var(--qh-space-3)",
      background: "var(--qh-color-surface-subtle)",
    }}
  >
    {children}
  </div>
);
export const Default: Story = {
  render: (args) => (
    <Stack {...args}>
      <Item>第一项</Item>
      <Item>第二项</Item>
      <Item>第三项</Item>
    </Stack>
  ),
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <Stack gap="2" align="start">
      <Button size="sm">保存</Button>
      <Button size="sm" variant="secondary">
        取消
      </Button>
    </Stack>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Stack>
      <Item>
        一段较长的内容会保持纵向排列并自然换行，不需要页面自行维护相邻元素之间的间距。
      </Item>
      <Item>第二段内容</Item>
    </Stack>
  ),
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
