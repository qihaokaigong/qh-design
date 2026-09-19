"use client";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { clsx } from "clsx";
import { createContext, forwardRef, useContext } from "react";
import type { ComponentRef } from "react";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./RadioGroup.module.css";
import type { RadioGroupItemProps, RadioGroupProps } from "./RadioGroup.types";

const RadioGroupStateContext = createContext({ disabled: false });

const RadioGroupRoot = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(function RadioGroupRoot(
  {
    "aria-describedby": ariaDescribedBy,
    "aria-labelledby": ariaLabelledBy,
    children,
    className,
    disabled,
    id,
    invalid,
    required,
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

  return (
    <RadioGroupStateContext.Provider
      value={{ disabled: field.disabled ?? false }}
    >
      <RadioGroupPrimitive.Root
        {...props}
        ref={ref}
        id={field.id}
        className={clsx(styles.root, className)}
        disabled={field.disabled}
        required={field.required}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        aria-labelledby={ariaLabelledBy ?? field.labelId}
        data-invalid={field.invalid || undefined}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </RadioGroupStateContext.Provider>
  );
});

const RadioGroupItem = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(function RadioGroupItem({ children, className, disabled, ...props }, ref) {
  const group = useContext(RadioGroupStateContext);
  const isDisabled = disabled ?? group.disabled;

  return (
    <label
      className={clsx(styles.itemLabel, className)}
      data-disabled={isDisabled || undefined}
    >
      <RadioGroupPrimitive.Item
        {...props}
        ref={ref}
        disabled={isDisabled}
        className={styles.item}
      >
        <RadioGroupPrimitive.Indicator className={styles.indicator} />
      </RadioGroupPrimitive.Item>
      <span>{children}</span>
    </label>
  );
});

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
