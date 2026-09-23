import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PasswordInput } from "./PasswordInput";

describe("PasswordInput", () => {
  it("toggles password visibility", async () => {
    const onVisibilityChange = vi.fn();
    const user = userEvent.setup();
    render(
      <PasswordInput
        aria-label="密码"
        defaultValue="secret"
        onVisibilityChange={onVisibilityChange}
      />,
    );

    const input = screen.getByLabelText("密码");
    expect(input).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: "显示密码" }));
    expect(input).toHaveAttribute("type", "text");
    expect(onVisibilityChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByRole("button", { name: "隐藏密码" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("reports a controlled visibility request without mutating", async () => {
    const onVisibilityChange = vi.fn();
    const user = userEvent.setup();
    render(
      <PasswordInput
        aria-label="密码"
        visible={false}
        onVisibilityChange={onVisibilityChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "显示密码" }));
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
    expect(screen.getByLabelText("密码")).toHaveAttribute("type", "password");
  });

  it("disables both input and visibility action", () => {
    render(<PasswordInput aria-label="密码" disabled />);
    expect(screen.getByLabelText("密码")).toBeDisabled();
    expect(screen.getByRole("button", { name: "显示密码" })).toBeDisabled();
  });
});
