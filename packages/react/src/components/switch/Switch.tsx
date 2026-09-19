"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./Switch.module.css";
import type { SwitchProps } from "./Switch.types";

export const Switch = forwardRef<
  ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(function Switch(
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
      <SwitchPrimitive.Root
        {...props}
        ref={ref}
        id={field.id}
        className={styles.root}
        disabled={field.disabled}
        required={field.required}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
        data-invalid={field.invalid || undefined}
      >
        <SwitchPrimitive.Thumb className={styles.thumb} />
      </SwitchPrimitive.Root>
      <span>{children}</span>
    </label>
  );
});
