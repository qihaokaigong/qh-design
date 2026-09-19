import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu, MoreHorizontal, Search, Trash2 } from "lucide-react";
import { expect, fn, userEvent, within } from "storybook/test";

import { IconButton } from "./IconButton";

const meta = {
  title: "Actions/IconButton",
  component: IconButton,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "搜索",
    children: <Search />,
    onClick: fn(),
  },
  argTypes: {
    children: { control: false },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "搜索" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--qh-space-3)" }}>
      <IconButton aria-label="打开菜单" variant="primary">
        <Menu />
      </IconButton>
      <IconButton aria-label="更多操作" variant="secondary">
        <MoreHorizontal />
      </IconButton>
      <IconButton aria-label="搜索" variant="ghost">
        <Search />
      </IconButton>
      <IconButton aria-label="删除" variant="danger">
        <Trash2 />
      </IconButton>
    </div>
  ),
};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const LongContent: Story = {
  args: { "aria-label": "搜索全部项目、成员和最近访问的页面" },
};
export const Mobile: Story = {
  args: { "aria-label": "打开移动端菜单", children: <Menu /> },
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
