import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { demoProjectDetail, ProjectDetailPage } from "./project-detail-page";

const meta = {
  title: "Patterns/ProjectDetailPage",
  component: ProjectDetailPage,
  tags: ["autodocs", "ai-generated"],
  args: {
    onArchive: fn(),
    onRetry: fn(),
  },
} satisfies Meta<typeof ProjectDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { level: 1, name: "QH 设计系统" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "归档项目" }));
    await expect(args.onArchive).toHaveBeenCalledWith("QH-108");
    await expect(
      canvas.getByRole("link", { name: "编辑项目" }),
    ).toHaveAttribute("href", "#edit-project");
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile320" } },
};

export const Loading: Story = {
  args: { state: "loading" },
};

export const Error: Story = {
  args: { state: "error" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "重试" }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
};

export const NotFound: Story = {
  args: { state: "not-found" },
};

export const LongContent: Story = {
  args: {
    project: {
      ...demoProjectDetail,
      description:
        "为多个业务团队提供统一、可访问、移动端优先的 React 组件、页面模式、发布流程、AI 接入文档与跨浏览器质量基线。",
      name: "跨产品线设计系统基础设施与组件标准化建设项目",
    },
  },
};
