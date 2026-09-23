import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Header } from "./header";

const items = [
  { href: "#overview", label: "概览", current: true },
  { href: "#projects", label: "项目" },
  { href: "#members", label: "成员" },
  { href: "#settings", label: "设置" },
] as const;

const meta = {
  title: "Patterns/Header",
  component: Header,
  tags: ["autodocs", "ai-generated"],
  args: {
    action: { href: "#create", label: "新建项目" },
    items,
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("navigation", { name: "主导航" }),
    ).toBeVisible();
    await expect(canvas.getByRole("link", { name: "概览" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(canvas.getByRole("link", { name: "新建项目" })).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile320" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.queryByRole("navigation", { name: "主导航" }),
    ).not.toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "新建项目" })).toBeVisible();

    const trigger = canvas.getByRole("button", { name: "打开主导航" });
    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await expect(
      page.getByRole("dialog", { name: "QH 工作台导航" }),
    ).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveFocus();
  },
};

export const LongBrand: Story = {
  args: { brandName: "QH 团队协作工作台" },
};
