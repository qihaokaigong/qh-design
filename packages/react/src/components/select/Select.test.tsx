import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";
import { Field } from "../field";

describe("Select", () => {
  it("keeps native selection behavior", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select aria-label="团队" onChange={onChange}>
        <option value="design">设计</option>
        <option value="engineering">工程</option>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "团队" });
    await user.selectOptions(select, "engineering");
    expect(select).toHaveValue("engineering");
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("preserves the native ref, field association, form value and keyboard focus", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLSelectElement>();
    render(
      <form aria-label="筛选">
        <Field required invalid>
          <Field.Label>状态</Field.Label>
          <Select ref={ref} name="status" defaultValue="active">
            <option value="active">进行中</option>
            <option value="completed">已完成</option>
          </Select>
          <Field.Error>请确认状态。</Field.Error>
        </Field>
      </form>,
    );
    const select = screen.getByRole("combobox", { name: "状态" });
    expect(ref.current).toBe(select);
    expect(select).toBeRequired();
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toHaveAccessibleDescription("请确认状态。");
    await user.tab();
    expect(select).toHaveFocus();
    await user.selectOptions(select, "completed");
    const form = screen.getByRole("form", { name: "筛选" }) as HTMLFormElement;
    expect(new FormData(form).get("status")).toBe("completed");
    expect(select.parentElement?.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(select.parentElement?.querySelector("svg")).toHaveAttribute(
      "focusable",
      "false",
    );
  });

  it("inherits disabled from Field and keeps native multiple selection", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Field disabled>
          <Field.Label>禁用团队</Field.Label>
          <Select defaultValue="design">
            <option value="design">设计</option>
          </Select>
        </Field>
        <Select aria-label="多选团队" multiple defaultValue={["design"]}>
          <option value="design">设计</option>
          <option value="engineering">工程</option>
        </Select>
      </>,
    );
    expect(screen.getByRole("combobox", { name: "禁用团队" })).toBeDisabled();
    const multiple = screen.getByRole("listbox", { name: "多选团队" });
    await user.selectOptions(multiple, "engineering");
    expect(multiple).toHaveValue(["design", "engineering"]);
    expect(multiple.parentElement?.querySelector("svg")).toBeNull();
  });
});
