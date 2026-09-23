import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("derives an accessible name and fallback initials", async () => {
    render(<Avatar name="Qi Hao" />);

    expect(screen.getByRole("img", { name: "Qi Hao" })).toBeVisible();
    expect(await screen.findByText("QH")).toBeVisible();
  });

  it("supports custom fallback, size, and shape", async () => {
    render(<Avatar name="Qi Hao" fallback="企" size="lg" shape="square" />);

    const avatar = screen.getByRole("img", { name: "Qi Hao" });
    expect(avatar).toHaveAttribute("data-size", "lg");
    expect(avatar).toHaveAttribute("data-shape", "square");
    expect(await screen.findByText("企")).toBeVisible();
  });

  it("can be decorative when nearby text already provides the name", () => {
    const { container } = render(
      <div>
        <Avatar name="Qi Hao" alt="" src="/avatar.png" />
        <span>Qi Hao</span>
      </div>,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector('[data-size="md"]')).not.toHaveAttribute(
      "aria-label",
    );
  });
});
