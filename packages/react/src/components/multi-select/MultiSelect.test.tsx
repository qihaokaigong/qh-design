import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { MultiSelect } from "./MultiSelect";

const options = [
  { value: "design", label: "设计" },
  { value: "engineering", label: "工程" },
  { value: "finance", label: "财务", disabled: true },
];

describe("MultiSelect", () => {
  it("adds and removes values while the popup remains available", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        aria-label="参与团队"
        options={options}
        defaultValue={["design"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /参与团队/ }));
    await user.click(await screen.findByRole("option", { name: "工程" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["design", "engineering"]);
    expect(screen.getByRole("button", { name: /参与团队/ })).toHaveTextContent(
      "设计、工程",
    );
  });

  it("keeps controlled values stable", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelect
        aria-label="参与团队"
        options={options}
        value={["design"]}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /参与团队/ }));
    await user.click(await screen.findByRole("option", { name: "工程" }));
    expect(onValueChange).toHaveBeenCalledWith(["design", "engineering"]);
    expect(screen.getByRole("button", { name: /参与团队/ })).toHaveTextContent(
      "设计",
    );
  });

  it("inherits field relationships and state", () => {
    render(
      <Field invalid required disabled>
        <Field.Label>参与团队</Field.Label>
        <Field.Description>可选择多个团队。</Field.Description>
        <MultiSelect options={options} />
        <Field.Error>请至少选择一个团队。</Field.Error>
      </Field>,
    );

    const trigger = screen.getByRole("button", { name: /参与团队/ });
    expect(trigger).toBeDisabled();
    expect(trigger.closest("[data-invalid]")).toBeInTheDocument();
    expect(trigger).toHaveAccessibleDescription(
      "可选择多个团队。 请至少选择一个团队。",
    );
  });

  it("marks disabled options in the popup", async () => {
    const user = userEvent.setup();
    render(<MultiSelect aria-label="参与团队" options={options} />);
    await user.click(screen.getByRole("button", { name: /参与团队/ }));
    expect(await screen.findByRole("option", { name: "财务" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("forwards its ref to the popup trigger", () => {
    const ref = createRef<HTMLButtonElement>();
    render(<MultiSelect ref={ref} aria-label="参与团队" options={options} />);
    expect(ref.current).toBe(screen.getByRole("button", { name: /参与团队/ }));
  });
});
