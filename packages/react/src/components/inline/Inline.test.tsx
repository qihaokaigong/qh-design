import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Inline } from "./Inline";

describe("Inline", () => {
  it("renders all inline children", () => {
    render(
      <Inline>
        <span>设计</span>
        <span>开发</span>
      </Inline>,
    );
    expect(screen.getByText("设计")).toBeVisible();
    expect(screen.getByText("开发")).toBeVisible();
  });
});
