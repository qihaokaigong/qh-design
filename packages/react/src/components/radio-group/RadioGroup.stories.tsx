import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs", "ai-generated"],
  args: { onValueChange: fn() },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = (props: ComponentProps<typeof RadioGroup>) => (
  <Field>
    <Field.Label>通知频率</Field.Label>
    <RadioGroup {...props}>
      <RadioGroup.Item value="instant">立即通知</RadioGroup.Item>
      <RadioGroup.Item value="daily">每日汇总</RadioGroup.Item>
      <RadioGroup.Item value="never">不通知</RadioGroup.Item>
    </RadioGroup>
  </Field>
);

export const Default: Story = {
  render: (args) => <Example {...args} defaultValue="daily" />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("radio", { name: "立即通知" }));
    await expect(args.onValueChange).toHaveBeenCalledWith("instant");
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => <Example defaultValue="instant" />,
};
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>通知频率</Field.Label>
      <RadioGroup>
        <RadioGroup.Item value="instant">立即通知</RadioGroup.Item>
        <RadioGroup.Item value="daily">每日汇总</RadioGroup.Item>
      </RadioGroup>
      <Field.Error>请选择通知频率。</Field.Error>
    </Field>
  ),
};
export const Disabled: Story = {
  render: () => <Example disabled defaultValue="daily" />,
};
export const LongContent: Story = {
  render: () => (
    <RadioGroup aria-label="同步策略" defaultValue="safe">
      <RadioGroup.Item value="safe">
        仅在连接到可信网络时自动同步项目文件
      </RadioGroup.Item>
      <RadioGroup.Item value="always">始终自动同步项目文件</RadioGroup.Item>
    </RadioGroup>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
