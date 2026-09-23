import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Fieldset } from "../fieldset";
import { CheckboxGroup } from "./CheckboxGroup";

const meta = {
  title: "Forms/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "通知渠道",
    onValueChange: fn(),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: ["email"] },
  render: (args) => (
    <CheckboxGroup {...args}>
      <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
      <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
      <CheckboxGroup.Item value="push">应用内通知</CheckboxGroup.Item>
    </CheckboxGroup>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const sms = canvas.getByRole("checkbox", { name: "短信" });
    await userEvent.click(sms);
    await expect(sms).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith(["email", "sms"]);
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <CheckboxGroup aria-label="通知渠道" defaultValue={["email", "push"]}>
      <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
      <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
      <CheckboxGroup.Item value="push">应用内通知</CheckboxGroup.Item>
    </CheckboxGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Fieldset invalid required>
      <Fieldset.Legend>通知渠道</Fieldset.Legend>
      <CheckboxGroup>
        <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
        <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
      </CheckboxGroup>
      <Fieldset.Error>请至少选择一个通知渠道。</Fieldset.Error>
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <CheckboxGroup aria-label="通知渠道" defaultValue={["email"]} disabled>
      <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
      <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
    </CheckboxGroup>
  ),
};

export const LongContent: Story = {
  render: () => (
    <CheckboxGroup aria-label="通知渠道" style={{ maxWidth: 360 }}>
      <CheckboxGroup.Item value="security">
        当团队权限、安全策略或登录设备发生变化时立即发送通知
      </CheckboxGroup.Item>
      <CheckboxGroup.Item value="summary">
        每周发送包含项目进展和待处理事项的协作摘要
      </CheckboxGroup.Item>
    </CheckboxGroup>
  ),
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
