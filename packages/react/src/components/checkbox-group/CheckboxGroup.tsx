"use client";

import { clsx } from "clsx";
import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
} from "react";

import { Checkbox } from "../checkbox";
import { useFieldsetContext } from "../fieldset/Fieldset";
import styles from "./CheckboxGroup.module.css";
import type {
  CheckboxGroupItemProps,
  CheckboxGroupProps,
} from "./CheckboxGroup.types";

interface CheckboxGroupContextValue {
  disabled: boolean;
  invalid: boolean;
  name?: string;
  selectedValues: readonly string[];
  setItemChecked: (value: string, checked: boolean) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
  null,
);

const CheckboxGroupRoot = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  function CheckboxGroupRoot(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      children,
      className,
      defaultValue = [],
      disabled,
      invalid,
      name,
      onValueChange,
      value,
      ...props
    },
    ref,
  ) {
    const fieldset = useFieldsetContext();
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const selectedValues = value ?? uncontrolledValue;
    const isDisabled = disabled ?? fieldset?.disabled ?? false;
    const isInvalid = invalid ?? fieldset?.invalid ?? false;
    const describedBy = [
      fieldset?.descriptionId,
      isInvalid ? fieldset?.errorId : undefined,
      ariaDescribedBy,
    ].filter(Boolean);

    const context = useMemo<CheckboxGroupContextValue>(
      () => ({
        disabled: isDisabled,
        invalid: isInvalid,
        name,
        selectedValues,
        setItemChecked(itemValue, checked) {
          const nextValue = checked
            ? selectedValues.includes(itemValue)
              ? [...selectedValues]
              : [...selectedValues, itemValue]
            : selectedValues.filter(
                (currentValue) => currentValue !== itemValue,
              );

          if (value === undefined) setUncontrolledValue(nextValue);
          onValueChange?.(nextValue);
        },
      }),
      [isDisabled, isInvalid, name, onValueChange, selectedValues, value],
    );

    return (
      <CheckboxGroupContext.Provider value={context}>
        <div
          {...props}
          ref={ref}
          role="group"
          className={clsx(styles.root, className)}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? fieldset?.legendId}
          aria-describedby={
            describedBy.length ? describedBy.join(" ") : undefined
          }
          data-disabled={isDisabled || undefined}
          data-invalid={isInvalid || undefined}
        >
          {children}
        </div>
      </CheckboxGroupContext.Provider>
    );
  },
);

const CheckboxGroupItem = forwardRef<HTMLButtonElement, CheckboxGroupItemProps>(
  function CheckboxGroupItem({ disabled, value, ...props }, ref) {
    const group = useContext(CheckboxGroupContext);
    if (!group) {
      throw new Error("CheckboxGroup.Item must be used within CheckboxGroup.");
    }

    const checked = group.selectedValues.includes(value);

    return (
      <Checkbox
        {...props}
        ref={ref}
        name={group.name}
        value={value}
        checked={checked}
        disabled={disabled ?? group.disabled}
        invalid={group.invalid}
        onCheckedChange={(nextChecked) =>
          group.setItemChecked(value, nextChecked === true)
        }
      />
    );
  },
);

export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Item: CheckboxGroupItem,
});
