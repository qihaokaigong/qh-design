import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

const meta = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "保存更改",
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          "用于提交表单或触发当前页面中的动作。导航到 URL 时使用 ButtonLink。",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "保存更改" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--qh-space-3)" }}
    >
      <Button variant="primary">主要操作</Button>
      <Button variant="secondary">次要操作</Button>
      <Button variant="ghost">工具操作</Button>
      <Button variant="danger">删除内容</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingText: "正在保存",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Mobile: Story = {
  args: {
    children: "继续",
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ width: "100%" }}>
        <StoryComponent />
      </div>
    ),
  ],
  parameters: {
    viewport: { defaultViewport: "mobile375" },
  },
};

export const AsLink: Story = {
  render: () => (
    <ButtonLink href="#button-link-target">查看使用说明</ButtonLink>
  ),
};
