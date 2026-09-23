import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Calendar } from "./Calendar";

const meta = {
  title: "Forms/Calendar",
  component: Calendar,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "交付日期",
    defaultValue: "2026-09-15",
    onValueChange: fn(),
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "下个月" }));
    await expect(canvas.getByRole("heading")).toHaveTextContent("October 2026");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)" }}>
      <Calendar aria-label="可选日期" defaultValue="2026-09-15" />
      <Calendar
        aria-label="限制日期"
        defaultValue="2026-09-15"
        minValue="2026-09-10"
        maxValue="2026-09-25"
        isDateUnavailable={(date) => date.endsWith("-18")}
      />
    </div>
  ),
};

export const Invalid: Story = { args: { invalid: true } };

export const Disabled: Story = { args: { disabled: true } };

export const LongContent: Story = {
  args: {
    "aria-label": "企业协作平台年度发布窗口日期",
    previousLabel: "查看前一个自然月的发布窗口",
    nextLabel: "查看后一个自然月的发布窗口",
  },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
