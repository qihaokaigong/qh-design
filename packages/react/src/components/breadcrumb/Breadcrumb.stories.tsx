import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Stack } from "../stack";
import { Breadcrumb } from "./Breadcrumb";

const basicItems = [
  { id: "home", label: "首页", href: "/" },
  { id: "components", label: "组件", href: "/components" },
  { id: "breadcrumb", label: "面包屑" },
] as const;

const longPath = [
  { id: "home", label: "首页", href: "/" },
  { id: "workspace", label: "工作空间", href: "/workspace" },
  { id: "projects", label: "项目", href: "/workspace/projects" },
  {
    id: "design-system",
    label: "齐皓设计系统",
    href: "/workspace/projects/qh-design",
  },
  { id: "components", label: "组件", href: "/components" },
  { id: "breadcrumb", label: "面包屑" },
] as const;

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs", "ai-generated"],
  args: {
    items: basicItems,
  },
  argTypes: {
    defaultExpanded: { control: "boolean" },
    expandLabel: { control: "text" },
    separator: { control: false },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Playground: Story = {
  args: {
    "aria-label": "页面路径",
    defaultExpanded: false,
    expandLabel: "显示完整路径",
    items: longPath,
  },
};

export const States: Story = {
  render: () => (
    <Stack gap="6">
      <Breadcrumb aria-label="短路径" items={[basicItems[0]]} />
      <Breadcrumb
        aria-label="可链接的当前页面"
        items={[
          { id: "home", label: "首页", href: "/" },
          { id: "account", label: "账户", href: "/account" },
        ]}
      />
      <Breadcrumb
        aria-label="默认展开的长路径"
        defaultExpanded
        items={longPath}
      />
    </Stack>
  ),
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    separator: <span>／</span>,
  },
};

export const LongContent: Story = {
  args: {
    items: [
      { id: "home", label: "首页", href: "/" },
      {
        id: "project",
        label: "一个名称非常长、需要在有限空间内保持可读的项目",
        href: "/project",
      },
      {
        id: "section",
        label: "包含详细配置与跨项目协作规则的组件库文档章节",
        href: "/project/section",
      },
      { id: "current", label: "当前页面同样具有较长的标题" },
    ],
  },
};

export const Mobile: Story = {
  args: {
    items: longPath,
  },
  parameters: { viewport: { defaultViewport: "mobile320" } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const expand = canvas.getByRole("button", { name: "显示完整路径" });

    await userEvent.tab();
    await userEvent.tab();
    await expect(expand).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(
      canvas.queryByRole("button", { name: "显示完整路径" }),
    ).not.toBeInTheDocument();
  },
};

export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <Breadcrumb
        aria-label="مسار التنقل"
        expandLabel="إظهار المسار الكامل"
        items={[
          { id: "home", label: "الرئيسية", href: "/" },
          { id: "components", label: "المكونات", href: "/components" },
          { id: "breadcrumb", label: "مسار التنقل" },
        ]}
      />
    </div>
  ),
};
