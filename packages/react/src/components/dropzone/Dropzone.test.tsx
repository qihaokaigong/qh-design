import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Dropzone } from "./Dropzone";
import { validateFiles } from "./file-validation";

describe("Dropzone", () => {
  it("provides a keyboard-focusable accessible drop affordance", async () => {
    const user = userEvent.setup();
    render(<Dropzone aria-label="上传附件">拖放文件</Dropzone>);

    await user.tab();
    expect(screen.getByRole("button", { name: "上传附件" })).toHaveFocus();
  });

  it("exposes disabled and invalid states", () => {
    const { container } = render(
      <Dropzone disabled invalid>
        拖放文件
      </Dropzone>,
    );

    const root = container.firstElementChild;
    expect(root).toHaveAttribute("data-disabled", "true");
    expect(root).toHaveAttribute("data-invalid", "true");
    expect(screen.getByRole("button", { name: "文件拖放区域" })).toBeDisabled();
  });

  it("validates MIME wildcards, extensions, size, and count", () => {
    const image = new File(["image"], "cover.png", { type: "image/png" });
    const document = new File(["document"], "brief.pdf", {
      type: "application/pdf",
    });
    const oversized = new File(["too large"], "notes.txt", {
      type: "text/plain",
    });

    const result = validateFiles([image, document, oversized], {
      acceptedFileTypes: ["image/*", ".pdf", "text/plain"],
      maxFileSize: 8,
      maxFiles: 2,
    });

    expect(result.acceptedFiles).toEqual([image, document]);
    expect(result.rejectedFiles).toEqual([
      { file: oversized, reasons: ["too-many-files", "file-size"] },
    ]);
  });
});
