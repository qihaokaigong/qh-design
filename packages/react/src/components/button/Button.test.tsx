import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

describe("Button", () => {
  it("defaults to a non-submitting button", () => {
    render(<Button>保存</Button>);

    expect(screen.getByRole("button", { name: "保存" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("prevents activation and exposes busy state while loading", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button loading onClick={onClick}>
        保存
      </Button>,
    );

    const button = screen.getByRole("button", { busy: true });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("ButtonLink", () => {
  it("keeps native link semantics", () => {
    render(<ButtonLink href="/docs">查看文档</ButtonLink>);

    expect(screen.getByRole("link", { name: "查看文档" })).toHaveAttribute(
      "href",
      "/docs",
    );
  });
});
