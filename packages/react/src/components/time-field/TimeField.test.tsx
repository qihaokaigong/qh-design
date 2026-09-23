import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { TimeField } from "./TimeField";

describe("TimeField", () => {
  it("reports ISO time strings when a segment changes", async () => {
    const onValueChange = vi.fn();
    render(
      <TimeField
        aria-label="开始时间"
        defaultValue="09:30"
        hourCycle={24}
        onValueChange={onValueChange}
      />,
    );

    const hour = screen.getAllByRole("spinbutton")[0]!;
    fireEvent.keyDown(hour, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenLastCalledWith("10:30:00");
  });

  it("inherits Field labeling, description and disabled state", () => {
    render(
      <Field disabled required>
        <Field.Label>开始时间</Field.Label>
        <TimeField />
        <Field.Description>使用项目所在时区。</Field.Description>
      </Field>,
    );
    const group = screen.getByRole("group", { name: "开始时间" });
    expect(group).toHaveAccessibleDescription("使用项目所在时区。");
    expect(screen.getAllByRole("spinbutton")[0]).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("submits the ISO time value", () => {
    const { container } = render(
      <TimeField
        aria-label="开始时间"
        name="startTime"
        value="09:30"
        hourCycle={24}
      />,
    );
    expect(container.querySelector('input[name="startTime"]')).toHaveValue(
      "09:30:00",
    );
  });

  it("does not mutate a controlled time", async () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <TimeField
        aria-label="开始时间"
        name="startTime"
        value="09:30"
        hourCycle={24}
        onValueChange={onValueChange}
      />,
    );
    const hour = screen.getAllByRole("spinbutton")[0]!;
    fireEvent.keyDown(hour, { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenCalledWith("10:30:00");
    expect(container.querySelector('input[name="startTime"]')).toHaveValue(
      "09:30:00",
    );
  });
});
