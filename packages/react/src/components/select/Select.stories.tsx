import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { Select } from "./Select";

const meta = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs", "ai-generated"],
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="">请选择</option>
    <option value="product">产品</option>
    <option value="design">设计</option>
    <option value="engineering">工程</option>
  </>
);

export const Default: Story = {
  render: (args) => (
    <Field style={{ maxWidth: 360 }}>
      <Field.Label>团队</Field.Label>
      <Select {...args}>{options}</Select>
    </Field>
  ),
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByRole("combobox", {
      name: "团队",
    });
    await userEvent.selectOptions(select, "design");
    await expect(select).toHaveValue("design");
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <Select aria-label="已选择团队" defaultValue="product">
      {options}
    </Select>
  ),
};
export const Invalid: Story = {
  render: () => (
    <Field invalid>
      <Field.Label>团队</Field.Label>
      <Select>{options}</Select>
      <Field.Error>请选择一个团队。</Field.Error>
    </Field>
  ),
};
export const Disabled: Story = {
  render: () => (
    <Select aria-label="团队" disabled defaultValue="design">
      {options}
    </Select>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Select aria-label="项目" style={{ maxWidth: 280 }}>
      <option>这是一个名称很长、用于测试窄屏显示效果的跨部门协作项目</option>
    </Select>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)", maxWidth: 360 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Field key={size}>
          <Field.Label>团队（{size}）</Field.Label>
          <Select size={size} defaultValue="design">
            {options}
          </Select>
        </Field>
      ))}
    </div>
  ),
};
export const RightToLeft: Story = {
  render: () => (
    <Select aria-label="الفريق" dir="rtl" style={{ maxWidth: 280 }}>
      <option value="design">فريق التصميم</option>
      <option value="engineering">فريق الهندسة</option>
    </Select>
  ),
};
export const Multiple: Story = {
  render: () => (
    <Select aria-label="团队多选" multiple defaultValue={["design"]}>
      {options}
    </Select>
  ),
};

export const InteractionStates: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)", maxWidth: 360 }}>
      <Select aria-label="正常选择">{options}</Select>
      <Select aria-label="无效选择" invalid>
        {options}
      </Select>
      <Select aria-label="禁用选择" disabled>
        {options}
      </Select>
    </div>
  ),
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
