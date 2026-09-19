import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "../input";
import { Field } from "./Field";

const meta = {
  title: "Forms/Field",
  component: Field,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "组合 Label、Description、Error 和表单控件，并自动建立可访问性关联。",
      },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>邮箱</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.Description>用于接收服务通知。</Field.Description>
    </Field>
  ),
};

export const Playground: Story = Default;

export const Invalid: Story = {
  render: () => (
    <Field invalid required style={{ maxWidth: 360 }}>
      <Field.Label>邮箱</Field.Label>
      <Input type="email" defaultValue="not-an-email" />
      <Field.Description>请输入常用邮箱。</Field.Description>
      <Field.Error>邮箱格式不正确。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled style={{ maxWidth: 360 }}>
      <Field.Label>账号</Field.Label>
      <Input defaultValue="qihao" />
      <Field.Description>当前账号不可修改。</Field.Description>
    </Field>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>公开显示名称</Field.Label>
      <Input defaultValue="齐昊设计系统维护团队" />
      <Field.Description>
        该名称会显示在团队主页、共享链接和由系统发送的协作通知中。
      </Field.Description>
    </Field>
  ),
};

export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
