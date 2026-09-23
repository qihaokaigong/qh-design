"use client";

import { Check } from "lucide-react";
import { clsx } from "clsx";
import { forwardRef } from "react";
import {
  ListBox as AriaListBox,
  ListBoxItem,
  Text as AriaText,
} from "react-aria-components/ListBox";
import type { Selection } from "react-aria-components/ListBox";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./ListBox.module.css";
import type { ListBoxProps } from "./ListBox.types";

function selectionValues(
  selection: Selection,
  optionValues: readonly string[],
): string[] {
  if (selection === "all") return [...optionValues];
  return [...selection].map(String);
}

export const ListBox = forwardRef<HTMLDivElement, ListBoxProps>(
  function ListBox(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className,
      defaultValue,
      disabled,
      disallowEmptySelection,
      emptyText = "暂无选项",
      id,
      invalid,
      onValueChange,
      options,
      required,
      selectionMode = "single",
      value,
      ...props
    },
    ref,
  ) {
    const field = useFieldControl({
      describedBy: ariaDescribedBy,
      disabled,
      id,
      invalid,
      required,
    });
    const isMultiple = selectionMode === "multiple";
    const selectedKeys =
      value === undefined
        ? undefined
        : new Set(Array.isArray(value) ? value : value === null ? [] : [value]);
    const defaultSelectedKeys =
      defaultValue === undefined
        ? undefined
        : new Set(
            Array.isArray(defaultValue)
              ? defaultValue
              : defaultValue === null
                ? []
                : [defaultValue],
          );
    const disabledKeys = options
      .filter((option) => field.disabled || option.disabled)
      .map((option) => option.value);

    return (
      <AriaListBox
        {...props}
        ref={ref}
        id={field.id}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? field.labelId}
        aria-describedby={field.describedBy}
        aria-invalid={field.invalid || undefined}
        aria-required={field.required || undefined}
        aria-disabled={field.disabled || undefined}
        data-invalid={field.invalid || undefined}
        data-required={field.required || undefined}
        selectionMode={selectionMode}
        selectionBehavior="toggle"
        selectedKeys={selectedKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        disabledKeys={disabledKeys}
        disallowEmptySelection={disallowEmptySelection}
        renderEmptyState={() => (
          <span className={styles.empty}>{emptyText}</span>
        )}
        onSelectionChange={(selection) => {
          const nextValues = selectionValues(
            selection,
            options.map((option) => option.value),
          );
          if (isMultiple) {
            (onValueChange as ((value: string[]) => void) | undefined)?.(
              nextValues,
            );
          } else {
            (onValueChange as ((value: string | null) => void) | undefined)?.(
              nextValues[0] ?? null,
            );
          }
        }}
      >
        {options.map((option) => (
          <ListBoxItem
            key={option.value}
            id={option.value}
            value={option}
            textValue={option.label}
            className={styles.item}
          >
            {({ isSelected }) => (
              <>
                <span className={styles.copy}>
                  <AriaText slot="label" className={styles.label}>
                    {option.label}
                  </AriaText>
                  {option.description ? (
                    <AriaText slot="description" className={styles.description}>
                      {option.description}
                    </AriaText>
                  ) : null}
                </span>
                <span className={styles.indicator} aria-hidden="true">
                  {isSelected ? <Check /> : null}
                </span>
              </>
            )}
          </ListBoxItem>
        ))}
      </AriaListBox>
    );
  },
);
