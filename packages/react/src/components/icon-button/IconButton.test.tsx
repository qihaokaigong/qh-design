import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("uses the required aria-label as its accessible name", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <IconButton aria-label="搜索" onClick={onClick}>
        <Search />
      </IconButton>,
    );

    await user.click(screen.getByRole("button", { name: "搜索" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves loading semantics", () => {
    render(
      <IconButton aria-label="搜索" loading>
        <Search />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "搜索" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "搜索" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });
});
