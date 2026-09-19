import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../button";
import { Card } from "./Card";

const meta = {
  title: "Surfaces/Card",
  component: Card,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    variant: {
      control: "select",
      options: ["outlined", "filled", "elevated"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = ({
  variant = "outlined",
}: {
  variant?: "outlined" | "filled" | "elevated";
}) => (
  <Card variant={variant} style={{ maxWidth: 420 }}>
    <Card.Header>
      <Card.Title>项目概览</Card.Title>
      <Card.Description>最近一次更新于今天 10:30</Card.Description>
    </Card.Header>
    <Card.Content>共有 8 位成员和 24 个进行中的任务。</Card.Content>
    <Card.Footer>
      <Button size="sm">查看项目</Button>
    </Card.Footer>
  </Card>
);

export const Default: Story = { render: () => <Example /> };
export const Playground: Story = {
  render: (args) => <Example variant={args.variant} />,
};
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)" }}>
      <Example variant="outlined" />
      <Example variant="filled" />
      <Example variant="elevated" />
    </div>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <Card.Header>
        <Card.Title>跨团队项目的阶段性进展与下一步协作安排</Card.Title>
      </Card.Header>
      <Card.Content>
        这段较长内容用于确认卡片在窄屏下能够自然换行，并保持标题、正文和操作之间稳定的信息层级。
      </Card.Content>
    </Card>
  ),
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
