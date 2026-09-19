import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Input } from "./Input";

describe("Input", () => {
  it("preserves native input behavior", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="姓名" name="name" />);

    const input = screen.getByRole("textbox", { name: "姓名" });
    await user.type(input, "齐昊");
    expect(input).toHaveValue("齐昊");
    expect(input).toHaveAttribute("name", "name");
  });

  it("exposes invalid state", () => {
    render(<Input aria-label="邮箱" invalid />);
    expect(screen.getByRole("textbox", { name: "邮箱" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
