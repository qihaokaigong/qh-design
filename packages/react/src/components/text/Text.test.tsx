import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Text } from "./Text";

describe("Text", () => {
  it("uses the requested semantic element", () => {
    render(<Text as="p">项目说明</Text>);
    expect(screen.getByText("项目说明").tagName).toBe("P");
  });
});
