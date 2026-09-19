import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("accepts multiline native input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="说明" />);
    const textarea = screen.getByRole("textbox", { name: "说明" });
    await user.type(textarea, "第一行{enter}第二行");
    expect(textarea).toHaveValue("第一行\n第二行");
  });
});
