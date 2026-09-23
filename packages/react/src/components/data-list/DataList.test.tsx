import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DataList } from "./DataList";

describe("DataList", () => {
  it("renders native description-list semantics", () => {
    const { container } = render(
      <DataList>
        <DataList.Item>
          <DataList.Label>状态</DataList.Label>
          <DataList.Value>进行中</DataList.Value>
        </DataList.Item>
      </DataList>,
    );

    expect(container.querySelector("dl")).toBeInTheDocument();
    expect(screen.getByText("状态").tagName).toBe("DT");
    expect(screen.getByText("进行中").tagName).toBe("DD");
  });

  it("supports an explicitly stacked layout", () => {
    const { container } = render(<DataList layout="stacked" />);
    expect(container.querySelector("dl")).toHaveAttribute(
      "data-layout",
      "stacked",
    );
  });
});
