import { Button, Select } from "@qhkg/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Toolbar } from "./toolbar";

const onCreate = fn();
const onQueryChange = fn();

const meta = {
  title: "Patterns/Toolbar",
  component: Toolbar,
  tags: ["autodocs", "ai-generated"],
  args: {
    actions: <Button onClick={onCreate}>新建项目</Button>,
    filters: (
      <Select aria-label="项目状态" defaultValue="all">
        <option value="all">全部状态</option>
        <option value="active">进行中</option>
        <option value="completed">已完成</option>
      </Select>
    ),
    onQueryChange,
    searchLabel: "搜索项目",
    searchPlaceholder: "名称或负责人",
    status: "共 24 个项目",
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "搜索项目" }),
      "移动端",
    );
    await expect(onQueryChange).toHaveBeenLastCalledWith("移动端");
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "项目状态" }),
      "active",
    );
    await userEvent.click(canvas.getByRole("button", { name: "新建项目" }));
    await expect(onCreate).toHaveBeenCalledOnce();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile320" } },
};

export const MultipleActions: Story = {
  args: {
    actions: (
      <>
        <Button variant="secondary">导出</Button>
        <Button onClick={onCreate}>新建项目</Button>
      </>
    ),
  },
};
