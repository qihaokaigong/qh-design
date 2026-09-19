import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Stack } from "./Stack";

describe("Stack", () => {
  it("preserves child order", () => {
    render(
      <Stack>
        <span>第一项</span>
        <span>第二项</span>
      </Stack>,
    );
    expect(screen.getAllByText(/项/).map((item) => item.textContent)).toEqual([
      "第一项",
      "第二项",
    ]);
  });
});
