import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Link } from "./Link";

const meta = {
  title: "Foundation/Link",
  component: Link,
  tags: ["autodocs", "ai-generated"],
  args: { children: "查看组件文档", href: "#link-example" },
  argTypes: {
    underline: { control: "select", options: ["always", "hover"] },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)" }}>
      <Link href="#always">始终显示下划线</Link>
      <Link href="#hover" underline="hover">
        悬停或聚焦时强调
      </Link>
    </div>
  ),
};
export const KeyboardFocus: Story = {
  args: { children: "键盘可聚焦链接", href: "#keyboard" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole("link", { name: "键盘可聚焦链接" }),
    ).toHaveFocus();
  },
};
export const LongContent: Story = {
  args: {
    children: "查看关于组件升级、兼容范围与迁移步骤的完整说明",
    href: "#long-link",
  },
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
