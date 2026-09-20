import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders navigation semantics, the current page, and a compact status", () => {
    render(
      <Pagination page={6} totalPages={20} onPageChange={() => undefined} />,
    );

    expect(screen.getByRole("navigation", { name: "分页导航" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "第 6 页，当前页" }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("第 6 / 20 页")).toHaveAttribute(
      "aria-live",
      "polite",
    );
    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("notifies button consumers with one-based page numbers", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={8} onPageChange={onPageChange} />);

    await user.click(screen.getByRole("button", { name: "下一页" }));
    await user.click(screen.getByRole("button", { name: "前往第 2 页" }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 4);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 2);
  });

  it("disables boundary controls without removing their accessible names", () => {
    const { rerender } = render(
      <Pagination page={1} totalPages={3} onPageChange={() => undefined} />,
    );

    expect(screen.getByRole("button", { name: "上一页" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "下一页" })).toBeEnabled();

    rerender(
      <Pagination page={3} totalPages={3} onPageChange={() => undefined} />,
    );

    expect(screen.getByRole("button", { name: "上一页" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();
  });

  it("renders crawlable links when getPageHref is provided", () => {
    render(
      <Pagination
        page={2}
        totalPages={4}
        getPageHref={(page) => `/projects?page=${page}`}
      />,
    );

    expect(screen.getByRole("link", { name: "上一页" })).toHaveAttribute(
      "href",
      "/projects?page=1",
    );
    expect(screen.getByRole("link", { name: "前往第 3 页" })).toHaveAttribute(
      "href",
      "/projects?page=3",
    );
    expect(
      screen.getByRole("link", { name: "第 2 页，当前页" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("supports localized accessible labels and status text", () => {
    render(
      <Pagination
        aria-label="Article pages"
        page={2}
        totalPages={5}
        onPageChange={() => undefined}
        getItemAriaLabel={({ page, type }) =>
          type === "page" ? `Go to page ${page}` : `Go ${type}`
        }
        formatPageStatus={(page, total) => `Page ${page} of ${total}`}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Article pages" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Go to page 2" }),
    ).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("Page 2 of 5")).toBeVisible();
  });
});
