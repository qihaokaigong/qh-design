import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Fieldset } from "../fieldset";
import { CheckboxGroup } from "./CheckboxGroup";

describe("CheckboxGroup", () => {
  it("manages multiple values in uncontrolled mode", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup
        aria-label="通知渠道"
        defaultValue={["email"]}
        onValueChange={onValueChange}
      >
        <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
        <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
      </CheckboxGroup>,
    );

    const email = screen.getByRole("checkbox", { name: "邮件" });
    const sms = screen.getByRole("checkbox", { name: "短信" });
    expect(email).toBeChecked();

    await user.click(sms);
    expect(sms).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith(["email", "sms"]);

    await user.click(email);
    expect(email).not.toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith(["sms"]);
  });

  it("does not mutate controlled values", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <CheckboxGroup
        aria-label="通知渠道"
        value={["email"]}
        onValueChange={onValueChange}
      >
        <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
        <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
      </CheckboxGroup>,
    );

    const sms = screen.getByRole("checkbox", { name: "短信" });
    await user.click(sms);
    expect(onValueChange).toHaveBeenCalledWith(["email", "sms"]);
    expect(sms).not.toBeChecked();
  });

  it("inherits group semantics and state from Fieldset", () => {
    render(
      <Fieldset disabled invalid required>
        <Fieldset.Legend>通知渠道</Fieldset.Legend>
        <Fieldset.Description>至少选择一项。</Fieldset.Description>
        <CheckboxGroup>
          <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
        </CheckboxGroup>
        <Fieldset.Error>请至少选择一项。</Fieldset.Error>
      </Fieldset>,
    );

    const groups = screen.getAllByRole("group", { name: "通知渠道" });
    const checkboxGroup = groups.find(
      (group) => group.getAttribute("data-invalid") === "true",
    );
    expect(checkboxGroup).toBeDefined();
    expect(checkboxGroup).toHaveAccessibleDescription(
      "至少选择一项。 请至少选择一项。",
    );
    expect(screen.getByRole("checkbox", { name: "邮件" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("checkbox", { name: "邮件" })).toBeDisabled();
  });

  it("requires items to be nested in a group", () => {
    expect(() =>
      render(<CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>),
    ).toThrow("CheckboxGroup.Item must be used within CheckboxGroup.");
  });
});
