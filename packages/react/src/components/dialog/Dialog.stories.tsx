import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import { Field } from "../field";
import { Input } from "../input";
import { Dialog } from "./Dialog";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs", "ai-generated"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const Example = () => (
  <Dialog>
    <Dialog.Trigger asChild>
      <Button>编辑项目</Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Title>编辑项目</Dialog.Title>
      <Dialog.Description>更新项目名称，保存后立即生效。</Dialog.Description>
      <Field>
        <Field.Label>项目名称</Field.Label>
        <Input defaultValue="移动端应用" />
      </Field>
      <Dialog.Footer>
        <Dialog.Close asChild>
          <Button variant="secondary">取消</Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button>保存</Button>
        </Dialog.Close>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog>
);

export const Default: Story = {
  render: Example,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "编辑项目",
    });
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(
        within(document.body).getByRole("dialog", { name: "编辑项目" }),
      ).toBeVisible(),
    );
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveFocus();
  },
};
export const Playground: Story = Default;
export const Open: Story = {
  render: () => (
    <Dialog defaultOpen>
      <Dialog.Content>
        <Dialog.Title>通知设置</Dialog.Title>
        <Dialog.Description>选择希望接收的项目通知。</Dialog.Description>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button>完成</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
export const LongContent: Story = {
  render: () => (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button variant="secondary">查看条款</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>服务条款摘要</Dialog.Title>
        <Dialog.Description>
          以下内容用于验证较长文本在弹窗内的滚动表现。
        </Dialog.Description>
        {Array.from({ length: 8 }, (_, index) => (
          <p key={index}>
            第 {index + 1}{" "}
            条：项目成员需要遵守团队协作规范，并妥善管理共享内容和访问权限。
          </p>
        ))}
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button>知道了</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  ),
};
export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
