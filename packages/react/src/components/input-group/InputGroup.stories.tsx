import type { Meta, StoryObj } from "@storybook/react-vite";
import { DollarSign, Search, X } from "lucide-react";
import { expect, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { InputGroup } from "./InputGroup";

const meta = {
  title: "Forms/InputGroup",
  component: InputGroup,
  tags: ["autodocs", "ai-generated"],
  args: { size: "md" },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>搜索</Field.Label>
      <InputGroup {...args}>
        <InputGroup.Addon>
          <Search aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="搜索组件" />
      </InputGroup>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "搜索" });
    await userEvent.type(input, "Button");
    await expect(input).toHaveValue("Button");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 360 }}>
      <InputGroup>
        <InputGroup.Addon>https://</InputGroup.Addon>
        <InputGroup.Input aria-label="网站地址" defaultValue="qihao.dev" />
      </InputGroup>
      <InputGroup>
        <InputGroup.Addon>
          <DollarSign aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input aria-label="金额" defaultValue="120" />
        <InputGroup.Addon>CNY</InputGroup.Addon>
      </InputGroup>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid style={{ maxWidth: 360 }}>
      <Field.Label>域名</Field.Label>
      <InputGroup>
        <InputGroup.Addon>https://</InputGroup.Addon>
        <InputGroup.Input defaultValue="错误地址" />
      </InputGroup>
      <Field.Error>请输入有效域名。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup disabled style={{ maxWidth: 360 }}>
      <InputGroup.Input aria-label="搜索" defaultValue="不可修改" />
      <InputGroup.Action aria-label="清除">
        <X />
      </InputGroup.Action>
    </InputGroup>
  ),
};

export const LongContent: Story = {
  render: () => (
    <InputGroup style={{ maxWidth: 360 }}>
      <InputGroup.Addon>https://</InputGroup.Addon>
      <InputGroup.Input
        aria-label="项目地址"
        defaultValue="design.qihao.dev/components/forms/input-group"
      />
      <InputGroup.Addon>公开</InputGroup.Addon>
    </InputGroup>
  ),
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
