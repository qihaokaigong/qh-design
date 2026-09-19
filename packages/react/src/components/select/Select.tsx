"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./Select.module.css";
import type { SelectProps } from "./Select.types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      "aria-describedby": ariaDescribedBy,
      className,
      disabled,
      id,
      invalid,
      required,
      size = "md",
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
      <select
        {...props}
        ref={ref}
        id={field.id}
        className={clsx(styles.root, styles[size], className)}
        disabled={field.disabled}
        required={field.required}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
      />
    );
  },
);
