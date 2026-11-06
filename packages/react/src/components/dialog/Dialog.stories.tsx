import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { useRef, useState } from "react";

import { Button } from "../button";
import { Field } from "../field";
import { Input } from "../input";
import { Drawer } from "../drawer";
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

const LongFormExample = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [invalid, setInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>编辑详细设置</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>详细设置</Dialog.Title>
        <Dialog.Description>
          滚动填写名称，修正错误后保存。关闭窗口会保留草稿。
        </Dialog.Description>
        <form
          noValidate
          style={{ display: "grid", gap: "var(--qh-space-4)" }}
          onSubmit={(event) => {
            event.preventDefault();
            if (!name.trim()) {
              setInvalid(true);
              inputRef.current?.focus();
            } else {
              setInvalid(false);
              setOpen(false);
            }
          }}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <Field key={index}>
              <Field.Label>设置 {index + 1}</Field.Label>
              <Input defaultValue={`设置项 ${index + 1}`} />
            </Field>
          ))}
          <Field invalid={invalid}>
            <Field.Label>最终项目名称</Field.Label>
            <Input
              ref={inputRef}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            {invalid ? <Field.Error>请输入项目名称</Field.Error> : null}
          </Field>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="secondary">取消</Button>
            </Dialog.Close>
            <Button type="submit">保存设置</Button>
          </Dialog.Footer>
        </form>
      </Dialog.Content>
    </Dialog>
  );
};

export const LongForm: Story = {
  render: LongFormExample,
  parameters: { viewport: { defaultViewport: "mobile375" } },
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", {
      name: "编辑详细设置",
    });
    await userEvent.click(trigger);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(page.getByRole("button", { name: "保存设置" }));
    const input = page.getByRole("textbox", { name: "最终项目名称" });
    await expect(input).toHaveFocus();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await userEvent.type(input, "移动端协作项目");
    await userEvent.click(page.getByRole("button", { name: "保存设置" }));
    await expect(trigger).toHaveFocus();
  },
};

export const WithDrawerLoaded: Story = {
  render: () => (
    <>
      <Example />
      <Drawer>
        <Drawer.Trigger asChild>
          <Button variant="secondary">打开抽屉</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Title>抽屉内容</Drawer.Title>
          <Drawer.Description>
            验证抽屉不会覆盖对话框的组合子组件。
          </Drawer.Description>
        </Drawer.Content>
      </Drawer>
    </>
  ),
};
