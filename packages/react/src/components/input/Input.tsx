"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldControl } from "../field/useFieldControl";
import { useInputGroupContext } from "../input-group/InputGroupContext";
import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    "aria-describedby": ariaDescribedBy,
    className,
    disabled,
    id,
    invalid,
    required,
    size,
    ...props
  },
  ref,
) {
  const group = useInputGroupContext();
  const resolvedSize = size ?? group?.size ?? "md";
  const field = useFieldControl({
    describedBy: ariaDescribedBy,
    disabled: disabled || group?.disabled,
    id,
    invalid: invalid || group?.invalid,
    required: required || group?.required,
  });

  return (
    <input
      {...props}
      ref={ref}
      id={field.id}
      className={clsx(
        styles.root,
        styles[resolvedSize],
        group && styles.grouped,
        className,
      )}
      data-input-group-control={group ? "" : undefined}
      disabled={field.disabled}
      required={field.required}
      aria-invalid={field.invalid || undefined}
      aria-describedby={field.describedBy}
    />
  );
});
