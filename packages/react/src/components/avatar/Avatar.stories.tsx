import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Avatar } from "./Avatar";

const meta = {
  title: "Data/Avatar",
  component: Avatar,
  tags: ["autodocs", "ai-generated"],
  args: { name: "Qi Hao" },
  argTypes: {
    shape: { control: "select", options: ["circle", "square"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(
      within(canvasElement).getByRole("img", { name: "Qi Hao" }),
    ).toBeVisible();
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--qh-space-3)",
      }}
    >
      <Avatar name="Small Avatar" size="sm" />
      <Avatar name="Medium Avatar" />
      <Avatar name="Large Square Avatar" size="lg" shape="square" />
      <Avatar name="Custom Fallback" fallback="企" />
    </div>
  ),
};

export const LongContent: Story = {
  args: { name: "Qi Hao Design System Enterprise Collaboration Team" },
};

export const Mobile: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--qh-space-3)",
      }}
    >
      <Avatar name="Qi Hao" alt="" />
      <span>Qi Hao 设计系统维护团队</span>
    </div>
  ),
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
