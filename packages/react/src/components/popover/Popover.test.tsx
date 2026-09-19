import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Popover } from "./Popover";

describe("Popover", () => {
  it("closes on Escape and restores focus", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <Popover.Trigger>查看详情</Popover.Trigger>
        <Popover.Content>项目的补充信息</Popover.Content>
      </Popover>,
    );

    const trigger = screen.getByRole("button", { name: "查看详情" });
    await user.click(trigger);
    expect(screen.getByText("项目的补充信息")).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByText("项目的补充信息")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
