import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { Stack } from "../stack";
import { Pagination } from "./Pagination";
import type { PaginationButtonProps } from "./Pagination.types";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs", "ai-generated"],
  args: {
    page: 6,
    totalPages: 20,
    onPageChange: () => undefined,
  },
  argTypes: {
    boundaryCount: { control: { type: "number", min: 0, max: 3 } },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
    totalPages: { control: { type: "number", min: 1 } },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

type ControlledExampleProps = Omit<
  PaginationButtonProps,
  "page" | "onPageChange"
> & {
  initialPage?: number;
};

const ControlledExample = ({
  initialPage = 6,
  ...props
}: ControlledExampleProps) => {
  const [page, setPage] = useState(initialPage);
  return <Pagination {...props} page={page} onPageChange={setPage} />;
};

export const Default: Story = {
  render: () => <ControlledExample totalPages={20} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "下一页" }));
    await expect(
      canvas.getByRole("button", { name: "第 7 页，当前页" }),
    ).toHaveAttribute("aria-current", "page");
  },
};

export const Playground: Story = {
  args: {
    boundaryCount: 1,
    disabled: false,
    page: 6,
    siblingCount: 1,
    totalPages: 20,
    onPageChange: () => undefined,
  },
};

export const States: Story = {
  render: () => (
    <Stack gap="6">
      <Pagination
        aria-label="首页状态分页"
        page={1}
        totalPages={12}
        onPageChange={() => undefined}
      />
      <Pagination
        aria-label="中间页状态分页"
        page={6}
        totalPages={12}
        onPageChange={() => undefined}
      />
      <Pagination
        aria-label="末页状态分页"
        page={12}
        totalPages={12}
        onPageChange={() => undefined}
      />
      <Pagination
        aria-label="禁用状态分页"
        disabled
        page={6}
        totalPages={12}
        onPageChange={() => undefined}
      />
    </Stack>
  ),
};

export const LinkNavigation: Story = {
  render: () => (
    <Pagination
      page={3}
      totalPages={12}
      getPageHref={(page) => `?page=${page}`}
    />
  ),
};

export const LongContent: Story = {
  render: () => <ControlledExample initialPage={5000} totalPages={9999} />,
};

export const Mobile: Story = {
  render: () => <ControlledExample initialPage={38} totalPages={120} />,
  parameters: { viewport: { defaultViewport: "mobile320" } },
};

export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <Pagination
        aria-label="التنقل بين الصفحات"
        page={6}
        totalPages={20}
        onPageChange={() => undefined}
        getItemAriaLabel={({ page, type }) =>
          type === "page"
            ? `الصفحة ${page}`
            : type === "previous"
              ? "السابق"
              : "التالي"
        }
        formatPageStatus={(page, total) => `الصفحة ${page} من ${total}`}
      />
    </div>
  ),
};
