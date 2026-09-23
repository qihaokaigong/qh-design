import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { AspectRatio } from "./AspectRatio";

const Placeholder = ({ label }: { label: string }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
      color: "var(--qh-color-on-selected)",
      background: "var(--qh-color-selected)",
    }}
  >
    {label}
  </div>
);

const meta = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs", "ai-generated"],
  args: { ratio: 16 / 9, children: <Placeholder label="16:9 预览" /> },
  argTypes: { fit: { control: "select", options: ["cover", "contain"] } },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const frame = within(canvasElement).getByText("16:9 预览").parentElement;
    await expect(frame).toHaveAttribute("data-fit", "cover");
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)", maxWidth: 480 }}>
      <AspectRatio ratio={16 / 9}>
        <Placeholder label="16:9" />
      </AspectRatio>
      <AspectRatio ratio={4 / 3}>
        <Placeholder label="4:3" />
      </AspectRatio>
      <AspectRatio ratio={1}>
        <Placeholder label="1:1" />
      </AspectRatio>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <AspectRatio ratio={21 / 9}>
      <Placeholder label="企业协作平台年度发布与合规复核项目横幅预览" />
    </AspectRatio>
  ),
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
