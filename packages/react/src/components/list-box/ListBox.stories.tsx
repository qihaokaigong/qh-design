import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { ListBox } from "./ListBox";

const options = [
  { value: "design", label: "设计", description: "界面、品牌与体验设计" },
  { value: "engineering", label: "工程", description: "前端、后端与平台研发" },
  { value: "operations", label: "运营", description: "内容、活动与用户运营" },
  { value: "finance", label: "财务", disabled: true },
];

const meta = {
  title: "Forms/ListBox",
  component: ListBox,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "团队",
    options,
    defaultValue: "design",
    onValueChange: fn(),
  },
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const engineering = canvas.getByRole("option", { name: /工程/ });
    await userEvent.click(engineering);
    await expect(engineering).toHaveAttribute("aria-selected", "true");
    await expect(args.onValueChange).toHaveBeenCalledWith("engineering");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)" }}>
      <ListBox
        aria-label="单选团队"
        options={options}
        defaultValue="engineering"
      />
      <ListBox
        aria-label="多选团队"
        options={options}
        selectionMode="multiple"
        defaultValue={["design", "operations"]}
      />
      <ListBox aria-label="空列表" options={[]} />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required>
      <Field.Label>负责团队</Field.Label>
      <ListBox options={options} />
      <Field.Error>请选择一个负责团队。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LongContent: Story = {
  args: {
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
