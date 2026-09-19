import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Dialog } from "./Dialog";

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
});
