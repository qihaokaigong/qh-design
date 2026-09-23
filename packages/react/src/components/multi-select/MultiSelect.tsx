"use client";

import { clsx } from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef } from "react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem,
  Popover as AriaPopover,
  Select as AriaSelect,
  SelectValue,
  Text as AriaText,
} from "react-aria-components/Select";

import { useFieldControl } from "../field/useFieldControl";
import type { CollectionOption } from "../list-box";
import styles from "./MultiSelect.module.css";
import type { MultiSelectProps } from "./MultiSelect.types";

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  function MultiSelect(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className,
      defaultValue,
      disabled,
      emptyText = "暂无选项",
      id,
      invalid,
      onValueChange,
      options,
      placeholder = "请选择",
      required,
      size = "md",
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
    const disabledKeys = options
      .filter((option) => option.disabled)
      .map((option) => option.value);

    return (
      <AriaSelect
        {...props}
        id={field.id}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? field.labelId}
        aria-describedby={field.describedBy}
        selectionMode="multiple"
        value={value}
        defaultValue={defaultValue}
        isDisabled={field.disabled}
        isInvalid={field.invalid}
        isRequired={field.required}
        disabledKeys={disabledKeys}
        placeholder={placeholder}
        onChange={(nextValue) =>
          onValueChange?.(nextValue.map((item) => String(item)))
        }
      >
        <AriaButton ref={ref} className={clsx(styles.trigger, styles[size])}>
          <SelectValue<CollectionOption> className={styles.value}>
            {({ isPlaceholder, selectedItems }) =>
              isPlaceholder
                ? placeholder
                : selectedItems
                    .map((item) => item?.label)
                    .filter(Boolean)
                    .join("、")
            }
          </SelectValue>
          <ChevronsUpDown className={styles.chevron} aria-hidden="true" />
        </AriaButton>
        <AriaPopover className={styles.popover} offset={4}>
          <AriaListBox
            className={styles.list}
            renderEmptyState={() => (
              <span className={styles.empty}>{emptyText}</span>
            )}
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
                        <AriaText
                          slot="description"
                          className={styles.description}
                        >
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
        </AriaPopover>
      </AriaSelect>
    );
  },
);
