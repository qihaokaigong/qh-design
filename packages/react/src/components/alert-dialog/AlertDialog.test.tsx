import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
  it("focuses the safe action and requires an explicit choice", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <AlertDialog>
        <AlertDialog.Trigger>删除项目</AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>确定删除项目？</AlertDialog.Title>
          <AlertDialog.Description>此操作无法撤销。</AlertDialog.Description>
          <AlertDialog.Cancel>取消</AlertDialog.Cancel>
          <AlertDialog.Action onClick={onDelete}>确认删除</AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog>,
    );

    await user.click(screen.getByRole("button", { name: "删除项目" }));
    expect(screen.getByRole("button", { name: "取消" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(onDelete).not.toHaveBeenCalled();
  });
});
