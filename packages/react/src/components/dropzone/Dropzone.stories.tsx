import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Dropzone } from "./Dropzone";

const meta = {
  title: "Forms/Dropzone",
  component: Dropzone,
  tags: ["autodocs", "ai-generated"],
  args: {
    "aria-label": "项目附件拖放区域",
    children: "将项目附件拖放到这里",
    onFilesDrop: fn(),
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole("button", { name: "项目附件拖放区域" }),
    ).toHaveFocus();
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-3)" }}>
      <Dropzone aria-label="默认拖放区域">默认</Dropzone>
      <Dropzone aria-label="无效拖放区域" invalid>
        文件无效
      </Dropzone>
    </div>
  ),
};

export const Invalid: Story = { args: { invalid: true } };

export const Disabled: Story = { args: { disabled: true } };

export const LongContent: Story = {
  args: {
    children:
      "将企业协作平台年度发布、合规复核与长期归档所需的项目附件拖放到这里",
  },
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
