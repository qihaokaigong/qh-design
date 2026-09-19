import type { Meta, StoryObj } from "@storybook/react-vite";

import { ButtonLink } from "../button";
import { Alert } from "./Alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs", "ai-generated"],
  args: { title: "设置已更新", children: "新的设置将在下次打开项目时生效。" },
  argTypes: {
    tone: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)" }}>
      <Alert tone="info" title="提示">
        你可以稍后继续完成设置。
      </Alert>
      <Alert tone="success" title="保存成功">
        所有更改均已保存。
      </Alert>
      <Alert tone="warning" title="需要注意">
        部分成员尚未完成验证。
      </Alert>
      <Alert tone="danger" title="保存失败">
        请检查网络后重试。
      </Alert>
    </div>
  ),
};
export const WithAction: Story = {
  args: {
    action: (
      <ButtonLink href="#details" size="sm" variant="secondary">
        查看详情
      </ButtonLink>
    ),
  },
};
export const LongContent: Story = {
  args: {
    title: "此操作需要额外确认",
    children:
      "由于项目中仍有正在进行的任务和未导出的数据，继续操作可能影响其他成员。请先检查项目状态，然后再决定是否继续。",
  },
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
