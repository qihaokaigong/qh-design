import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { DeleteConfirmation } from "./delete-confirmation";

const meta = {
  title: "Patterns/DeleteConfirmation",
  component: DeleteConfirmation,
  tags: ["autodocs", "ai-generated"],
  args: { itemName: "移动端应用", onConfirm: fn() },
} satisfies Meta<typeof DeleteConfirmation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "删除" });
    await userEvent.click(trigger);
    const body = within(document.body);
    await waitFor(() => expect(body.getByRole("alertdialog")).toBeVisible());
    await expect(body.getByRole("button", { name: "取消" })).toHaveFocus();
    await userEvent.click(body.getByRole("button", { name: "确认删除" }));
    await expect(args.onConfirm).toHaveBeenCalledOnce();
    await expect(trigger).toHaveFocus();
  },
};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile320" } },
  play: Default.play,
};
export const LongContent: Story = {
  args: { itemName: "跨团队协作与长期内容归档项目" },
};
