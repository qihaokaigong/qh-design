import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs } from "./Tabs";

describe("Tabs", () => {
  it("changes panels and supports arrow-key navigation", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="overview">
        <Tabs.List aria-label="项目视图">
          <Tabs.Trigger value="overview">概览</Tabs.Trigger>
          <Tabs.Trigger value="activity">动态</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="overview">概览内容</Tabs.Content>
        <Tabs.Content value="activity">动态内容</Tabs.Content>
      </Tabs>,
    );

    const overview = screen.getByRole("tab", { name: "概览" });
    overview.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "动态" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("动态内容")).toBeVisible();
  });
});
