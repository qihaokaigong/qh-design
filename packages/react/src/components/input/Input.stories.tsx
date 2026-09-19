import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { Input } from "./Input";

const meta = {
  title: "Forms/Input",
  component: Input,
  tags: ["autodocs", "ai-generated"],
  args: { placeholder: "请输入内容" },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>姓名</Field.Label>
      <Input {...args} />
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "姓名" });
    await userEvent.type(input, "齐昊");
    await expect(input).toHaveValue("齐昊");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <Input aria-label="默认输入框" placeholder="默认" />
      <Input aria-label="已填写输入框" defaultValue="已填写内容" />
      <Input aria-label="无效输入框" invalid defaultValue="错误内容" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid style={{ maxWidth: 360 }}>
      <Field.Label>邮箱</Field.Label>
      <Input type="email" defaultValue="wrong" />
      <Field.Error>请输入有效邮箱。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "不可修改" },
};
export const LongContent: Story = {
  args: { defaultValue: "这是一段用于确认控件宽度和长内容显示方式的示例文本" },
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
