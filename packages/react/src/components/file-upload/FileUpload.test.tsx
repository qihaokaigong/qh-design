import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Field } from "../field";
import { FileUpload } from "./FileUpload";

describe("FileUpload", () => {
  it("selects and removes a file through the native picker", async () => {
    const onFilesChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Field>
        <Field.Label>项目附件</Field.Label>
        <FileUpload onFilesChange={onFilesChange} />
        <Field.Description>请选择 PDF 文件。</Field.Description>
      </Field>,
    );
    const file = new File(["brief"], "brief.pdf", {
      type: "application/pdf",
    });

    await user.upload(screen.getByLabelText("项目附件"), file);
    expect(screen.getByText("brief.pdf")).toBeVisible();
    expect(onFilesChange).toHaveBeenLastCalledWith([file]);
    expect(screen.getByLabelText("项目附件")).toHaveAccessibleDescription(
      "请选择 PDF 文件。",
    );

    await user.click(screen.getByRole("button", { name: "移除 brief.pdf" }));
    expect(screen.queryByText("brief.pdf")).not.toBeInTheDocument();
    expect(onFilesChange).toHaveBeenLastCalledWith([]);
  });

  it("rejects duplicate and excess files", async () => {
    const onFilesRejected = vi.fn();
    const user = userEvent.setup();
    render(
      <FileUpload
        aria-label="上传图片"
        acceptedFileTypes={["image/*"]}
        maxFileSize={8}
        maxFiles={1}
        multiple
        onFilesRejected={onFilesRejected}
      />,
    );
    const image = new File(["image"], "cover.png", { type: "image/png" });
    const excess = new File(["second"], "second.png", { type: "image/png" });
    const input = screen.getByLabelText("上传图片");
    await user.upload(input, [image, excess]);
    await user.upload(input, image);

    expect(screen.getByText("cover.png")).toBeVisible();
    expect(screen.queryByText("second.png")).not.toBeInTheDocument();
    expect(onFilesRejected).toHaveBeenCalledTimes(2);
    expect(onFilesRejected.mock.calls[0][0]).toEqual([
      { file: excess, reasons: ["too-many-files"] },
    ]);
    expect(onFilesRejected.mock.calls[1][0]).toEqual([
      { file: image, reasons: ["duplicate-file"] },
    ]);
  });

  it("reports changes without mutating controlled files", async () => {
    const original = new File(["original"], "original.pdf", {
      type: "application/pdf",
    });
    const replacement = new File(["replacement"], "replacement.pdf", {
      type: "application/pdf",
    });
    const onFilesChange = vi.fn();
    const user = userEvent.setup();
    render(
      <FileUpload
        aria-label="替换附件"
        files={[original]}
        onFilesChange={onFilesChange}
      />,
    );

    await user.upload(screen.getByLabelText("替换附件"), replacement);
    expect(onFilesChange).toHaveBeenCalledWith([replacement]);
    expect(screen.getByText("original.pdf")).toBeVisible();
    expect(screen.queryByText("replacement.pdf")).not.toBeInTheDocument();
  });

  it("inherits disabled, invalid, and required state from Field", () => {
    render(
      <Field disabled invalid required>
        <Field.Label>合同附件</Field.Label>
        <FileUpload />
        <Field.Error>请上传合同。</Field.Error>
      </Field>,
    );

    const input = document.querySelector('input[type="file"]');
    expect(input).not.toBeNull();
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAccessibleDescription("请上传合同。");
  });
});
