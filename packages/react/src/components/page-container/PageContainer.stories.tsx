import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageContainer } from "./PageContainer";

const meta = {
  title: "Layout/PageContainer",
  component: PageContainer,
  tags: ["autodocs", "ai-generated"],
  args: { children: "页面内容会保持居中，并使用随视口变化的标准页边距。" },
  argTypes: {
    maxWidth: { control: "select", options: ["reading", "content", "full"] },
  },
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const decoration = {
  paddingBlock: "var(--qh-space-6)",
  background: "var(--qh-color-surface-subtle)",
};
export const Default: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <div style={decoration}>{args.children}</div>
    </PageContainer>
  ),
};
export const Playground: Story = Default;
export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <PageContainer maxWidth="reading">
        <div style={decoration}>阅读宽度</div>
      </PageContainer>
      <PageContainer maxWidth="content">
        <div style={decoration}>内容宽度</div>
      </PageContainer>
    </div>
  ),
};
export const LongContent: Story = {
  args: {
    maxWidth: "reading",
    children:
      "阅读宽度适合长篇正文。容器只管理页面宽度和边距，不会替业务内容决定字体、段落间距或其他排版语义。",
  },
};
export const Mobile: Story = {
  ...Default,
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile375" },
  },
};
