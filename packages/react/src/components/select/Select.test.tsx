import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

describe("Select", () => {
  it("keeps native selection behavior", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select aria-label="团队" onChange={onChange}>
        <option value="design">设计</option>
        <option value="engineering">工程</option>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "团队" });
    await user.selectOptions(select, "engineering");
    expect(select).toHaveValue("engineering");
    expect(onChange).toHaveBeenCalledOnce();
  });
});
