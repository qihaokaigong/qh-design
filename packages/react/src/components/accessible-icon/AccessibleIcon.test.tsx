import { render, screen } from "@testing-library/react";
import { Search } from "lucide-react";
import { describe, expect, it } from "vitest";

import { AccessibleIcon } from "./AccessibleIcon";

describe("AccessibleIcon", () => {
  it("provides the accessible name for an icon-only control", () => {
    const { container } = render(
      <button type="button">
        <AccessibleIcon label="搜索">
          <Search />
        </AccessibleIcon>
      </button>,
    );
    expect(screen.getByRole("button", { name: "搜索" })).toBeVisible();
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
