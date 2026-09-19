import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Grid } from "./Grid";

describe("Grid", () => {
  it("writes controlled responsive column variables", () => {
    render(
      <Grid data-testid="grid" columns={{ base: 1, md: 2, lg: 3 }}>
        <span>内容</span>
      </Grid>,
    );
    const grid = screen.getByTestId("grid");
    expect(grid.style.getPropertyValue("--qh-grid-columns-base")).toBe("1");
    expect(grid.style.getPropertyValue("--qh-grid-columns-md")).toBe("2");
    expect(grid.style.getPropertyValue("--qh-grid-columns-lg")).toBe("3");
  });
});
