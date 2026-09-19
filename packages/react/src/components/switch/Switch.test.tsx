import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Switch } from "./Switch";

describe("Switch", () => {
  it("toggles and exposes switch semantics", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch onCheckedChange={onCheckedChange}>自动保存</Switch>);

    const control = screen.getByRole("switch", { name: "自动保存" });
    await user.click(control);
    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });
});
