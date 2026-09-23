import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { SearchResultsPage } from "./search-results-page";

const meta = {
  title: "Patterns/SearchResultsPage",
  component: SearchResultsPage,
  tags: ["autodocs", "ai-generated"],
  args: {
    onRetry: fn(),
    pageSize: 3,
  },
} satisfies Meta<typeof SearchResultsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("找到 7 条结果")).toBeVisible();
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "搜索文档" }),
      "无障碍",
    );
    await expect(canvas.getByText("找到 1 条结果")).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "无障碍验收清单" }),
    ).toBeVisible();

    await userEvent.clear(canvas.getByRole("searchbox", { name: "搜索文档" }));
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "结果类型" }),
      "patterns",
    );
    await expect(canvas.getByText("找到 2 条结果")).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile320" } },
};

export const Loading: Story = {
  args: { state: "loading" },
};

export const Error: Story = {
  args: { state: "error" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "重试" }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
};

export const NoResults: Story = {
  args: { defaultQuery: "不存在的内容" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { name: "没有找到匹配结果" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "清除搜索条件" }));
    await expect(canvas.getByText("找到 7 条结果")).toBeVisible();
  },
};
