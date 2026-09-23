import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { SideNav } from "./side-nav";

const items = [
  { href: "#general", label: "基本信息", current: true },
  { href: "#members", label: "成员与权限" },
  { href: "#notifications", label: "通知设置" },
  { href: "#danger", label: "危险操作" },
] as const;

const meta = {
  title: "Patterns/SideNav",
  component: SideNav,
  tags: ["autodocs", "ai-generated"],
  args: { items, title: "项目设置" },
} satisfies Meta<typeof SideNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const current = canvas.getByRole("link", { name: "基本信息" });
    await expect(current).toHaveAttribute("aria-current", "page");
    await userEvent.tab();
    await expect(current).toHaveFocus();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile320" } },
};

export const LongLabels: Story = {
  args: {
    items: [
      { href: "#general", label: "工作区基本信息与识别设置", current: true },
      { href: "#members", label: "成员角色、权限与外部协作访问" },
      { href: "#notifications", label: "自动通知、摘要与订阅偏好" },
    ],
  },
};
