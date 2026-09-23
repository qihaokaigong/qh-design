"use client";

import { ButtonLink, Heading, PageContainer } from "@qhkg/react";

import {
  DataTable,
  type DataTableState,
  type ProjectRow,
} from "../data-table/data-table";
import { PageHeader } from "../page-header/page-header";

export interface ProjectListPageProps {
  createHref?: string;
  onBulkArchive?: (selectedIds: readonly string[]) => void;
  onRetry?: () => void;
  onRowOpen?: (row: ProjectRow) => void;
  pageSize?: number;
  rows?: readonly ProjectRow[];
  state?: DataTableState;
}

/**
 * Complete project-list page shell. Keep route state, data fetching, and
 * authorization in the consuming application and pass the resolved state in.
 */
export function ProjectListPage({
  createHref = "#new-project",
  onBulkArchive,
  onRetry,
  onRowOpen,
  pageSize,
  rows,
  state,
}: ProjectListPageProps) {
  return (
    <PageContainer className="grid gap-6 py-6 md:gap-8 md:py-8" maxWidth="full">
      <PageHeader
        actions={<ButtonLink href={createHref}>新建项目</ButtonLink>}
        breadcrumbs={[
          { id: "home", label: "首页", href: "#home" },
          { id: "projects", label: "项目" },
        ]}
        description="集中查看项目状态、负责人和最近更新时间。"
        title="项目"
      />

      <section aria-labelledby="project-list-heading" className="grid gap-4">
        <Heading id="project-list-heading" level={2} size="md">
          项目列表
        </Heading>
        <DataTable
          onBulkArchive={onBulkArchive}
          onRetry={onRetry}
          onRowOpen={onRowOpen}
          pageSize={pageSize}
          rows={rows}
          state={state}
        />
      </section>
    </PageContainer>
  );
}
