import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Progress } from "./Progress";

describe("Progress", () => {
  it("exposes its accessible name and value", () => {
    render(<Progress label="上传进度" value={64} showValue />);
    const progress = screen.getByRole("progressbar", { name: "上传进度" });
    expect(progress).toHaveAttribute("aria-valuenow", "64");
    expect(screen.getByText("64%")).toBeVisible();
  });

  it("supports indeterminate progress", () => {
    render(<Progress label="正在准备" value={null} />);
    expect(
      screen.getByRole("progressbar", { name: "正在准备" }),
    ).not.toHaveAttribute("aria-valuenow");
  });
});
