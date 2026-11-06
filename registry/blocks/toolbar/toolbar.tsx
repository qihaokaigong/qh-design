"use client";

import { SearchInput, Text } from "@qhkg/react";
import type { ReactNode } from "react";

export interface ToolbarProps {
  actions?: ReactNode;
  defaultQuery?: string;
  filters?: ReactNode;
  label?: string;
  onQueryChange?: (query: string) => void;
  query?: string;
  searchLabel?: string;
  searchPlaceholder?: string;
  status?: ReactNode;
}

/**
 * Responsive page-tool composition. It intentionally uses a labelled group
 * instead of role=toolbar because its native controls remain independent tab
 * stops and do not implement the ARIA toolbar arrow-key model.
 */
export function Toolbar({
  actions,
  defaultQuery,
  filters,
  label = "列表工具",
  onQueryChange,
  query,
  searchLabel = "搜索",
  searchPlaceholder = "输入关键词",
  status,
}: ToolbarProps) {
  return (
    <section
      aria-label={label}
      className="grid min-w-0 gap-3 rounded-lg border border-border bg-surface p-4"
    >
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <div className="min-w-0 basis-48 grow">
          <SearchInput
            aria-label={searchLabel}
            defaultValue={defaultQuery}
            placeholder={searchPlaceholder}
            value={query}
            onValueChange={onQueryChange}
          />
        </div>
        {filters ? (
          <div
            aria-label="筛选条件"
            className="flex min-w-0 max-w-full flex-wrap gap-2"
            role="group"
          >
            {filters}
          </div>
        ) : null}
        {actions ? (
          <div
            aria-label="工具操作"
            className="flex min-w-0 max-w-full flex-wrap gap-2"
            role="group"
          >
            {actions}
          </div>
        ) : null}
      </div>
      {status ? (
        <Text aria-live="polite" size="sm" tone="muted">
          {status}
        </Text>
      ) : null}
    </section>
  );
}
