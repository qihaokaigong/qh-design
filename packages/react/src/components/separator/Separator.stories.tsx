import type { Meta, StoryObj } from "@storybook/react-vite";

import { Separator } from "./Separator";

const meta = {
  title: "Surfaces/Separator",
  component: Separator,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%" }}>
      <span>上方内容</span>
      <Separator style={{ marginBlock: 16 }} />
      <span>下方内容</span>
    </div>
  ),
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 44, gap: 16 }}>
      <span>左侧</span>
      <Separator orientation="vertical" />
      <span>右侧</span>
    </div>
  ),
};
export const LongContent: Story = Default;
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
