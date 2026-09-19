import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("uses dialog semantics and restores focus after closing", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <Drawer.Trigger>打开筛选</Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Title>筛选项目</Drawer.Title>
          <Drawer.Description>选择需要显示的项目。</Drawer.Description>
          <button>应用筛选</button>
        </Drawer.Content>
      </Drawer>,
    );

    const trigger = screen.getByRole("button", { name: "打开筛选" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "筛选项目" })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
