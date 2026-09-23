import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { DateRangePicker } from "./DateRangePicker";

const meta = {
  title: "Forms/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "项目周期",
    defaultValue: { start: "2026-09-15", end: "2026-09-18" },
    onValueChange: fn(),
    onOpenChange: fn(),
  },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /打开日历/ }));
    const page = within(canvasElement.ownerDocument.body);
    await expect(await page.findByRole("grid")).toBeVisible();
    await expect(page.getAllByRole("gridcell")).not.toHaveLength(0);
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 560 }}>
      <DateRangePicker aria-label="空周期" />
      <DateRangePicker
        aria-label="已选周期"
        defaultValue={{ start: "2026-09-15", end: "2026-09-18" }}
      />
      <DateRangePicker
        aria-label="受限周期"
        minValue="2026-09-10"
        maxValue="2026-09-25"
        isDateUnavailable={(date) => date.endsWith("-20")}
      />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required style={{ maxWidth: 560 }}>
      <Field.Label>项目周期</Field.Label>
      <DateRangePicker />
      <Field.Error>结束日期不能早于开始日期。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const LongContent: Story = {
  args: {
    "aria-label": "跨地区企业协作平台迁移项目的完整实施与验收周期",
  },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
