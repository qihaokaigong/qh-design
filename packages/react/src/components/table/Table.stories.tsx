import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Badge } from "../badge";
import { Table } from "./Table";

const meta = {
  title: "Data/Table",
  component: Table,
  tags: ["autodocs", "ai-generated"],
  argTypes: {
    minWidth: {
      control: "select",
      options: ["auto", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const projects = [
  { name: "移动端应用", owner: "陈晨", status: "进行中", tasks: 24 },
  { name: "品牌官网", owner: "林晓", status: "已完成", tasks: 18 },
  { name: "运营工具", owner: "周然", status: "待开始", tasks: 9 },
];

const Example = (props: React.ComponentProps<typeof Table>) => (
  <Table {...props}>
    <Table.Caption>项目任务概览</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head>项目</Table.Head>
        <Table.Head>负责人</Table.Head>
        <Table.Head>状态</Table.Head>
        <Table.Head numeric>任务数</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {projects.map((project) => (
        <Table.Row key={project.name}>
          <Table.Head scope="row">{project.name}</Table.Head>
          <Table.Cell>{project.owner}</Table.Cell>
          <Table.Cell>
            <Badge tone={project.status === "已完成" ? "success" : "neutral"}>
              {project.status}
            </Badge>
          </Table.Cell>
          <Table.Cell numeric>{project.tasks}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
);

export const Default: Story = {
  render: (args) => <Example {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table", { name: "项目任务概览" });
    await expect(within(table).getAllByRole("row")).toHaveLength(4);
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <Table>
      <Table.Caption>带选择状态的项目</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>项目</Table.Head>
          <Table.Head>状态</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row aria-selected="true">
          <Table.Head scope="row">移动端应用</Table.Head>
          <Table.Cell>已选择</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Head scope="row">品牌官网</Table.Head>
          <Table.Cell>未选择</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2}>共 2 个项目</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
};
export const Empty: Story = {
  render: () => (
    <Table>
      <Table.Caption>项目列表</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>项目</Table.Head>
          <Table.Head>负责人</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={2}>当前没有项目。</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Table minWidth="md">
      <Table.Caption>跨团队项目任务概览</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>项目</Table.Head>
          <Table.Head>负责人</Table.Head>
          <Table.Head>说明</Table.Head>
          <Table.Head numeric>任务数</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Head scope="row">面向多个业务团队的统一协作工作台</Table.Head>
          <Table.Cell>产品与设计联合小组</Table.Cell>
          <Table.Cell>统一任务、文件和成员权限管理流程</Table.Cell>
          <Table.Cell numeric>128</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
};
export const Mobile: Story = {
  render: () => <Example minWidth="md" />,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
