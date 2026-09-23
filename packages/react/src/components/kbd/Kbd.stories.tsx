import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Kbd } from "./Kbd";

const meta = {
  title: "Foundations/Kbd",
  component: Kbd,
  tags: ["autodocs", "ai-generated"],
  args: { children: "⌘", size: "sm" },
  argTypes: { size: { control: "select", options: ["sm", "md"] } },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <span>
      按 <Kbd {...args} /> + <Kbd>K</Kbd> 打开搜索。
    </span>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByText("⌘")[0].tagName).toBe(
      "KBD",
    );
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--qh-space-3)" }}
    >
      <span>
        <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
      </span>
      <span>
        <Kbd size="md">Ctrl</Kbd> + <Kbd size="md">Enter</Kbd>
      </span>
    </div>
  ),
};

export const LongContent: Story = {
  args: { children: "Page Down", size: "md" },
};

export const Mobile: Story = {
  render: () => (
    <span>
      保存并继续：<Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>S</Kbd>
    </span>
  ),
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
