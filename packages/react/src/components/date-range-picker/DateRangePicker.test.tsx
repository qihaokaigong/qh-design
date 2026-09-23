import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { DateRangePicker } from "./DateRangePicker";

describe("DateRangePicker", () => {
  it("opens a range calendar with the current range selected", async () => {
    const user = userEvent.setup();
    render(
      <DateRangePicker
        aria-label="项目周期"
        defaultValue={{ start: "2026-09-15", end: "2026-09-18" }}
      />,
    );

    await user.click(screen.getByRole("button", { name: /打开日历/ }));
    const selected = (await screen.findAllByRole("gridcell")).filter((cell) =>
      cell.firstElementChild?.hasAttribute("data-selected"),
    );
    expect(selected.length).toBeGreaterThanOrEqual(4);
  });

  it("reports ISO strings when a range is selected", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DateRangePicker
        aria-label="项目周期"
        defaultOpen
        onValueChange={onValueChange}
      />,
    );

    const cells = await screen.findAllByRole("gridcell");
    const available = cells
      .map((cell) => cell.firstElementChild as HTMLElement | null)
      .filter(
        (cell): cell is HTMLElement =>
          cell !== null &&
          !cell.hasAttribute("data-outside-visible-range") &&
          !cell.hasAttribute("data-disabled"),
      );
    await user.click(available[7]!);
    await user.click(available[10]!);
    expect(onValueChange).toHaveBeenLastCalledWith({
      start: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      end: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
    });
  });

  it("inherits Field labeling and invalid state", () => {
    render(
      <Field invalid required>
        <Field.Label>项目周期</Field.Label>
        <DateRangePicker />
        <Field.Error>请选择有效周期。</Field.Error>
      </Field>,
    );
    const group = screen.getByRole("group", { name: "项目周期" });
    expect(group).toHaveAttribute("data-invalid", "true");
    expect(group).toHaveAccessibleDescription("请选择有效周期。");
  });

  it("does not mutate a controlled range", async () => {
    const onValueChange = vi.fn();
    render(
      <DateRangePicker
        aria-label="项目周期"
        value={{ start: "2026-09-15", end: "2026-09-18" }}
        onValueChange={onValueChange}
      />,
    );

    const startDay = screen
      .getAllByRole("spinbutton")
      .find((segment) => segment.getAttribute("aria-valuenow") === "15");
    fireEvent.keyDown(startDay!, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenCalledWith({
      start: "2026-09-16",
      end: "2026-09-18",
    });
    expect(startDay).toHaveAttribute("aria-valuenow", "15");
  });
});
