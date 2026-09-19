import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { FilterBar } from "./filter-bar";

const meta = {
  title: "Patterns/FilterBar",
  component: FilterBar,
  tags: ["autodocs", "ai-generated"],
  args: { onApply: fn(), onClear: fn() },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <FilterBar
      {...args}
      onApply={(event) => {
        event.preventDefault();
        args.onApply?.(event);
      }}
    />
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "搜索项目" }),
      "移动端",
    );
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "状态" }),
      "active",
    );
    await userEvent.click(canvas.getByRole("button", { name: "应用筛选" }));
    await expect(args.onApply).toHaveBeenCalledOnce();
  },
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
export const ClearAction: Story = {
  render: Default.render,
  play: async ({ args, canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "清除" }),
    );
    await expect(args.onClear).toHaveBeenCalledOnce();
  },
};
