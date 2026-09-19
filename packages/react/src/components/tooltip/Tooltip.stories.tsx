import { CircleHelp } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { IconButton } from "../icon-button";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = () => (
  <Tooltip delayDuration={0}>
    <Tooltip.Trigger asChild>
      <IconButton aria-label="帮助">
        <CircleHelp aria-hidden="true" />
      </IconButton>
    </Tooltip.Trigger>
    <Tooltip.Content>打开帮助中心</Tooltip.Content>
  </Tooltip>
);

export const Default: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "帮助" });
    trigger.focus();
    await waitFor(() =>
      expect(within(document.body).getByRole("tooltip")).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
  },
};
export const Playground: Story = Default;
export const KeyboardFocus: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(
      within(canvasElement).getByRole("button", { name: "帮助" }),
    ).toHaveFocus();
    await waitFor(() =>
      expect(within(document.body).getByRole("tooltip")).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
  },
};
export const LongContent: Story = {
  render: () => (
    <Tooltip delayDuration={0}>
      <Tooltip.Trigger asChild>
        <IconButton aria-label="同步说明">
          <CircleHelp aria-hidden="true" />
        </IconButton>
      </Tooltip.Trigger>
      <Tooltip.Content>同步仅在设备连接到可信网络时自动开始</Tooltip.Content>
    </Tooltip>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
