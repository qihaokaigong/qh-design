import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "design", label: "设计", description: "界面、品牌与体验设计" },
  { value: "engineering", label: "工程", description: "前端、后端与平台研发" },
  { value: "operations", label: "运营", description: "内容、活动与用户运营" },
  { value: "finance", label: "财务", disabled: true },
];

const meta = {
  title: "Forms/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "参与团队",
    options,
    placeholder: "选择团队",
    onValueChange: fn(),
  },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: ["design"] },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /参与团队/ }));
    const page = within(canvasElement.ownerDocument.body);
    const engineering = await page.findByRole("option", { name: /工程/ });
    await userEvent.click(engineering);
    await expect(args.onValueChange).toHaveBeenCalledWith([
      "design",
      "engineering",
    ]);
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 360 }}>
      <MultiSelect aria-label="未选择" options={options} />
      <MultiSelect
        aria-label="已选择"
        options={options}
        defaultValue={["design", "engineering"]}
      />
      <MultiSelect aria-label="无数据" options={[]} />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required style={{ maxWidth: 360 }}>
      <Field.Label>参与团队</Field.Label>
      <MultiSelect options={options} />
      <Field.Error>请至少选择一个团队。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { defaultValue: ["design"], disabled: true },
};

export const LongContent: Story = {
  args: {
    defaultValue: ["platform"],
    options: [
      {
        value: "platform",
        label: "企业协作平台与设计系统基础设施团队",
        description: "维护跨业务线组件、无障碍标准和持续交付工具。",
      },
      ...options,
    ],
  },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
