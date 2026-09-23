import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Field } from "../field";
import { FileUpload } from "./FileUpload";

const meta = {
  title: "Forms/FileUpload",
  component: FileUpload,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "项目附件",
    acceptedFileTypes: ["image/*", ".pdf"],
    multiple: true,
    maxFiles: 3,
    onFilesChange: fn(),
    onFilesRejected: fn(),
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const file = new File(["brief"], "project-brief.pdf", {
      type: "application/pdf",
    });
    await userEvent.upload(canvas.getByLabelText("项目附件"), file);
    await expect(canvas.getByText("project-brief.pdf")).toBeVisible();
    await expect(args.onFilesChange).toHaveBeenCalledWith([file]);
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)", maxWidth: 520 }}>
      <FileUpload aria-label="单个文件" />
      <FileUpload aria-label="多个文件" multiple maxFiles={4} />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field invalid required style={{ maxWidth: 520 }}>
      <Field.Label>项目附件</Field.Label>
      <FileUpload acceptedFileTypes={[".pdf"]} />
      <Field.Description>仅支持 PDF，单个文件不超过 10 MB。</Field.Description>
      <Field.Error>请选择有效的项目附件。</Field.Error>
    </Field>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const LongContent: Story = {
  args: {
    "aria-label": "企业协作平台年度发布与合规复核附件",
    dropLabel:
      "将企业协作平台年度发布、合规复核与长期归档所需的项目附件拖放到这里",
  },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
