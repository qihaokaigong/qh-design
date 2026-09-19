import type { Meta, StoryObj } from "@storybook/react-vite";

import { Field } from "../field";
import { Textarea } from "./Textarea";

const meta = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs", "ai-generated"],
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field style={{ maxWidth: 420 }}>
      <Field.Label>补充说明</Field.Label>
      <Textarea {...args} placeholder="请输入详细说明" />
    </Field>
  ),
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => <Textarea aria-label="已填写说明" defaultValue="已有内容" />,
};
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>原因</Field.Label>
      <Textarea />
      <Field.Error>请至少输入 10 个字。</Field.Error>
    </Field>
  ),
};
export const Disabled: Story = {
  args: {
    "aria-label": "补充说明",
    disabled: true,
    defaultValue: "不可修改",
  },
};
export const LongContent: Story = {
  args: {
    "aria-label": "补充说明",
    defaultValue:
      "这是一段较长的多行内容。\n它用于检查换行、滚动和纵向调整尺寸时的显示效果。\n组件不会限制业务所需的最大长度。",
  },
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
