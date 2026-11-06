import { render, screen } from "@testing-library/react";
import { describe, expect, expectTypeOf, it } from "vitest";

import { Grid } from "./Grid";
import type { GridProps } from "./Grid.types";

describe("Grid", () => {
  it("keeps auto sizing exclusive to auto columns and off the DOM", () => {
    expectTypeOf<{
      columns: 2;
      minItemWidth: "md";
    }>().not.toExtend<GridProps>();
    expectTypeOf<{
      columns: "auto";
      minItemWidth: "lg";
    }>().toExtend<GridProps>();
    render(
      <Grid columns="auto" minItemWidth="lg" data-testid="auto-grid">
        内容
      </Grid>,
    );
    expect(screen.getByTestId("auto-grid")).not.toHaveAttribute("minItemWidth");
    expect(screen.getByText("内容")).toBeVisible();
  });
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
