import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { useRef, useState } from "react";
import { ButtonLink } from "@qhkg/react";

import { MobileNav } from "./mobile-nav";

const items = [
  { href: "#overview", label: "概览", current: true },
  { href: "#projects", label: "项目" },
  { href: "#members", label: "成员" },
  { href: "#settings", label: "设置" },
] as const;

const meta = {
  title: "Patterns/MobileNav",
  component: MobileNav,
  tags: ["autodocs", "ai-generated"],
  args: {
    action: { href: "#create", label: "新建项目" },
    items,
  },
  parameters: { viewport: { defaultViewport: "mobile320" } },
} satisfies Meta<typeof MobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "打开主导航" });

    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await expect(page.getByRole("dialog", { name: "主导航" })).toBeVisible();
    await expect(page.getByRole("link", { name: "概览" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveFocus();
  },
};

export const Open: Story = {
  args: { defaultOpen: true },
};

export const LongLabels: Story = {
  args: {
    items: [
      { href: "#overview", label: "团队工作区概览", current: true },
      { href: "#projects", label: "跨部门协作项目与计划" },
      { href: "#members", label: "成员、角色与访问权限" },
    ],
  },
};

const FallbackFocusExample = () => {
  const fallbackRef = useRef<HTMLAnchorElement>(null);
  const [hideTrigger, setHideTrigger] = useState(false);
  return (
    <>
      <ButtonLink ref={fallbackRef} href="#home">
        工作台首页
      </ButtonLink>
      <MobileNav
        items={items}
        fallbackFocusRef={fallbackRef}
        triggerClassName={hideTrigger ? "hidden!" : undefined}
        onOpenChange={(open) => {
          if (open) setHideTrigger(true);
        }}
      />
    </>
  );
};

export const HiddenTriggerFocus: Story = {
  render: FallbackFocusExample,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "打开主导航" });
    await userEvent.click(trigger);
    const dialog = await within(canvasElement.ownerDocument.body).findByRole(
      "dialog",
      { name: "主导航" },
    );
    await waitFor(() => expect(trigger).not.toBeVisible());
    await userEvent.click(within(dialog).getByRole("button", { name: "关闭" }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    await waitFor(() =>
      expect(canvas.getByRole("link", { name: "工作台首页" })).toHaveFocus(),
    );
  },
};
