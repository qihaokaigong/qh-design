import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders status text without inventing interactive semantics", () => {
    render(<Badge tone="success">已完成</Badge>);
    expect(screen.getByText("已完成")).toBeVisible();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
