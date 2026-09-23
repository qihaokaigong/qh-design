import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { SearchInput } from "./SearchInput";

const meta = {
  title: "Forms/SearchInput",
  component: SearchInput,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "搜索",
    placeholder: "搜索组件",
    onValueChange: fn(),
  },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>搜索</Field.Label>
      <SearchInput {...args} />
    </Field>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "搜索" });
    await userEvent.type(input, "Button");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("Button");
    await userEvent.click(canvas.getByRole("button", { name: "清除搜索" }));
    await expect(input).toHaveValue("");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 360 }}>
      <SearchInput aria-label="空搜索" placeholder="搜索组件" />
      <SearchInput aria-label="已有搜索" defaultValue="Button" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid style={{ maxWidth: 360 }}>
      <Field.Label>搜索</Field.Label>
      <SearchInput defaultValue="不存在的组件" />
      <Field.Error>没有找到匹配的组件。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: "Button", disabled: true },
};

export const LongContent: Story = {
  args: {
    defaultValue: "带有完整无障碍状态和移动端适配能力的表单输入组件",
  },
};

export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
