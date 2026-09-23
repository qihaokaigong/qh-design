import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Code } from "./Code";

describe("Code", () => {
  it("renders inline code semantics", () => {
    render(<Code>pnpm install</Code>);
    expect(screen.getByText("pnpm install").tagName).toBe("CODE");
  });

  it("renders a named, keyboard-focusable block", async () => {
    const user = userEvent.setup();
    render(<Code.Block label="安装命令">pnpm install @qhkg/react</Code.Block>);

    const region = screen.getByRole("region", { name: "安装命令" });
    expect(region.tagName).toBe("PRE");
    expect(region.querySelector("code")).toHaveTextContent(
      "pnpm install @qhkg/react",
    );
    await user.tab();
    expect(region).toHaveFocus();
  });

  it("marks wrapped blocks", () => {
    render(<Code.Block wrap>const longLine = true;</Code.Block>);
    expect(screen.getByRole("region")).toHaveAttribute("data-wrap", "true");
  });
});
