import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Accordion } from "./Accordion";

const Example = () => (
  <Accordion collapsible defaultValue="installation" type="single">
    <Accordion.Item value="installation">
      <Accordion.Header headingLevel={3}>
        <Accordion.Trigger>如何安装组件库？</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        运行统一接入命令，然后在应用入口导入 QH 样式文件。
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="accessibility">
      <Accordion.Header headingLevel={3}>
        <Accordion.Trigger>组件是否支持键盘操作？</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        支持。使用方向键切换标题，使用 Enter 或空格展开和收起内容。
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="updates">
      <Accordion.Header headingLevel={3}>
        <Accordion.Trigger>如何获取更新？</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        按照 Changelog 和迁移说明升级 npm 包，并重新运行相关测试。
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);

const meta = {
  title: "Data Display/Accordion",
  component: Accordion,
  tags: ["autodocs", "ai-generated"],
  args: { type: "single" },
  argTypes: {
    type: { control: "select", options: ["single", "multiple"] },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "组件是否支持键盘操作？" }),
    );
    await expect(canvas.getByText(/使用方向键切换标题/)).toBeVisible();
  },
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <Accordion defaultValue={["one", "two"]} type="multiple">
      <Accordion.Item value="one">
        <Accordion.Header>
          <Accordion.Trigger>已展开的第一项</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>第一项内容。</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="two">
        <Accordion.Header>
          <Accordion.Trigger>已展开的第二项</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>第二项内容。</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item disabled value="disabled">
        <Accordion.Header>
          <Accordion.Trigger>不可用项目</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>该内容不可展开。</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
export const KeyboardNavigation: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole("button", { name: "如何安装组件库？" });
    first.focus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(
      canvas.getByRole("button", { name: "组件是否支持键盘操作？" }),
    ).toHaveFocus();
  },
};
export const LongContent: Story = {
  render: () => (
    <Accordion collapsible defaultValue="long" type="single">
      <Accordion.Item value="long">
        <Accordion.Header>
          <Accordion.Trigger>
            一个会在较窄空间内自然换行、同时保留展开图标和触控区域的较长问题
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          长内容会自然换行。展开区域不会依赖固定高度，动画会读取内容的实际尺寸，并尊重系统的减少动态效果设置。
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
