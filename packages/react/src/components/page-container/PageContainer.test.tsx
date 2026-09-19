import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageContainer } from "./PageContainer";

describe("PageContainer", () => {
  it("renders a page-width boundary without changing child semantics", () => {
    render(
      <PageContainer>
        <main>主要内容</main>
      </PageContainer>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("主要内容");
  });
});
