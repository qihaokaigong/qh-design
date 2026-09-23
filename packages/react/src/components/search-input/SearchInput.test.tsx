import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("reports typed values and clears an uncontrolled search", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchInput aria-label="搜索组件" onValueChange={onValueChange} />);

    const input = screen.getByRole("searchbox", { name: "搜索组件" });
    await user.type(input, "Button");
    expect(input).toHaveValue("Button");
    expect(onValueChange).toHaveBeenLastCalledWith("Button");

    await user.click(screen.getByRole("button", { name: "清除搜索" }));
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("");
  });

  it("does not mutate a controlled value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchInput
        aria-label="搜索组件"
        value="Input"
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "清除搜索" }));
    expect(onValueChange).toHaveBeenCalledWith("");
    expect(screen.getByRole("searchbox", { name: "搜索组件" })).toHaveValue(
      "Input",
    );
  });

  it("disables both input and clear action", () => {
    render(<SearchInput aria-label="搜索组件" defaultValue="Input" disabled />);
    expect(screen.getByRole("searchbox", { name: "搜索组件" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "清除搜索" })).toBeDisabled();
  });
});
