import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("opens a calendar and reports an ISO date", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DatePicker
        aria-label="交付日期"
        defaultValue="2026-09-15"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /打开日历/ }));
    const nextDay = (await screen.findAllByRole("gridcell")).find(
      (cell) => cell.textContent === "16",
    );
    await user.click(nextDay!.firstElementChild as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith("2026-09-16");
    await waitFor(() =>
      expect(screen.queryByRole("grid")).not.toBeInTheDocument(),
    );
  });

  it("inherits labeling, description and invalid state from Field", () => {
    render(
      <Field invalid required>
        <Field.Label>交付日期</Field.Label>
        <DatePicker />
        <Field.Description>使用当地日期。</Field.Description>
        <Field.Error>日期无效。</Field.Error>
      </Field>,
    );

    const group = screen.getByRole("group", { name: "交付日期" });
    expect(group).toHaveAccessibleDescription("使用当地日期。 日期无效。");
    expect(group).toHaveAttribute("data-invalid", "true");
  });

  it("submits the selected ISO date", () => {
    const { container } = render(
      <DatePicker
        aria-label="交付日期"
        name="deliveryDate"
        value="2026-09-15"
      />,
    );
    expect(container.querySelector('input[name="deliveryDate"]')).toHaveValue(
      "2026-09-15",
    );
  });

  it("does not mutate a controlled date", async () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <DatePicker
        aria-label="交付日期"
        name="deliveryDate"
        value="2026-09-15"
        onValueChange={onValueChange}
      />,
    );

    const day = screen
      .getAllByRole("spinbutton")
      .find((segment) => segment.getAttribute("aria-valuenow") === "15");
    fireEvent.keyDown(day!, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenCalledWith("2026-09-16");
    expect(container.querySelector('input[name="deliveryDate"]')).toHaveValue(
      "2026-09-15",
    );
  });
});
