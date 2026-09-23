import type { Meta, StoryObj } from "@storybook/react-vite";

import { Text } from "./Text";

const meta = {
  title: "Foundation/Text",
  component: Text,
  tags: ["autodocs", "ai-generated"],
  args: { children: "清晰、一致的正文内容。" },
  argTypes: {
    as: { control: "select", options: ["span", "p", "div"] },
    size: { control: "select", options: ["xs", "sm", "md", "lg"] },
    tone: {
      control: "select",
      options: ["default", "muted", "danger", "success", "warning"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-2)" }}>
      <Text as="p">默认正文</Text>
      <Text as="p" tone="muted">
        次要说明
      </Text>
      <Text as="p" tone="success" weight="medium">
        保存成功
      </Text>
      <Text as="p" tone="warning" weight="medium">
        需要注意
      </Text>
      <Text as="p" tone="danger" weight="semibold">
        操作失败
      </Text>
    </div>
  ),
};
export const LongContent: Story = {
  args: {
    as: "p",
    children:
      "正文会自然换行，并继承 QH 的字体、字号、行高和语义颜色；页面布局仍由外层容器负责。",
  },
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
