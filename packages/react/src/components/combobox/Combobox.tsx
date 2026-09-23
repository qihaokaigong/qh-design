"use client";

import { clsx } from "clsx";
import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef } from "react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  Input as AriaInput,
  ListBox as AriaListBox,
  ListBoxItem,
  Popover as AriaPopover,
  Text as AriaText,
} from "react-aria-components/ComboBox";
import { Group as AriaGroup } from "react-aria-components/Group";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./Combobox.module.css";
import type { ComboboxProps } from "./Combobox.types";

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  function Combobox(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className,
      defaultInputValue,
      defaultValue,
      disabled,
      emptyText = "无匹配选项",
      id,
      inputValue,
      invalid,
      onInputValueChange,
      onValueChange,
      openLabel = "显示选项",
      options,
      placeholder,
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
      <AriaComboBox
        {...props}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? field.labelId}
        aria-describedby={field.describedBy}
        value={value}
        defaultValue={defaultValue}
        inputValue={inputValue}
        defaultInputValue={defaultInputValue}
        isDisabled={field.disabled}
        isInvalid={field.invalid}
        isRequired={field.required}
        disabledKeys={disabledKeys}
        onChange={(nextValue) =>
          onValueChange?.(nextValue === null ? null : String(nextValue))
        }
        onInputChange={onInputValueChange}
      >
        <AriaGroup className={clsx(styles.control, styles[size])}>
          <AriaInput
            ref={ref}
            id={field.id}
            className={styles.input}
            placeholder={placeholder}
          />
          <AriaButton className={styles.trigger} aria-label={openLabel}>
            <ChevronsUpDown aria-hidden="true" />
          </AriaButton>
        </AriaGroup>
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
      </AriaComboBox>
    );
  },
);
