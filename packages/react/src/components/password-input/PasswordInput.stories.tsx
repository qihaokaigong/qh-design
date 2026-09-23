import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { PasswordInput } from "./PasswordInput";

const meta = {
  title: "Forms/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "密码",
    autoComplete: "current-password",
    onVisibilityChange: fn(),
  },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>密码</Field.Label>
      <PasswordInput {...args} />
    </Field>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("密码");
    await userEvent.type(input, "secret-123");
    await userEvent.click(canvas.getByRole("button", { name: "显示密码" }));
    await expect(input).toHaveAttribute("type", "text");
    await expect(args.onVisibilityChange).toHaveBeenCalledWith(true);
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 360 }}>
      <PasswordInput aria-label="隐藏密码" defaultValue="secret" />
      <PasswordInput
        aria-label="可见密码"
        defaultValue="visible-secret"
        defaultVisible
      />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid style={{ maxWidth: 360 }}>
      <Field.Label>新密码</Field.Label>
      <PasswordInput defaultValue="short" autoComplete="new-password" />
      <Field.Error>密码至少需要 12 个字符。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: "secret", disabled: true },
};

export const LongContent: Story = {
  args: { defaultValue: "a-very-long-password-example-for-layout-testing" },
};

export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
