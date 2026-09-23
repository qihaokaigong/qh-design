import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Kbd } from "./Kbd";

describe("Kbd", () => {
  it("renders native keyboard-input semantics", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘").tagName).toBe("KBD");
  });

  it("supports the documented sizes", () => {
    render(<Kbd size="md">Enter</Kbd>);
    expect(screen.getByText("Enter")).toHaveAttribute("data-size", "md");
  });
});
