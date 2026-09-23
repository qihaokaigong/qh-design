import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NumberInput } from "./NumberInput";

describe("NumberInput", () => {
  it("increments and decrements an uncontrolled value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <NumberInput
        aria-label="数量"
        defaultValue={2}
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("spinbutton", { name: "数量" });
    await user.click(screen.getByRole("button", { name: "增加" }));
    expect(input).toHaveValue(3);
    expect(input).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith(3);

    await user.click(screen.getByRole("button", { name: "减少" }));
    expect(input).toHaveValue(2);
  });

  it("reports native keyboard changes", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<NumberInput aria-label="数量" onValueChange={onValueChange} />);

    const input = screen.getByRole("spinbutton", { name: "数量" });
    await user.type(input, "12");
    expect(onValueChange).toHaveBeenLastCalledWith(12);
  });

  it("disables actions at configured bounds", () => {
    render(<NumberInput aria-label="数量" value={1} min={1} max={5} />);
    expect(screen.getByRole("button", { name: "减少" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "增加" })).toBeEnabled();
  });

  it("does not mutate a controlled value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <NumberInput aria-label="数量" value={2} onValueChange={onValueChange} />,
    );
    await user.click(screen.getByRole("button", { name: "增加" }));
    expect(onValueChange).toHaveBeenCalledWith(3);
    expect(screen.getByRole("spinbutton", { name: "数量" })).toHaveValue(2);
  });

  it("keeps a controlled null value empty and disables actions when read-only", () => {
    render(
      <NumberInput aria-label="数量" defaultValue={5} value={null} readOnly />,
    );
    expect(screen.getByRole("spinbutton", { name: "数量" })).toHaveValue(null);
    expect(screen.getByRole("button", { name: "减少" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "增加" })).toBeDisabled();
  });
});
