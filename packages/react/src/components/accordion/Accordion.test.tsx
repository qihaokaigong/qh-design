import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Accordion } from "./Accordion";

function Example() {
  return (
    <Accordion collapsible type="single">
      <Accordion.Item value="one">
        <Accordion.Header headingLevel={2}>
          <Accordion.Trigger>安装方式</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>运行接入命令。</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item disabled value="two">
        <Accordion.Header headingLevel={2}>
          <Accordion.Trigger>不可用项目</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>不可用内容。</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("expands content and preserves heading semantics", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "安装方式" });
    expect(
      screen.getByRole("heading", { level: 2, name: "安装方式" }),
    ).toBeVisible();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("运行接入命令。")).toBeVisible();
  });

  it("keeps disabled items unavailable", () => {
    render(<Example />);
    expect(screen.getByRole("button", { name: "不可用项目" })).toBeDisabled();
  });
});
