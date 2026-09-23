import { DollarSign, Search } from "lucide-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { InputGroup } from "./InputGroup";

describe("InputGroup", () => {
  it("composes an input with addons and an action", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <InputGroup>
        <InputGroup.Addon>
          <Search aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input aria-label="搜索" />
        <InputGroup.Action aria-label="执行搜索" onClick={onClick}>
          <DollarSign />
        </InputGroup.Action>
      </InputGroup>,
    );

    await user.type(screen.getByRole("textbox", { name: "搜索" }), "组件");
    await user.click(screen.getByRole("button", { name: "执行搜索" }));
    expect(screen.getByRole("textbox", { name: "搜索" })).toHaveValue("组件");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("passes Field state to its input and action", () => {
    render(
      <Field disabled invalid required>
        <Field.Label>金额</Field.Label>
        <InputGroup>
          <InputGroup.Addon>¥</InputGroup.Addon>
          <InputGroup.Input />
          <InputGroup.Action aria-label="选择币种">
            <DollarSign />
          </InputGroup.Action>
        </InputGroup>
        <Field.Error>金额无效。</Field.Error>
      </Field>,
    );

    const input = screen.getByRole("textbox", { name: "金额" });
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("金额无效。");
    expect(screen.getByRole("button", { name: "选择币种" })).toBeDisabled();
  });
});
