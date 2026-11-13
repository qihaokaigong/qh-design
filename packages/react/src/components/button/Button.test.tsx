import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

describe("Button", () => {
  it.each(["soft", "outline"] as const)(
    "keeps %s actions keyboard accessible and blocks loading activation",
    async (variant) => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      const { rerender } = render(
        <Button variant={variant} onClick={onClick}>
          预览项目
        </Button>,
      );
      await user.tab();
      await user.keyboard("{Enter}");
      expect(onClick).toHaveBeenCalledOnce();
      rerender(
        <Button
          variant={variant}
          loading
          loadingText="正在预览"
          onClick={onClick}
        >
          预览项目
        </Button>,
      );
      const button = screen.getByRole("button", { busy: true });
      expect(button).toBeDisabled();
      await user.click(button);
      expect(onClick).toHaveBeenCalledOnce();
    },
  );
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

  it("keeps quiet actions keyboard operable while skipping disabled actions", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <>
        <Button variant="ghost" disabled>
          禁用操作
        </Button>
        <Button variant="ghost" onClick={onClick}>
          清除筛选
        </Button>
      </>,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "清除筛选" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("ButtonLink", () => {
  it.each(["soft", "outline"] as const)(
    "preserves native navigation for %s links",
    (variant) => {
      render(
        <ButtonLink variant={variant} href="/projects">
          查看项目
        </ButtonLink>,
      );
      expect(screen.getByRole("link", { name: "查看项目" })).toHaveAttribute(
        "href",
        "/projects",
      );
    },
  );
  it("keeps native link semantics", () => {
    render(<ButtonLink href="/docs">查看文档</ButtonLink>);

    expect(screen.getByRole("link", { name: "查看文档" })).toHaveAttribute(
      "href",
      "/docs",
    );
  });
});
