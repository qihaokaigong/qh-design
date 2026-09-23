import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Code } from "./Code";

const meta = {
  title: "Foundations/Code",
  component: Code,
  tags: ["autodocs", "ai-generated"],
  args: { children: "@qhkg/react" },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <p>
      使用 <Code {...args} /> 构建界面。
    </p>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText("@qhkg/react").tagName).toBe(
      "CODE",
    );
  },
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-4)" }}>
      <span>
        行内命令：<Code>pnpm install</Code>
      </span>
      <Code.Block label="TypeScript 示例">{`import { Button } from "@qhkg/react";\n\nexport function Save() {\n  return <Button>保存</Button>;\n}`}</Code.Block>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(
      canvas.getByRole("region", { name: "TypeScript 示例" }),
    ).toHaveFocus();
  },
};

export const LongContent: Story = {
  render: () => (
    <Code.Block label="长代码示例">
      {`const capability = "enterprise-collaboration-platform-compliance-review-and-long-term-archive";`}
    </Code.Block>
  ),
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};
