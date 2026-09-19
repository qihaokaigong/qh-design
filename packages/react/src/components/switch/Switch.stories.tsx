import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Switch } from "./Switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs", "ai-generated"],
  args: { children: "启用邮件通知", onCheckedChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const control = within(canvasElement).getByRole("switch", {
      name: "启用邮件通知",
    });
    await userEvent.click(control);
    await expect(control).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-2)" }}>
      <Switch>关闭状态</Switch>
      <Switch defaultChecked>开启状态</Switch>
    </div>
  ),
};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};
export const LongContent: Story = {
  args: { children: "允许系统在移动网络下自动上传较大的项目附件" },
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
