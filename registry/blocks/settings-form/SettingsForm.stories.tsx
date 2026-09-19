import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { SettingsForm } from "./settings-form";

const meta = {
  title: "Patterns/SettingsForm",
  component: SettingsForm,
  tags: ["autodocs", "ai-generated"],
  args: { onSubmit: fn() },
} satisfies Meta<typeof SettingsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SettingsForm
      {...args}
      onSubmit={(event) => {
        event.preventDefault();
        args.onSubmit?.(event);
      }}
    />
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole("textbox", { name: "项目名称" });
    await userEvent.clear(name);
    await userEvent.type(name, "新的项目名称");
    await userEvent.click(canvas.getByRole("button", { name: "保存设置" }));
    await expect(args.onSubmit).toHaveBeenCalledOnce();
  },
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
export const LongContent: Story = Default;
