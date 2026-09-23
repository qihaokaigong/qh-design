import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { TimeField } from "./TimeField";

const meta = {
  title: "Forms/TimeField",
  component: TimeField,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "开始时间",
    defaultValue: "09:30",
    hourCycle: 24,
    onValueChange: fn(),
  },
  argTypes: {
    granularity: { control: "select", options: ["hour", "minute", "second"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const segments = canvas.getAllByRole("spinbutton");
    await userEvent.click(segments[0]!);
    await userEvent.keyboard("{ArrowUp}");
    await expect(args.onValueChange).toHaveBeenCalled();
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)", maxWidth: 360 }}>
      <TimeField aria-label="空时间" hourCycle={24} />
      <TimeField aria-label="分钟时间" defaultValue="09:30" hourCycle={24} />
      <TimeField
        aria-label="秒级时间"
        defaultValue="09:30:45"
        granularity="second"
        hourCycle={24}
      />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required style={{ maxWidth: 360 }}>
      <Field.Label>开始时间</Field.Label>
      <TimeField hourCycle={24} />
      <Field.Error>请选择服务时间内的开始时间。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const LongContent: Story = {
  args: { "aria-label": "跨地区企业协作平台最终发布窗口的开始时间" },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
