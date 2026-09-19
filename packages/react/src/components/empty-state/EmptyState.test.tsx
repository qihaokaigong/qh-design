import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../button";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("presents a heading, guidance, and optional action", () => {
    render(
      <EmptyState
        title="暂无项目"
        description="请先创建项目"
        action={<Button>创建项目</Button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "暂无项目" })).toBeVisible();
    expect(screen.getByText("请先创建项目")).toBeVisible();
    expect(screen.getByRole("button", { name: "创建项目" })).toBeVisible();
  });
});
