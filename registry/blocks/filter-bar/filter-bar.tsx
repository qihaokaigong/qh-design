"use client";

import { Button, Field, SearchInput, Select, Text } from "@qhkg/react";
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
  /** outlined is standalone; plain embeds in a page without a second frame. Defaults to outlined. */
  variant?: "outlined" | "plain";
}

export function FilterBar({
  disabled,
  onApply,
  onClear,
  onQueryChange,
  onStatusChange,
  query,
  status,
  variant = "outlined",
}: FilterBarProps) {
  return (
    <form
      aria-label="项目筛选"
      className={`flex min-w-0 flex-wrap items-end gap-3 ${variant === "outlined" ? "rounded-lg border border-border bg-surface p-4" : ""}`}
      onSubmit={onApply}
    >
      <Field className="min-w-0 basis-48 grow">
        <Field.Label>
          <Text size="sm" variant="ui" weight="medium">
            搜索项目
          </Text>
        </Field.Label>
        <SearchInput
          disabled={disabled}
          name="query"
          placeholder="名称或负责人"
          value={query}
          onValueChange={onQueryChange}
        />
      </Field>
      <Field className="min-w-0 basis-48 grow">
        <Field.Label>
          <Text size="sm" variant="ui" weight="medium">
            状态
          </Text>
        </Field.Label>
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
      <div className="flex min-w-0 grow basis-48 flex-wrap gap-2 [&>*]:grow">
        <Button
          disabled={disabled}
          type="reset"
          variant="ghost"
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
