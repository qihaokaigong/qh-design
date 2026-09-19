import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Menu } from "./Menu";

describe("Menu", () => {
  it("opens from the keyboard and selects an item", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <Menu>
        <Menu.Trigger>更多操作</Menu.Trigger>
        <Menu.Content>
          <Menu.Item onSelect={onSelect}>重命名</Menu.Item>
          <Menu.Item>复制</Menu.Item>
        </Menu.Content>
      </Menu>,
    );

    const trigger = screen.getByRole("button", { name: "更多操作" });
    trigger.focus();
    await user.keyboard("{Enter}");
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
    expect(trigger).toHaveFocus();
  });
});
