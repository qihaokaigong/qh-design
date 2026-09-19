import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import { Stack } from "../stack";
import { Popover } from "./Popover";

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = () => (
  <Popover>
    <Popover.Trigger asChild>
      <Button variant="secondary">查看成员</Button>
    </Popover.Trigger>
    <Popover.Content aria-label="成员摘要">
      <Stack gap="2">
        <strong>设计团队</strong>
        <span>当前共有 8 位成员，2 位访客。</span>
        <Popover.Close asChild>
          <Button size="sm" variant="ghost">
            关闭
          </Button>
        </Popover.Close>
      </Stack>
    </Popover.Content>
  </Popover>
);

export const Default: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "查看成员",
    });
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(
        within(document.body).getByText("当前共有 8 位成员，2 位访客。"),
      ).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
  },
};
export const Playground: Story = Default;
export const Open: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger asChild>
        <Button variant="secondary">筛选</Button>
      </Popover.Trigger>
      <Popover.Content aria-label="筛选设置">
        这里可以放置少量交互控件。
      </Popover.Content>
    </Popover>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary">查看说明</Button>
      </Popover.Trigger>
      <Popover.Content>
        这个项目将与团队中的所有成员共享。具有编辑权限的成员可以修改设置、邀请其他成员并查看完整的操作记录。
      </Popover.Content>
    </Popover>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
