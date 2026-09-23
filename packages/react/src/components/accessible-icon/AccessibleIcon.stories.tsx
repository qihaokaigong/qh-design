import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search, Settings } from "lucide-react";

import { AccessibleIcon } from "./AccessibleIcon";

const meta = {
  title: "Foundation/AccessibleIcon",
  component: AccessibleIcon,
  tags: ["autodocs", "ai-generated"],
  args: { children: <Search />, label: "搜索" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof AccessibleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--qh-space-4)",
      }}
    >
      <AccessibleIcon label="小号设置图标" size="sm">
        <Settings />
      </AccessibleIcon>
      <AccessibleIcon label="中号设置图标">
        <Settings />
      </AccessibleIcon>
      <AccessibleIcon label="大号设置图标" size="lg">
        <Settings />
      </AccessibleIcon>
    </div>
  ),
};
export const InControl: Story = {
  render: () => (
    <button type="button">
      <AccessibleIcon label="搜索">
        <Search />
      </AccessibleIcon>
    </button>
  ),
};
export const LongContent: Story = {
  args: { children: <Settings />, label: "打开项目的高级设置与权限管理" },
};
export const Mobile: Story = {
  ...InControl,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
