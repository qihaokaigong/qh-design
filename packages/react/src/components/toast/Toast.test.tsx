import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { Toast } from "./Toast";

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider duration={Infinity}>
      <button onClick={() => setOpen(true)}>保存</button>
      <Toast open={open} onOpenChange={setOpen}>
        <Toast.Title>保存成功</Toast.Title>
        <Toast.Description>所有更改均已保存。</Toast.Description>
        <Toast.Close />
      </Toast>
    </Toast.Provider>
  );
}

describe("Toast", () => {
  it("announces feedback and can be dismissed", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "保存" }));
    expect(screen.getByText("保存成功")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "关闭通知" }));
    expect(screen.queryByText("保存成功")).not.toBeInTheDocument();
  });
});
