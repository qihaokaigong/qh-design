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
      className="grid gap-3 rounded-lg border border-border bg-surface p-4"
    >
      <div className="grid gap-3 md:grid-cols-[minmax(12rem,1fr)_auto_auto] md:items-center">
        <SearchInput
          aria-label={searchLabel}
          defaultValue={defaultQuery}
          placeholder={searchPlaceholder}
          value={query}
          onValueChange={onQueryChange}
        />
        {filters ? (
          <div
            aria-label="筛选条件"
            className="grid gap-2 sm:flex sm:flex-wrap"
            role="group"
          >
            {filters}
          </div>
        ) : (
          <span />
        )}
        {actions ? (
          <div
            aria-label="工具操作"
            className="grid gap-2 sm:flex sm:flex-wrap md:justify-end"
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
