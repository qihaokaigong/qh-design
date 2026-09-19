import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
  it("selects one option and reports its value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <RadioGroup aria-label="频率" onValueChange={onValueChange}>
        <RadioGroup.Item value="daily">每天</RadioGroup.Item>
        <RadioGroup.Item value="weekly">每周</RadioGroup.Item>
      </RadioGroup>,
    );

    await user.click(screen.getByRole("radio", { name: "每周" }));
    expect(screen.getByRole("radio", { name: "每周" })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("weekly");
  });
});
