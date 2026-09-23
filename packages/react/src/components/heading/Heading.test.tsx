import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Heading } from "./Heading";

describe("Heading", () => {
  it("preserves the requested document heading level", () => {
    render(<Heading level={3}>成员权限</Heading>);
    expect(
      screen.getByRole("heading", { level: 3, name: "成员权限" }),
    ).toBeVisible();
  });
});
