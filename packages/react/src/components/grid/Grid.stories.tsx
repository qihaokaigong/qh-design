import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "../card";
import { Grid } from "./Grid";

const meta = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs", "ai-generated"],
  args: { columns: { base: 1, md: 2, lg: 3 }, gap: "4" },
  argTypes: {
    columns: {
      control: "object",
      description:
        '1–6, { base, md, lg }, or "auto". Only auto mode accepts minItemWidth; fixed columns retain viewport breakpoints.',
      table: {
        type: { summary: 'GridColumnCount | ResponsiveGridColumns | "auto"' },
      },
    },
    minItemWidth: {
      control: "select",
      options: ["sm", "md", "lg"],
      if: { arg: "columns", eq: "auto" },
      description:
        'Only for columns="auto": sm = 12rem, md = 16rem (default), lg = 20rem. Smaller containers fall back to one column.',
      table: { type: { summary: '"sm" | "md" | "lg" (auto mode only)' } },
    },
    gap: { control: "select", options: ["1", "2", "3", "4", "6", "8"] },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = ["项目一", "项目二", "项目三"];
export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      {items.map((item) => (
        <Card key={item}>
          <Card.Title>{item}</Card.Title>
          <Card.Content>项目摘要内容</Card.Content>
        </Card>
      ))}
    </Grid>
  ),
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <Grid columns={2}>
      {items.slice(0, 2).map((item) => (
        <Card key={item}>
          <Card.Title>{item}</Card.Title>
        </Card>
      ))}
    </Grid>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Grid columns={{ base: 1, md: 2 }}>
      {items.map((item) => (
        <Card key={item}>
          <Card.Title>{item}：具有较长名称的跨团队协作计划</Card.Title>
          <Card.Content>内容会在各自网格单元中自然换行。</Card.Content>
        </Card>
      ))}
    </Grid>
  ),
};
export const Mobile: Story = {
  ...Default,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};

const AutoFitExample = () => (
  <Grid columns="auto" minItemWidth="md">
    {items.map((item) => (
      <Card key={item}>
        <Card.Title>{item}：跨团队协作计划</Card.Title>
        <Card.Content>
          卡片按容器可用空间排列，最小宽度为 16rem，小于此宽度时退回单列。
        </Card.Content>
      </Card>
    ))}
  </Grid>
);

export const AutoFit: Story = { render: AutoFitExample };
export const NarrowContainer: Story = {
  render: () => (
    <div style={{ maxWidth: "22.5rem" }}>
      <AutoFitExample />
    </div>
  ),
};
