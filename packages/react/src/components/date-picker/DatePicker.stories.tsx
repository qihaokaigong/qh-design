import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { DatePicker } from "./DatePicker";

const meta = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "交付日期",
    defaultValue: "2026-09-15",
    onValueChange: fn(),
    onOpenChange: fn(),
  },
  argTypes: { size: { control: "select", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /打开日历/ }));
    const page = within(canvasElement.ownerDocument.body);
    await expect(await page.findByRole("grid")).toBeVisible();
    const nextDay = page
      .getAllByRole("gridcell")
      .find((cell) => cell.textContent === "16");
    await userEvent.click(nextDay!.firstElementChild as HTMLElement);
    await expect(args.onValueChange).toHaveBeenCalledWith("2026-09-16");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 360 }}>
      <DatePicker aria-label="空日期" />
      <DatePicker aria-label="已选日期" defaultValue="2026-09-15" />
      <DatePicker
        aria-label="受限日期"
        defaultValue="2026-09-15"
        minValue="2026-09-10"
        maxValue="2026-09-25"
      />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required style={{ maxWidth: 360 }}>
      <Field.Label>交付日期</Field.Label>
      <DatePicker />
      <Field.Description>请选择已确认的工作日。</Field.Description>
      <Field.Error>请选择有效的交付日期。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const LongContent: Story = {
  args: {
    "aria-label": "企业协作平台年度发布与合规复核的最终交付日期",
    openLabel: "打开企业协作平台最终交付日期日历",
  },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
