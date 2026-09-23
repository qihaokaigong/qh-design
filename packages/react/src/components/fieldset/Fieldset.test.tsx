import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Fieldset } from "./Fieldset";

describe("Fieldset", () => {
  it("provides a native group name and description", () => {
    render(
      <Fieldset>
        <Fieldset.Legend>通知渠道</Fieldset.Legend>
        <Fieldset.Description>可以选择多个渠道。</Fieldset.Description>
        <input type="checkbox" aria-label="邮件" />
      </Fieldset>,
    );

    const group = screen.getByRole("group", { name: "通知渠道" });
    expect(group).toHaveAccessibleDescription("可以选择多个渠道。");
  });

  it("disables native descendants", () => {
    render(
      <Fieldset disabled>
        <Fieldset.Legend>通知渠道</Fieldset.Legend>
        <input type="checkbox" aria-label="邮件" />
      </Fieldset>,
    );

    expect(screen.getByRole("checkbox", { name: "邮件" })).toBeDisabled();
  });

  it("only renders its error while invalid", () => {
    const { rerender } = render(
      <Fieldset>
        <Fieldset.Legend>通知渠道</Fieldset.Legend>
        <Fieldset.Error>请至少选择一项。</Fieldset.Error>
      </Fieldset>,
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    rerender(
      <Fieldset invalid>
        <Fieldset.Legend>通知渠道</Fieldset.Legend>
        <Fieldset.Error>请至少选择一项。</Fieldset.Error>
      </Fieldset>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("请至少选择一项。");
  });
});
