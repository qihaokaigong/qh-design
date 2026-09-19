import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles through its visible label", async () => {
    const onCheckedChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox onCheckedChange={onCheckedChange}>接收通知</Checkbox>);

    const checkbox = screen.getByRole("checkbox", { name: "接收通知" });
    await user.click(screen.getByText("接收通知"));
    expect(checkbox).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("cannot be toggled while disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox disabled>接收通知</Checkbox>);
    const checkbox = screen.getByRole("checkbox", { name: "接收通知" });
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
