"use client";

import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./Checkbox.module.css";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = forwardRef<
  ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(function Checkbox(
  {
    "aria-describedby": ariaDescribedBy,
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
    <label
      className={clsx(styles.label, className)}
      data-disabled={field.disabled || undefined}
    >
      <CheckboxPrimitive.Root
        {...props}
        ref={ref}
        id={field.id}
        className={styles.control}
        disabled={field.disabled}
        required={field.required}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        data-invalid={field.invalid || undefined}
      >
        <CheckboxPrimitive.Indicator className={styles.indicator}>
          <Check
            className={clsx(styles.icon, styles.checkIcon)}
            aria-hidden="true"
          />
          <Minus
            className={clsx(styles.icon, styles.minusIcon)}
            aria-hidden="true"
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{children}</span>
    </label>
  );
});
