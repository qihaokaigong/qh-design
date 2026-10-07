import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Drawer } from "../drawer";
import drawerStyles from "../drawer/Drawer.module.css";
import { Dialog } from "./Dialog";
import dialogStyles from "./Dialog.module.css";

describe("Dialog", () => {
  it("traps interaction, closes on Escape, and restores focus", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <Dialog.Trigger>编辑项目</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>编辑项目</Dialog.Title>
          <Dialog.Description>更改项目名称。</Dialog.Description>
          <input aria-label="项目名称" />
        </Dialog.Content>
      </Dialog>,
    );

    const trigger = screen.getByRole("button", { name: "编辑项目" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "编辑项目" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "项目名称" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps its slots independent when Drawer is loaded from the same entry", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Dialog>
          <Dialog.Trigger>打开对话框</Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title>对话框内容</Dialog.Title>
            <Dialog.Description>保持居中的对话框。</Dialog.Description>
          </Dialog.Content>
        </Dialog>
        <Drawer>
          <Drawer.Trigger>打开抽屉</Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Title>抽屉内容</Drawer.Title>
            <Drawer.Description>从底部打开的抽屉。</Drawer.Description>
          </Drawer.Content>
        </Drawer>
      </>,
    );

    await user.click(screen.getByRole("button", { name: "打开对话框" }));
    expect(screen.getByRole("dialog", { name: "对话框内容" })).toHaveClass(
      dialogStyles.content,
    );
    await user.keyboard("{Escape}");

    await user.click(screen.getByRole("button", { name: "打开抽屉" }));
    expect(screen.getByRole("dialog", { name: "抽屉内容" })).toHaveClass(
      drawerStyles.content,
    );
  });
});
