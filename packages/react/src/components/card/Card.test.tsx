import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "./Card";

describe("Card", () => {
  it("preserves semantic content composition", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>项目概览</Card.Title>
        </Card.Header>
        <Card.Content>项目内容</Card.Content>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "项目概览" })).toBeVisible();
    expect(screen.getByText("项目内容")).toBeVisible();
  });
});
