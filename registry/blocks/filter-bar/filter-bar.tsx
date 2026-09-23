"use client";

import { Button, Field, SearchInput, Select } from "@qhkg/react";
import type { FormEvent } from "react";

export type ProjectFilterStatus = "all" | "active" | "completed" | "archived";

export interface FilterBarProps {
  disabled?: boolean;
  onApply?: (event: FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
  onQueryChange?: (query: string) => void;
  onStatusChange?: (status: ProjectFilterStatus) => void;
  query?: string;
  status?: ProjectFilterStatus;
}

export function FilterBar({
  disabled,
  onApply,
  onClear,
  onQueryChange,
  onStatusChange,
  query,
  status,
}: FilterBarProps) {
  return (
    <form
      aria-label="项目筛选"
      className="grid gap-3 rounded-lg border border-border bg-surface p-4 md:grid-cols-[minmax(12rem,1fr)_12rem_auto] md:items-end"
      onSubmit={onApply}
    >
      <Field>
        <Field.Label>搜索项目</Field.Label>
        <SearchInput
          disabled={disabled}
          name="query"
          placeholder="名称或负责人"
          value={query}
          onValueChange={onQueryChange}
        />
      </Field>
      <Field>
        <Field.Label>状态</Field.Label>
        <Select
          disabled={disabled}
          name="status"
          value={status}
          defaultValue={status === undefined ? "all" : undefined}
          onChange={(event) =>
            onStatusChange?.(event.currentTarget.value as ProjectFilterStatus)
          }
        >
          <option value="all">全部状态</option>
          <option value="active">进行中</option>
          <option value="completed">已完成</option>
          <option value="archived">已归档</option>
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-2 md:flex">
        <Button
          disabled={disabled}
          type="reset"
          variant="secondary"
          onClick={onClear}
        >
          清除
        </Button>
        <Button disabled={disabled} type="submit">
          应用筛选
        </Button>
      </div>
    </form>
  );
}
