import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { LoginForm } from "./login-form";

const meta = {
  title: "Patterns/LoginForm",
  component: LoginForm,
  tags: ["autodocs", "ai-generated"],
  args: { onSubmit: fn() },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <LoginForm
      {...args}
      onSubmit={(event) => {
        event.preventDefault();
        args.onSubmit?.(event);
      }}
    />
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "邮箱" }),
      "ai@example.com",
    );
    await userEvent.type(canvas.getByLabelText(/密码/), "example-password");
    await userEvent.click(canvas.getByRole("button", { name: "登录" }));
    await expect(args.onSubmit).toHaveBeenCalledOnce();
  },
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
export const LongContent: Story = {
  args: { forgotPasswordHref: "/account/recover-access" },
  render: Default.render,
};
