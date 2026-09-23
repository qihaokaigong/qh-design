import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("applies a numeric ratio and fit mode", () => {
    render(
      <AspectRatio data-testid="frame" ratio={4 / 3} fit="contain">
        <img src="/preview.png" alt="项目预览" />
      </AspectRatio>,
    );

    const frame = screen.getByTestId("frame");
    expect(frame).toHaveStyle({ aspectRatio: String(4 / 3) });
    expect(frame).toHaveAttribute("data-fit", "contain");
  });

  it("rejects non-positive ratios", () => {
    expect(() => render(<AspectRatio ratio={0} />)).toThrow(RangeError);
  });
});
