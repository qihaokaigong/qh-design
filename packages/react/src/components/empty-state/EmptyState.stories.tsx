import type { Meta, StoryObj } from "@storybook/react-vite";
import { FolderOpen } from "lucide-react";

import { Button } from "../button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs", "ai-generated"],
  args: {
    title: "暂无项目",
    description: "创建第一个项目后，它会显示在这里。",
    icon: <FolderOpen />,
    action: <Button>创建项目</Button>,
  },
  argTypes: { action: { control: false }, icon: { control: false } },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = { args: { action: undefined } };
export const LongContent: Story = {
  args: {
    title: "当前筛选条件下没有找到匹配的项目",
    description:
      "尝试移除部分筛选条件、调整搜索关键词，或者创建一个符合当前分类的新项目。",
  },
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
