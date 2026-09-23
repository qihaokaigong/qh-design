"use client";

import {
  Alert,
  Badge,
  Button,
  Checkbox,
  EmptyState,
  Menu,
  Pagination,
  Skeleton,
  Table,
  Text,
} from "@qhkg/react";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { FilterBar, type ProjectFilterStatus } from "../filter-bar/filter-bar";

export type ProjectStatus = Exclude<ProjectFilterStatus, "all">;
export type DataTableState = "ready" | "loading" | "error";
export type ProjectSortKey = "name" | "updatedAt";
export type SortDirection = "ascending" | "descending";

export interface ProjectRow {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  updatedAt: string;
}

export interface DataTableProps {
  /** Domain rows stay application-owned; replace ProjectRow with the local model after copying. */
  rows?: readonly ProjectRow[];
  state?: DataTableState;
  pageSize?: number;
  onBulkArchive?: (selectedIds: readonly string[]) => void;
  onRetry?: () => void;
  onRowOpen?: (row: ProjectRow) => void;
}

export const demoProjectRows: readonly ProjectRow[] = [
  {
    id: "QH-108",
    name: "移动端导航重构",
    owner: "林晓",
    status: "active",
    updatedAt: "2026-09-21",
  },
  {
    id: "QH-107",
    name: "设计令牌迁移",
    owner: "陈一",
    status: "completed",
    updatedAt: "2026-09-19",
  },
  {
    id: "QH-106",
    name: "会员中心改版",
    owner: "周芮",
    status: "active",
    updatedAt: "2026-09-18",
  },
  {
    id: "QH-105",
    name: "订单搜索优化",
    owner: "王琦",
    status: "archived",
    updatedAt: "2026-09-15",
  },
  {
    id: "QH-104",
    name: "无障碍审计",
    owner: "林晓",
    status: "completed",
    updatedAt: "2026-09-12",
  },
  {
    id: "QH-103",
    name: "权限管理升级",
    owner: "沈佳",
    status: "active",
    updatedAt: "2026-09-10",
  },
  {
    id: "QH-102",
    name: "数据导出流程",
    owner: "陈一",
    status: "archived",
    updatedAt: "2026-09-07",
  },
  {
    id: "QH-101",
    name: "通知中心整理",
    owner: "周芮",
    status: "completed",
    updatedAt: "2026-09-03",
  },
];

const statusPresentation: Record<
  ProjectStatus,
  { label: string; tone: "info" | "success" | "neutral" }
> = {
  active: { label: "进行中", tone: "info" },
  completed: { label: "已完成", tone: "success" },
  archived: { label: "已归档", tone: "neutral" },
};

const normalizePageSize = (value: number) =>
  Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 5;

/**
 * Copy-first project table pattern. Column definitions and data operations are
 * intentionally local so applications can adapt them to their own domain and
 * move sorting, filtering, and pagination to the server when needed.
 */
export function DataTable({
  onBulkArchive,
  onRetry,
  onRowOpen,
  pageSize: pageSizeProp = 5,
  rows = demoProjectRows,
  state = "ready",
}: DataTableProps) {
  const [draftQuery, setDraftQuery] = useState("");
  const [draftStatus, setDraftStatus] = useState<ProjectFilterStatus>("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectFilterStatus>("all");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [sortKey, setSortKey] = useState<ProjectSortKey>("updatedAt");
  const [sortDirection, setSortDirection] =
    useState<SortDirection>("descending");
  const pageSize = normalizePageSize(pageSizeProp);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");

    return [...rows]
      .filter((row) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          [row.id, row.name, row.owner].some((value) =>
            value.toLocaleLowerCase("zh-CN").includes(normalizedQuery),
          );
        const matchesStatus = status === "all" || row.status === status;
        return matchesQuery && matchesStatus;
      })
      .sort((left, right) => {
        const comparison = left[sortKey].localeCompare(right[sortKey], "zh-CN");
        return sortDirection === "ascending" ? comparison : -comparison;
      });
  }, [query, rows, sortDirection, sortKey, status]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filteredRows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const selectedOnPage = pageRows.filter((row) => selectedIds.has(row.id));
  const allOnPageSelected =
    pageRows.length > 0 && selectedOnPage.length === pageRows.length;
  const someOnPageSelected = selectedOnPage.length > 0 && !allOnPageSelected;

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(draftQuery);
    setStatus(draftStatus);
    setPage(1);
  };

  const clearFilters = () => {
    setDraftQuery("");
    setDraftStatus("all");
    setQuery("");
    setStatus("all");
    setPage(1);
  };

  const toggleSort = (nextKey: ProjectSortKey) => {
    if (sortKey === nextKey) {
      setSortDirection((current) =>
        current === "ascending" ? "descending" : "ascending",
      );
    } else {
      setSortKey(nextKey);
      setSortDirection("ascending");
    }
    setPage(1);
  };

  const togglePage = (checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      pageRows.forEach((row) => {
        if (checked) next.add(row.id);
        else next.delete(row.id);
      });
      return next;
    });
  };

  const toggleRow = (rowId: string, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) next.add(rowId);
      else next.delete(rowId);
      return next;
    });
  };

  const runBulkArchive = () => {
    const ids = [...selectedIds];
    onBulkArchive?.(ids);
    setSelectedIds(new Set());
  };

  const sortLabel = (key: ProjectSortKey, label: string) => {
    if (sortKey !== key) return `${label}，未排序`;
    return `${label}，当前${sortDirection === "ascending" ? "升序" : "降序"}`;
  };

  return (
    <section aria-label="项目数据表" className="grid gap-4">
      <FilterBar
        disabled={state === "loading"}
        query={draftQuery}
        status={draftStatus}
        onApply={applyFilters}
        onClear={clearFilters}
        onQueryChange={setDraftQuery}
        onStatusChange={setDraftStatus}
      />

      {state === "error" ? (
        <Alert
          title="项目加载失败"
          tone="danger"
          action={
            <Button variant="secondary" onClick={onRetry}>
              重试
            </Button>
          }
        >
          请检查网络连接后重试，当前筛选条件会保留。
        </Alert>
      ) : null}

      {state === "ready" ? (
        <div className="grid gap-3">
          <div className="grid gap-2 sm:flex sm:items-center sm:justify-between">
            <Text aria-live="polite" size="sm" tone="muted">
              共 {filteredRows.length} 个项目，已选择 {selectedIds.size} 个
            </Text>
            <Menu>
              <Menu.Trigger asChild>
                <Button disabled={selectedIds.size === 0} variant="secondary">
                  批量操作
                </Button>
              </Menu.Trigger>
              <Menu.Content align="end">
                <Menu.Label>已选择 {selectedIds.size} 个项目</Menu.Label>
                <Menu.Item onSelect={runBulkArchive}>归档所选项目</Menu.Item>
                <Menu.Separator />
                <Menu.Item onSelect={() => setSelectedIds(new Set())}>
                  清除选择
                </Menu.Item>
              </Menu.Content>
            </Menu>
          </div>

          {filteredRows.length === 0 ? (
            <EmptyState
              title={rows.length === 0 ? "暂无项目" : "没有匹配的项目"}
              description={
                rows.length === 0
                  ? "创建项目后，项目会显示在这里。"
                  : "请调整关键词或状态筛选条件。"
              }
              action={
                rows.length > 0 ? (
                  <Button variant="secondary" onClick={clearFilters}>
                    清除筛选
                  </Button>
                ) : undefined
              }
            />
          ) : (
            <>
              <Table
                minWidth="lg"
                scrollContainerLabel="项目数据表，可横向滚动"
              >
                <Table.Caption>
                  项目列表，可按项目名称或更新时间排序
                </Table.Caption>
                <Table.Header>
                  <Table.Row>
                    <Table.Head>
                      <Checkbox
                        aria-label="选择当前页全部项目"
                        checked={
                          someOnPageSelected
                            ? "indeterminate"
                            : allOnPageSelected
                        }
                        onCheckedChange={(checked) =>
                          togglePage(checked === true)
                        }
                      >
                        全选
                      </Checkbox>
                    </Table.Head>
                    <Table.Head
                      aria-sort={sortKey === "name" ? sortDirection : "none"}
                    >
                      <Button
                        aria-label={sortLabel("name", "项目名称")}
                        variant="ghost"
                        onClick={() => toggleSort("name")}
                      >
                        项目名称
                        {sortKey === "name"
                          ? sortDirection === "ascending"
                            ? " ↑"
                            : " ↓"
                          : " ↕"}
                      </Button>
                    </Table.Head>
                    <Table.Head>负责人</Table.Head>
                    <Table.Head>状态</Table.Head>
                    <Table.Head
                      aria-sort={
                        sortKey === "updatedAt" ? sortDirection : "none"
                      }
                    >
                      <Button
                        aria-label={sortLabel("updatedAt", "更新时间")}
                        variant="ghost"
                        onClick={() => toggleSort("updatedAt")}
                      >
                        更新时间
                        {sortKey === "updatedAt"
                          ? sortDirection === "ascending"
                            ? " ↑"
                            : " ↓"
                          : " ↕"}
                      </Button>
                    </Table.Head>
                    <Table.Head>操作</Table.Head>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {pageRows.map((row) => {
                    const presentation = statusPresentation[row.status];
                    return (
                      <Table.Row
                        key={row.id}
                        aria-selected={selectedIds.has(row.id)}
                      >
                        <Table.Cell>
                          <Checkbox
                            aria-label={`选择项目：${row.name}`}
                            checked={selectedIds.has(row.id)}
                            onCheckedChange={(checked) =>
                              toggleRow(row.id, checked === true)
                            }
                          >
                            选择
                          </Checkbox>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="grid gap-1">
                            <Text weight="semibold">{row.name}</Text>
                            <Text size="xs" tone="muted">
                              {row.id}
                            </Text>
                          </div>
                        </Table.Cell>
                        <Table.Cell>{row.owner}</Table.Cell>
                        <Table.Cell>
                          <Badge tone={presentation.tone}>
                            {presentation.label}
                          </Badge>
                        </Table.Cell>
                        <Table.Cell>{row.updatedAt}</Table.Cell>
                        <Table.Cell>
                          <Button
                            variant="ghost"
                            onClick={() => onRowOpen?.(row)}
                          >
                            查看
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>

              <Pagination
                aria-label="项目分页"
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      ) : null}

      {state === "loading" ? (
        <div aria-busy="true" aria-label="正在加载项目" className="grid gap-3">
          <Text role="status" size="sm" tone="muted">
            正在加载项目…
          </Text>
          <div className="grid gap-3 rounded-lg border border-border bg-surface p-4">
            {Array.from({ length: 5 }, (_, index) => (
              <Skeleton key={index} className="h-11" variant="rectangular" />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
