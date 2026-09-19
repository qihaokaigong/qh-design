import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert } from "./Alert";

describe("Alert", () => {
  it("uses an assertive role for danger messages", () => {
    render(
      <Alert tone="danger" title="保存失败">
        请重试
      </Alert>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("保存失败请重试");
  });

  it("uses status semantics for non-critical information", () => {
    render(<Alert title="已保存">更改已同步</Alert>);
    expect(screen.getByRole("status")).toHaveTextContent("已保存更改已同步");
  });
});
