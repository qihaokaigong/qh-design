import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { NumberInput } from "./NumberInput";

const meta = {
  title: "Forms/NumberInput",
  component: NumberInput,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "数量",
    defaultValue: 2,
    min: 1,
    max: 10,
    onValueChange: fn(),
  },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field style={{ maxWidth: 240 }}>
      <Field.Label>数量</Field.Label>
      <NumberInput {...args} />
    </Field>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("spinbutton", { name: "数量" });
    await userEvent.click(canvas.getByRole("button", { name: "增加" }));
    await expect(input).toHaveValue(3);
    await expect(args.onValueChange).toHaveBeenCalledWith(3);
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 240 }}>
      <NumberInput aria-label="整数" defaultValue={5} />
      <NumberInput aria-label="小数" defaultValue={1.5} step={0.5} />
      <NumberInput aria-label="空值" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid style={{ maxWidth: 240 }}>
      <Field.Label>参会人数</Field.Label>
      <NumberInput defaultValue={0} min={1} />
      <Field.Error>参会人数至少为 1。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: 2, disabled: true },
};

export const LongContent: Story = {
  render: () => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>每个项目允许添加的最大协作者数量</Field.Label>
      <NumberInput defaultValue={25} min={1} max={100} />
      <Field.Description>可以输入 1 到 100 之间的整数。</Field.Description>
    </Field>
  ),
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
