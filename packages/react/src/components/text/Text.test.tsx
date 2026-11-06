import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { Text } from "./Text";

describe("Text", () => {
  it("uses the requested semantic element", () => {
    render(<Text as="p">项目说明</Text>);
    expect(screen.getByText("项目说明").tagName).toBe("P");
  });
  it("keeps semantic attributes and refs when choosing UI typography", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Text as="p" ref={ref} role="status" variant="ui">
        共 8 个项目
      </Text>,
    );
    const status = screen.getByRole("status");
    expect(status.tagName).toBe("P");
    expect(ref.current).toBe(status);
    expect(status).not.toHaveAttribute("variant");
  });
});
