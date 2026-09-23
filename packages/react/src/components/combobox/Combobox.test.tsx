import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { Combobox } from "./Combobox";

const options = [
  { value: "beijing", label: "北京" },
  { value: "hong-kong", label: "香港" },
  { value: "tokyo", label: "东京", disabled: true },
];

describe("Combobox", () => {
  it("filters and selects an option", async () => {
    const onValueChange = vi.fn();
    const onInputValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        aria-label="办公地点"
        options={options}
        onValueChange={onValueChange}
        onInputValueChange={onInputValueChange}
      />,
    );

    const input = screen.getByRole("combobox", { name: "办公地点" });
    await user.type(input, "香港");
    expect(onInputValueChange).toHaveBeenLastCalledWith("香港");
    await user.click(await screen.findByRole("option", { name: "香港" }));
    expect(onValueChange).toHaveBeenCalledWith("hong-kong");
    expect(input).toHaveValue("香港");
  });

  it("reports changes when the selected value is controlled", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        aria-label="办公地点"
        options={options}
        value="beijing"
        onValueChange={onValueChange}
      />,
    );

    const input = screen.getByRole("combobox", { name: "办公地点" });
    await user.clear(input);
    await user.type(input, "香港");
    await user.click(await screen.findByRole("option", { name: "香港" }));
    expect(onValueChange).toHaveBeenCalledWith("hong-kong");
  });

  it("inherits field relationships and state", () => {
    render(
      <Field invalid required disabled>
        <Field.Label>办公地点</Field.Label>
        <Field.Description>输入城市名称进行筛选。</Field.Description>
        <Combobox options={options} />
        <Field.Error>请选择办公地点。</Field.Error>
      </Field>,
    );

    const input = screen.getByRole("combobox", { name: "办公地点" });
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleDescription(
      "输入城市名称进行筛选。 请选择办公地点。",
    );
  });

  it("does not select a disabled option", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Combobox
        aria-label="办公地点"
        options={options}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "显示选项" }));
    const option = await screen.findByRole("option", { name: "东京" });
    expect(option).toHaveAttribute("aria-disabled", "true");
    await user.click(option);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("forwards its ref to the editable input", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Combobox ref={ref} aria-label="办公地点" options={options} />);
    expect(ref.current).toBe(screen.getByRole("combobox"));
  });
});
