import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Calendar } from "./Calendar";

describe("Calendar", () => {
  it("serializes selected dates as ISO strings", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Calendar
        aria-label="交付日期"
        defaultValue="2026-09-15"
        onValueChange={onValueChange}
      />,
    );

    const nextDay = screen
      .getAllByRole("gridcell")
      .find(
        (cell) =>
          cell.textContent === "16" && !cell.hasAttribute("data-disabled"),
      );
    expect(nextDay).toBeDefined();
    await user.click(nextDay!.firstElementChild as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith("2026-09-16");
  });

  it("marks unavailable dates and prevents selection", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Calendar
        aria-label="交付日期"
        defaultValue="2026-09-15"
        isDateUnavailable={(date) => date === "2026-09-16"}
        onValueChange={onValueChange}
      />,
    );

    const unavailable = screen
      .getAllByRole("gridcell")
      .find((cell) => cell.textContent === "16");
    expect(unavailable!.firstElementChild).toHaveAttribute(
      "data-unavailable",
      "true",
    );
    await user.click(unavailable!.firstElementChild as HTMLElement);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("does not mutate a controlled date", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Calendar
        aria-label="交付日期"
        value="2026-09-15"
        onValueChange={onValueChange}
      />,
    );

    const nextDay = screen
      .getAllByRole("gridcell")
      .find((cell) => cell.textContent === "16");
    await user.click(nextDay!.firstElementChild as HTMLElement);
    expect(onValueChange).toHaveBeenCalledWith("2026-09-16");
    expect(
      screen.getAllByRole("gridcell").find((cell) => cell.textContent === "15")
        ?.firstElementChild,
    ).toHaveAttribute("data-selected", "true");
  });

  it("disables navigation and date selection", () => {
    render(<Calendar aria-label="交付日期" disabled />);
    expect(screen.getByRole("button", { name: "上个月" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "下个月" })).toBeDisabled();
  });
});
