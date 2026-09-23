import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { Combobox } from "./Combobox";

const options = [
  { value: "beijing", label: "北京", description: "中国大陆" },
  { value: "hong-kong", label: "香港", description: "中国香港" },
  { value: "singapore", label: "新加坡", description: "新加坡" },
  { value: "tokyo", label: "东京", description: "日本", disabled: true },
];

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "办公地点",
    options,
    placeholder: "搜索办公地点",
    onValueChange: fn(),
    onInputValueChange: fn(),
  },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("combobox", { name: "办公地点" });
    await userEvent.type(input, "香港");
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(await page.findByRole("option", { name: /香港/ }));
    await expect(args.onValueChange).toHaveBeenCalledWith("hong-kong");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 360 }}>
      <Combobox aria-label="未选择" options={options} placeholder="请选择" />
      <Combobox aria-label="已选择" options={options} defaultValue="beijing" />
      <Combobox aria-label="无数据" options={[]} placeholder="搜索地点" />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required style={{ maxWidth: 360 }}>
      <Field.Label>办公地点</Field.Label>
      <Combobox options={options} placeholder="搜索办公地点" />
      <Field.Error>请选择有效的办公地点。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: "beijing", disabled: true },
};

export const LongContent: Story = {
  args: {
    options: [
      {
        value: "global",
        label: "亚太区企业协作与设计系统联合创新中心",
        description: "跨多个时区协同工作的长期项目办公地点",
      },
      ...options,
    ],
  },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
