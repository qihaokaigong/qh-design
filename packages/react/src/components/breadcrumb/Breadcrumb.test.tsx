import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Breadcrumb } from "./Breadcrumb";

const items = [
  { id: "home", label: "首页", href: "/" },
  { id: "products", label: "产品", href: "/products" },
  { id: "design", label: "设计系统" },
] as const;

describe("Breadcrumb", () => {
  it("renders a labelled navigation landmark and ordered path", () => {
    render(<Breadcrumb items={items} />);

    const navigation = screen.getByRole("navigation", { name: "面包屑导航" });
    expect(navigation.querySelector("ol")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "首页" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("设计系统")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("marks an interactive final item as the current page", () => {
    render(
      <Breadcrumb
        items={[
          { id: "home", label: "首页", href: "/" },
          {
            id: "account",
            label: "账户",
            href: "/account",
            linkProps: { target: "_blank", rel: "noreferrer" },
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "账户" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "账户" })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("reveals collapsed ancestors from an accessible mobile control", async () => {
    const user = userEvent.setup();
    render(
      <Breadcrumb
        items={[
          { id: "home", label: "首页", href: "/" },
          { id: "library", label: "资源库", href: "/library" },
          { id: "guides", label: "指南", href: "/library/guides" },
          { id: "current", label: "接入说明" },
        ]}
      />,
    );

    const expand = screen.getByRole("button", { name: "显示完整路径" });
    const list = screen.getByRole("list");
    expect(list).not.toHaveAttribute("data-expanded");

    await user.click(expand);

    expect(list).toHaveAttribute("data-expanded", "true");
    expect(
      screen.queryByRole("button", { name: "显示完整路径" }),
    ).not.toBeInTheDocument();
  });

  it("supports localized landmark, expansion label, and custom separator", () => {
    const { container } = render(
      <Breadcrumb
        aria-label="Breadcrumb"
        expandLabel="Show full path"
        items={[
          { id: "one", label: "One", href: "/one" },
          { id: "two", label: "Two", href: "/two" },
          { id: "three", label: "Three", href: "/three" },
          { id: "four", label: "Four" },
        ]}
        separator={<span data-testid="custom-separator">·</span>}
      />,
    );

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "Show full path" }),
    ).toBeVisible();
    expect(screen.getAllByTestId("custom-separator")).toHaveLength(4);
    expect(
      container.querySelector('[data-testid="custom-separator"]')
        ?.parentElement,
    ).toHaveAttribute("aria-hidden", "true");
  });
});
