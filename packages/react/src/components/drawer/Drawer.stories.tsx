import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Stack } from "../stack";
import { Drawer } from "./Drawer";

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = () => (
  <Drawer>
    <Drawer.Trigger asChild>
      <Button variant="secondary">筛选项目</Button>
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Title>筛选项目</Drawer.Title>
      <Drawer.Description>选择要显示的项目状态。</Drawer.Description>
      <Stack gap="3">
        <Checkbox defaultChecked>进行中</Checkbox>
        <Checkbox>已完成</Checkbox>
        <Checkbox>已归档</Checkbox>
      </Stack>
      <Drawer.Footer>
        <Drawer.Close asChild>
          <Button variant="secondary">取消</Button>
        </Drawer.Close>
        <Drawer.Close asChild>
          <Button>应用筛选</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer>
);

export const Default: Story = {
  render: Example,
  parameters: { viewport: { defaultViewport: "mobile375" } },
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "筛选项目" }),
    );
    await expect(
      within(document.body).getByRole("dialog", { name: "筛选项目" }),
    ).toBeVisible();
  },
};
export const Playground: Story = Default;
export const Open: Story = {
  render: () => (
    <Drawer defaultOpen>
      <Drawer.Content>
        <Drawer.Title>分享项目</Drawer.Title>
        <Drawer.Description>邀请团队成员参与这个项目。</Drawer.Description>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button>完成</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
export const LongContent: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger asChild>
        <Button variant="secondary">查看活动</Button>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Title>项目活动</Drawer.Title>
        <Drawer.Description>最近 30 天内的成员操作。</Drawer.Description>
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index}>成员 {index + 1} 更新了一个任务的状态。</p>
        ))}
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button>关闭</Button>
          </Drawer.Close>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
