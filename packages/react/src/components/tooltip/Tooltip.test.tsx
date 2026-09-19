import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("describes its trigger on keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delayDuration={0}>
        <Tooltip.Trigger>帮助</Tooltip.Trigger>
        <Tooltip.Content>打开帮助中心</Tooltip.Content>
      </Tooltip>,
    );

    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "打开帮助中心",
    );
  });
});
