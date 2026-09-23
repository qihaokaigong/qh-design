import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { ProjectListPage } from "./project-list-page";

const meta = {
  title: "Patterns/ProjectListPage",
  component: ProjectListPage,
  tags: ["autodocs", "ai-generated"],
  args: {
    onBulkArchive: fn(),
    onRetry: fn(),
    onRowOpen: fn(),
    pageSize: 4,
  },
} satisfies Meta<typeof ProjectListPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", { level: 1, name: "项目" }),
    ).toBeVisible();
    await userEvent.click(canvas.getAllByRole("button", { name: "查看" })[0]);
    await expect(args.onRowOpen).toHaveBeenCalledWith(
      expect.objectContaining({ id: "QH-108" }),
    );

    await userEvent.type(
      canvas.getByRole("searchbox", { name: "搜索项目" }),
      "权限管理",
    );
    await userEvent.click(canvas.getByRole("button", { name: "应用筛选" }));
    await expect(canvas.getByText("共 1 个项目，已选择 0 个")).toBeVisible();
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
};

export const Empty: Story = {
  args: { rows: [] },
};
