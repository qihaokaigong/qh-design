import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import { AlertDialog } from "./AlertDialog";

const meta = {
  title: "Overlays/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs", "ai-generated"],
  args: { onOpenChange: fn() },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = (props: Story["args"]) => (
  <AlertDialog {...props}>
    <AlertDialog.Trigger asChild>
      <Button variant="danger">删除项目</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Title>确定删除项目？</AlertDialog.Title>
      <AlertDialog.Description>
        项目、文件和操作记录将被永久删除，此操作无法撤销。
      </AlertDialog.Description>
      <AlertDialog.Footer>
        <AlertDialog.Cancel asChild>
          <Button variant="secondary">取消</Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action asChild>
          <Button variant="danger">确认删除</Button>
        </AlertDialog.Action>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog>
);

export const Default: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "删除项目" }),
    );
    const body = within(document.body);
    await waitFor(() => expect(body.getByRole("alertdialog")).toBeVisible());
    await expect(body.getByRole("button", { name: "取消" })).toHaveFocus();
    await userEvent.keyboard("{Escape}");
  },
};
export const Playground: Story = Default;
export const Open: Story = {
  render: () => (
    <AlertDialog defaultOpen>
      <AlertDialog.Content>
        <AlertDialog.Title>离开当前页面？</AlertDialog.Title>
        <AlertDialog.Description>
          尚未保存的内容会丢失。
        </AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="secondary">继续编辑</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button variant="danger">放弃更改</Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};
export const LongContent: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger asChild>
        <Button variant="danger">撤销所有成员权限</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>撤销所有成员权限？</AlertDialog.Title>
        <AlertDialog.Description>
          除项目所有者外，当前工作区内的全部成员将立即失去访问权限；正在编辑的内容可能无法保存。
        </AlertDialog.Description>
        <AlertDialog.Footer>
          <AlertDialog.Cancel asChild>
            <Button variant="secondary">取消</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <Button variant="danger">确认撤销</Button>
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
