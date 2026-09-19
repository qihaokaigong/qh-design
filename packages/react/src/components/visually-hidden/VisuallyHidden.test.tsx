import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { VisuallyHidden } from "./VisuallyHidden";

it("keeps hidden text in the accessibility tree", () => {
  render(<VisuallyHidden>补充说明</VisuallyHidden>);

  expect(screen.getByText("补充说明")).toBeInTheDocument();
});
