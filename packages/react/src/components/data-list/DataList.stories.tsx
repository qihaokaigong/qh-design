import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Badge } from "../badge";
import { DataList } from "./DataList";

const Example = ({
  layout = "responsive",
}: {
  layout?: "responsive" | "stacked";
}) => (
  <DataList layout={layout}>
    <DataList.Item>
      <DataList.Label>项目状态</DataList.Label>
      <DataList.Value>
        <Badge tone="success">进行中</Badge>
      </DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>负责人</DataList.Label>
      <DataList.Value>Qi Hao</DataList.Value>
    </DataList.Item>
    <DataList.Item>
      <DataList.Label>更新时间</DataList.Label>
      <DataList.Value>2026 年 9 月 22 日</DataList.Value>
    </DataList.Item>
  </DataList>
);

const meta = {
  title: "Data/DataList",
  component: DataList,
  tags: ["autodocs", "ai-generated"],
  args: { children: <Example /> },
  argTypes: {
    layout: { control: "select", options: ["responsive", "stacked"] },
  },
} satisfies Meta<typeof DataList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("项目状态").tagName).toBe("DT");
    await expect(canvas.getByText("进行中").closest("dd")).not.toBeNull();
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-6)" }}>
      <Example />
      <Example layout="stacked" />
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <DataList>
      <DataList.Item>
        <DataList.Label>项目名称</DataList.Label>
        <DataList.Value>
          企业协作平台年度发布、合规复核与长期归档能力建设项目
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>说明</DataList.Label>
        <DataList.Value>
          该项目覆盖多个团队和长期交付阶段，内容会在窄屏内自然换行。
        </DataList.Value>
      </DataList.Item>
    </DataList>
  ),
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
