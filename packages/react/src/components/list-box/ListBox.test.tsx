import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { ListBox } from "./ListBox";

const options = [
  { value: "design", label: "设计", description: "体验设计" },
  { value: "engineering", label: "工程" },
  { value: "finance", label: "财务", disabled: true },
];

describe("ListBox", () => {
  it("selects a value and reports it", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ListBox
        aria-label="团队"
        options={options}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("option", { name: /工程/ }));
    expect(onValueChange).toHaveBeenCalledWith("engineering");
    expect(screen.getByRole("option", { name: /工程/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("supports multiple controlled values without mutating them", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ListBox
        aria-label="团队"
        options={options}
        selectionMode="multiple"
        value={["design"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("option", { name: /工程/ }));
    expect(onValueChange).toHaveBeenCalledWith(["design", "engineering"]);
    expect(screen.getByRole("option", { name: /工程/ })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });

  it("connects field state and disables configured options", () => {
    render(
      <Field invalid required>
        <Field.Label>团队</Field.Label>
        <Field.Description>选择负责团队。</Field.Description>
        <ListBox options={options} />
        <Field.Error>必须选择团队。</Field.Error>
      </Field>,
    );

    const listbox = screen.getByRole("listbox", { name: "团队" });
    expect(listbox).toHaveAttribute("data-invalid", "true");
    expect(listbox).toHaveAttribute("data-required", "true");
    expect(listbox).toHaveAccessibleDescription(
      "选择负责团队。 必须选择团队。",
    );
    expect(screen.getByRole("option", { name: "财务" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("renders an empty state", () => {
    render(<ListBox aria-label="团队" options={[]} emptyText="没有团队" />);
    expect(screen.getByText("没有团队")).toBeVisible();
  });
});
