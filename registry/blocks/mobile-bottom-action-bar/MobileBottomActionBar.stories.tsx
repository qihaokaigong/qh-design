import { Button } from "@qhkg/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { useState } from "react";

import { MobileBottomActionBar } from "./mobile-bottom-action-bar";

const meta = {
  title: "Patterns/MobileBottomActionBar",
  component: MobileBottomActionBar,
  tags: ["autodocs", "ai-generated"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MobileBottomActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const onContinue = fn();

export const Default: Story = {
  args: {
    summary: "还有 2 项设置未完成",
    secondaryAction: <Button variant="secondary">稍后处理</Button>,
    primaryAction: <Button onClick={onContinue}>继续</Button>,
  },
  render: (args) => (
    <div className="min-h-screen bg-canvas p-4 md:p-8">
      <h2 className="text-xl font-semibold text-foreground">项目设置</h2>
      <p className="mt-2 text-muted-foreground">
        操作栏自动为页面内容保留空间。
      </p>
      <MobileBottomActionBar {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "继续" }));
    await expect(onContinue).toHaveBeenCalledOnce();
  },
};
export const Mobile: Story = {
  ...Default,
  parameters: {
    ...Default.parameters,
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile320" },
  },
};
export const LongContent: Story = {
  ...Default,
  args: {
    ...Default.args,
    summary:
      "仍有 2 项团队权限和自动通知设置尚未完成，继续后可以稍后返回处理。",
  },
};

export const SingleAction: Story = {
  args: { primaryAction: <Button onClick={onContinue}>继续</Button> },
  render: Default.render,
  play: Default.play,
};

const GrowingSummaryExample = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="min-h-screen p-4">
      <h2>移动端任务</h2>
      <div className="min-h-screen">滚动查看页尾内容。</div>
      <Button variant="secondary" onClick={() => setExpanded(!expanded)}>
        切换摘要
      </Button>
      <p data-testid="last-content">
        最后一项设置和错误说明应始终可以完整查看。
      </p>
      <MobileBottomActionBar
        primaryAction={<Button onClick={onContinue}>继续</Button>}
        summary={
          expanded
            ? "请检查成员权限、通知偏好和自动化规则。".repeat(6)
            : "还有 2 项设置未完成"
        }
      />
    </div>
  );
};

export const GrowingSummary: Story = {
  args: Default.args,
  render: GrowingSummaryExample,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
