import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Link } from "./Link";

describe("Link", () => {
  it("preserves native navigation semantics and keyboard focus", async () => {
    const user = userEvent.setup();
    render(<Link href="/components">组件</Link>);
    const link = screen.getByRole("link", { name: "组件" });
    expect(link).toHaveAttribute("href", "/components");
    await user.tab();
    expect(link).toHaveFocus();
  });
});
