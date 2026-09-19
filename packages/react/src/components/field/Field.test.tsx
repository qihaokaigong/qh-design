import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "../input";
import { Field } from "./Field";

describe("Field", () => {
  it("connects label, description, error, and inherited state", () => {
    render(
      <Field invalid required>
        <Field.Label>邮箱</Field.Label>
        <Input />
        <Field.Description>用于接收通知</Field.Description>
        <Field.Error>邮箱格式不正确</Field.Error>
      </Field>,
    );

    const input = screen.getByRole("textbox", { name: "邮箱" });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("用于接收通知 邮箱格式不正确");
    expect(screen.getByRole("alert")).toHaveTextContent("邮箱格式不正确");
  });

  it("does not render an error while valid", () => {
    render(
      <Field>
        <Field.Label>姓名</Field.Label>
        <Input />
        <Field.Error>必填</Field.Error>
      </Field>,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
