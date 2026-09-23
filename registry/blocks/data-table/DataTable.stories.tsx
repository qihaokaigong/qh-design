import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { DataTable } from "./data-table";

const meta = {
  title: "Patterns/DataTable",
  component: DataTable,
  tags: ["autodocs", "ai-generated"],
  args: {
    onBulkArchive: fn(),
    onRetry: fn(),
    onRowOpen: fn(),
    pageSize: 4,
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", { name: "项目名称，未排序" }),
    );
    await expect(
      canvas.getByRole("columnheader", { name: /项目名称/ }),
    ).toHaveAttribute("aria-sort", "ascending");

    await userEvent.type(
      canvas.getByRole("searchbox", { name: "搜索项目" }),
      "林晓",
    );
    await userEvent.click(canvas.getByRole("button", { name: "应用筛选" }));
    await expect(canvas.getByText("共 2 个项目，已选择 0 个")).toBeVisible();

    await userEvent.click(
      canvas.getByRole("checkbox", { name: "选择项目：无障碍审计" }),
    );
    await userEvent.click(canvas.getByRole("button", { name: "批量操作" }));
    await userEvent.click(
      within(canvasElement.ownerDocument.body).getByRole("menuitem", {
        name: "归档所选项目",
      }),
    );
    await expect(args.onBulkArchive).toHaveBeenCalledWith(["QH-104"]);
    await expect(canvas.getByText("共 2 个项目，已选择 0 个")).toBeVisible();
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

export const Empty: Story = {
  args: { rows: [] },
};

export const NoResults: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "搜索项目" }),
      "不存在的项目",
    );
    await userEvent.click(canvas.getByRole("button", { name: "应用筛选" }));
    await expect(
      canvas.getByRole("heading", { name: "没有匹配的项目" }),
    ).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: "清除筛选" }));
    await expect(canvas.getByText("共 8 个项目，已选择 0 个")).toBeVisible();
  },
};
