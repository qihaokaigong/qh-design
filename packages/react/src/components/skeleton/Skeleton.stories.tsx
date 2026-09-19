import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./Skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "rectangular", "circular"],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Skeleton {...args} style={{ maxWidth: 360 }} />,
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <div
      role="status"
      aria-busy="true"
      aria-label="正在加载个人资料"
      style={{
        display: "grid",
        gridTemplateColumns: "44px 1fr",
        gap: 12,
        maxWidth: 360,
      }}
    >
      <Skeleton variant="circular" />
      <div style={{ display: "grid", gap: 8 }}>
        <Skeleton />
        <Skeleton style={{ width: "70%" }} />
      </div>
    </div>
  ),
};
export const Static: Story = { args: { animated: false } };
export const LongContent: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 8 }}>
      <Skeleton />
      <Skeleton />
      <Skeleton style={{ width: "55%" }} />
    </div>
  ),
};
export const Mobile: Story = {
  ...States,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
