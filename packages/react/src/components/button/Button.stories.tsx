import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";
import { Menu } from "../menu";

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
      options: ["primary", "soft", "outline", "secondary", "ghost", "danger"],
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

export const QuietActions: Story = {
  tags: ["ai-generated"],
  render: () => (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--qh-space-3)" }}
    >
      <Button variant="primary">保存设置</Button>
      <Button variant="secondary">导出</Button>
      <Button variant="ghost">清除筛选</Button>
      <ButtonLink href="#details" variant="ghost">
        查看详情
      </ButtonLink>
      <Button variant="ghost" disabled>
        禁用操作
      </Button>
      <Button variant="ghost" loading loadingText="正在处理">
        处理项目
      </Button>
    </div>
  ),
};

export const Emphasis: Story = {
  tags: ["ai-generated"],
  render: () => (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "var(--qh-space-3)" }}
    >
      <Button>保存设置</Button>
      <Button variant="soft">预览更改</Button>
      <Button variant="outline">导出设置</Button>
      <Button variant="ghost">取消</Button>
      <ButtonLink variant="soft" href="#preview">
        查看预览
      </ButtonLink>
      <Button variant="soft" disabled>
        禁用预览
      </Button>
      <Button variant="outline" loading loadingText="正在导出">
        导出
      </Button>
      <Menu>
        <Menu.Trigger asChild>
          <Button variant="soft">更多操作</Button>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item>查看历史</Menu.Item>
        </Menu.Content>
      </Menu>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "更多操作" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

export const TruncatedLabel: Story = {
  tags: ["ai-generated"],
  render: () => (
    <div style={{ width: 160, maxWidth: "100%" }}>
      <Button
        style={{ width: "100%", minWidth: 0 }}
        aria-label="展开完整任务记录"
      >
        <span
          style={{
            display: "inline-flex",
            minWidth: 0,
            alignItems: "center",
            gap: 4,
          }}
        >
          <span aria-hidden="true">›</span>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            开发计时页面的移动端适配并验证手动补录和记录编辑
          </span>
          <span style={{ flexShrink: 0 }}>2 段</span>
        </span>
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", {
      name: "展开完整任务记录",
    });
    const bounds = button.getBoundingClientRect();
    const content = button.firstElementChild!.getBoundingClientRect();
    await expect(content.left).toBeGreaterThanOrEqual(bounds.left);
    await expect(content.right).toBeLessThanOrEqual(bounds.right);
    await expect(button.scrollWidth).toBeLessThanOrEqual(button.clientWidth);
    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};
