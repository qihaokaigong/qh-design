import { Button, ButtonLink } from "@qhkg/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { PageHeader } from "./page-header";

const onExport = fn();

const meta = {
  title: "Patterns/PageHeader",
  component: PageHeader,
  tags: ["autodocs", "ai-generated"],
  args: {
    actions: (
      <>
        <Button variant="secondary" onClick={onExport}>
          导出
        </Button>
        <ButtonLink href="#edit">编辑项目</ButtonLink>
      </>
    ),
    breadcrumbs: [
      { id: "home", label: "首页", href: "#home" },
      { id: "projects", label: "项目", href: "#projects" },
      { id: "current", label: "QH 设计系统" },
    ],
    description: "管理组件、发布流程和团队协作设置。",
    title: "QH 设计系统",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { level: 1, name: "QH 设计系统" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "导出" }));
    await expect(onExport).toHaveBeenCalledOnce();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile320" } },
};

export const LongContent: Story = {
  args: {
    description:
      "查看跨项目依赖、版本发布计划、无障碍验收结果和团队成员最近完成的协作任务。",
    title: "面向多个业务团队的设计系统能力建设与发布管理",
  },
};

export const WithoutBreadcrumbs: Story = {
  args: { breadcrumbs: undefined },
};
