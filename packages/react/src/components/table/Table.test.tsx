import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Table } from "./Table";

describe("Table", () => {
  it("preserves native table relationships and numeric alignment intent", () => {
    render(
      <Table>
        <Table.Caption>项目统计</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>项目</Table.Head>
            <Table.Head numeric>任务数</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>移动端应用</Table.Cell>
            <Table.Cell numeric>24</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    const table = screen.getByRole("table", { name: "项目统计" });
    expect(
      screen.getByRole("region", { name: "可横向滚动的表格" }),
    ).toHaveAttribute("tabindex", "0");
    expect(within(table).getAllByRole("columnheader")).toHaveLength(2);
    expect(within(table).getByRole("cell", { name: "24" })).toBeVisible();
  });

  it("exposes selected rows without changing native row semantics", () => {
    render(
      <Table>
        <Table.Body>
          <Table.Row aria-selected="true">
            <Table.Cell>已选择项目</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>,
    );

    expect(screen.getByRole("row")).toHaveAttribute("aria-selected", "true");
  });
});
