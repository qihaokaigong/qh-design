import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import { Toast } from "./Toast";
import type { ToastTone } from "./Toast.types";

const meta = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({ tone = "success" }: { tone?: ToastTone }) {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider duration={10000}>
      <Button onClick={() => setOpen(true)}>保存设置</Button>
      <Toast open={open} onOpenChange={setOpen} tone={tone}>
        <Toast.Title>设置已保存</Toast.Title>
        <Toast.Description>新的通知设置已经生效。</Toast.Description>
        <Toast.Action altText="撤销刚才的设置更改">撤销</Toast.Action>
        <Toast.Close />
      </Toast>
    </Toast.Provider>
  );
}

function StatesExample() {
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<ToastTone>("neutral");
  return (
    <Toast.Provider duration={10000}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--qh-space-2)",
        }}
      >
        {(["neutral", "success", "warning", "danger"] as const).map((item) => (
          <Button
            key={item}
            variant="secondary"
            onClick={() => {
              setTone(item);
              setOpen(true);
            }}
          >
            {item}
          </Button>
        ))}
      </div>
      <Toast open={open} onOpenChange={setOpen} tone={tone}>
        <Toast.Title>{tone} 通知</Toast.Title>
        <Toast.Description>状态不能只通过颜色表达。</Toast.Description>
        <Toast.Close />
      </Toast>
    </Toast.Provider>
  );
}

function LongContentExample() {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider duration={10000}>
      <Button onClick={() => setOpen(true)}>开始同步</Button>
      <Toast open={open} onOpenChange={setOpen} tone="warning">
        <Toast.Title>部分文件暂未同步</Toast.Title>
        <Toast.Description>
          由于网络连接不稳定，3 个较大的项目文件将在连接恢复后自动继续同步。
        </Toast.Description>
        <Toast.Close />
      </Toast>
    </Toast.Provider>
  );
}

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "保存设置" }),
    );
    await waitFor(() =>
      expect(within(document.body).getByText("设置已保存")).toBeVisible(),
    );
    await userEvent.click(
      within(document.body).getByRole("button", { name: "关闭通知" }),
    );
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => <StatesExample />,
};
export const LongContent: Story = {
  render: () => <LongContentExample />,
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
