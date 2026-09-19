"use client";

import { Button, Field, Input, Select } from "@qh-design/react";
import type { FormEvent } from "react";

export interface FilterBarProps {
  onApply?: (event: FormEvent<HTMLFormElement>) => void;
  onClear?: () => void;
}

export function FilterBar({ onApply, onClear }: FilterBarProps) {
  return (
    <form
      aria-label="项目筛选"
      className="grid gap-3 rounded-lg border border-border bg-surface p-4 md:grid-cols-[minmax(12rem,1fr)_12rem_auto] md:items-end"
      onSubmit={onApply}
    >
      <Field>
        <Field.Label>搜索项目</Field.Label>
        <Input name="query" type="search" placeholder="名称或负责人" />
      </Field>
      <Field>
        <Field.Label>状态</Field.Label>
        <Select name="status" defaultValue="all">
          <option value="all">全部状态</option>
          <option value="active">进行中</option>
          <option value="completed">已完成</option>
          <option value="archived">已归档</option>
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-2 md:flex">
        <Button type="button" variant="secondary" onClick={onClear}>
          清除
        </Button>
        <Button type="submit">应用筛选</Button>
      </div>
    </form>
  );
}
