import type { Meta, StoryObj } from "@storybook/react-vite";

import { VisuallyHidden } from "./VisuallyHidden";

const meta = {
  title: "Foundation/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "视觉隐藏内容，但继续向辅助技术提供文本。",
      },
    },
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "供屏幕阅读器读取的补充说明",
  },
  render: (args) => (
    <div>
      下方存在一段视觉隐藏文本。
      <VisuallyHidden {...args} />
    </div>
  ),
};
