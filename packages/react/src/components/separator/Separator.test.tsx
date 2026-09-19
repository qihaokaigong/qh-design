import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./Separator";

describe("Separator", () => {
  it("is decorative by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveAttribute("role", "none");
  });

  it("can expose separator semantics when meaningful", () => {
    render(<Separator decorative={false} aria-label="章节分隔" />);
    expect(screen.getByRole("separator", { name: "章节分隔" })).toBeVisible();
  });
});
