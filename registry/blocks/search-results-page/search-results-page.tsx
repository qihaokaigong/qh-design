"use client";

import {
  Alert,
  Badge,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Heading,
  Link,
  PageContainer,
  Pagination,
  Select,
  Skeleton,
  Text,
} from "@qhkg/react";
import { useMemo, useState } from "react";

import { PageHeader } from "../page-header/page-header";
import { Toolbar } from "../toolbar/toolbar";

export type SearchResultsState = "ready" | "loading" | "error";
export type SearchResultCategory = "components" | "guides" | "patterns";

export interface SearchResultItem {
  category: SearchResultCategory;
  description: string;
  href: string;
  id: string;
  title: string;
  updatedAt: string;
}

export interface SearchResultsPageProps {
  defaultQuery?: string;
  onRetry?: () => void;
  pageSize?: number;
  results?: readonly SearchResultItem[];
  state?: SearchResultsState;
}

export const demoSearchResults: readonly SearchResultItem[] = [
  {
    category: "components",
    description: "带标签、说明、错误关联和原生输入能力的表单字段组合。",
    href: "#field",
    id: "field",
    title: "Field 表单字段",
    updatedAt: "2026-09-22",
  },
  {
    category: "patterns",
    description: "包含筛选、排序、选择、批量操作和分页的项目数据表。",
    href: "#data-table",
    id: "data-table",
    title: "DataTable 数据表模式",
    updatedAt: "2026-09-21",
  },
  {
    category: "guides",
    description: "在 React 项目中安装组件包、Token 和 Registry Pattern。",
    href: "#getting-started",
    id: "getting-started",
    title: "接入 QH 设计系统",
    updatedAt: "2026-09-20",
  },
  {
    category: "components",
    description: "支持受控与非受控查询、清除按钮和输入组合语义。",
    href: "#search-input",
    id: "search-input",
    title: "SearchInput 搜索输入框",
    updatedAt: "2026-09-19",
  },
  {
    category: "guides",
    description: "移动端优先、语义 Token 和 44px 触控目标的实践要求。",
    href: "#mobile-guidelines",
    id: "mobile-guidelines",
    title: "移动端设计指南",
    updatedAt: "2026-09-18",
  },
  {
    category: "patterns",
    description: "组合面包屑、页面标题、说明文案和可见页面操作。",
    href: "#page-header",
    id: "page-header",
    title: "PageHeader 页面标题模式",
    updatedAt: "2026-09-17",
  },
  {
    category: "guides",
    description: "键盘、焦点、读屏和跨浏览器验收的发布前检查方法。",
    href: "#accessibility",
    id: "accessibility",
    title: "无障碍验收清单",
    updatedAt: "2026-09-16",
  },
];

const categoryPresentation: Record<
  SearchResultCategory,
  { label: string; tone: "info" | "neutral" | "success" }
> = {
  components: { label: "组件", tone: "info" },
  guides: { label: "指南", tone: "neutral" },
  patterns: { label: "模式", tone: "success" },
};

const normalizePageSize = (value: number) =>
  Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 4;

/** Search-results page with application-owned data and copy-first filtering. */
export function SearchResultsPage({
  defaultQuery = "",
  onRetry,
  pageSize: pageSizeProp = 4,
  results = demoSearchResults,
  state = "ready",
}: SearchResultsPageProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [category, setCategory] = useState<SearchResultCategory | "all">("all");
  const [page, setPage] = useState(1);
  const pageSize = normalizePageSize(pageSizeProp);

  const filteredResults = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");
    return results.filter((result) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [result.title, result.description].some((value) =>
          value.toLocaleLowerCase("zh-CN").includes(normalizedQuery),
        );
      const matchesCategory =
        category === "all" || result.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, query, results]);

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageResults = filteredResults.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const clearSearch = () => {
    setQuery("");
    setCategory("all");
    setPage(1);
  };

  return (
    <PageContainer className="grid gap-6 py-6 md:gap-8 md:py-8">
      <PageHeader
        breadcrumbs={[
          { id: "home", label: "首页", href: "#home" },
          { id: "search", label: "搜索结果" },
        ]}
        description="搜索组件、页面模式和使用指南。"
        title="搜索结果"
      />

      <Toolbar
        filters={
          <Select
            aria-label="结果类型"
            value={category}
            onChange={(event) => {
              setCategory(
                event.currentTarget.value as SearchResultCategory | "all",
              );
              setPage(1);
            }}
          >
            <option value="all">全部类型</option>
            <option value="components">组件</option>
            <option value="patterns">模式</option>
            <option value="guides">指南</option>
          </Select>
        }
        label="搜索工具"
        query={query}
        searchLabel="搜索文档"
        searchPlaceholder="组件、模式或指南"
        status={
          state === "ready" ? `找到 ${filteredResults.length} 条结果` : null
        }
        onQueryChange={(nextQuery) => {
          setQuery(nextQuery);
          setPage(1);
        }}
      />

      {state === "error" ? (
        <Alert
          action={
            <Button variant="secondary" onClick={onRetry}>
              重试
            </Button>
          }
          title="搜索失败"
          tone="danger"
        >
          请检查网络连接后重试，当前搜索条件会保留。
        </Alert>
      ) : null}

      {state === "loading" ? (
        <section aria-busy="true" aria-label="正在搜索" className="grid gap-3">
          <Text role="status" size="sm" tone="muted">
            正在搜索…
          </Text>
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-36" variant="rectangular" />
          ))}
        </section>
      ) : null}

      {state === "ready" && filteredResults.length === 0 ? (
        <section aria-labelledby="empty-search-heading">
          <Heading className="sr-only" id="empty-search-heading" level={2}>
            空搜索结果
          </Heading>
          <EmptyState
            action={
              query || category !== "all" ? (
                <Button variant="secondary" onClick={clearSearch}>
                  清除搜索条件
                </Button>
              ) : undefined
            }
            description="请尝试其他关键词或结果类型。"
            title="没有找到匹配结果"
          />
        </section>
      ) : null}

      {state === "ready" && pageResults.length > 0 ? (
        <section aria-label="搜索结果列表" className="grid gap-4">
          <ul className="grid list-none gap-4 p-0">
            {pageResults.map((result) => {
              const presentation = categoryPresentation[result.category];
              return (
                <li key={result.id}>
                  <article>
                    <Card>
                      <Card.Header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                        <Heading level={2} size="sm">
                          <Link href={result.href}>{result.title}</Link>
                        </Heading>
                        <Badge tone={presentation.tone}>
                          {presentation.label}
                        </Badge>
                      </Card.Header>
                      <Card.Content>
                        <Text as="p" tone="muted">
                          {result.description}
                        </Text>
                      </Card.Content>
                      <Card.Footer className="grid gap-2 sm:flex sm:items-center sm:justify-between">
                        <Text size="sm" tone="muted">
                          更新于 {result.updatedAt}
                        </Text>
                        <ButtonLink
                          aria-label={`查看${result.title}`}
                          href={result.href}
                          variant="ghost"
                        >
                          查看结果
                        </ButtonLink>
                      </Card.Footer>
                    </Card>
                  </article>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 ? (
            <Pagination
              aria-label="搜索结果分页"
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          ) : null}
        </section>
      ) : null}
    </PageContainer>
  );
}
