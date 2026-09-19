import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs", "ai-generated"],
  args: {
    children: "接收产品更新",
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", {
      name: "接收产品更新",
    });
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-2)" }}>
      <Checkbox>未选择</Checkbox>
      <Checkbox defaultChecked>已选择</Checkbox>
      <Checkbox defaultChecked="indeterminate">部分选择</Checkbox>
    </div>
  ),
};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true } };
export const LongContent: Story = {
  args: {
    children: "我已阅读并理解相关条款，包括数据使用、团队协作和通知设置说明。",
  },
  decorators: [
    (StoryComponent) => (
      <div style={{ maxWidth: 360 }}>
        <StoryComponent />
      </div>
    ),
  ],
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
