"use client";

import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./Select.module.css";
import type { SelectProps } from "./Select.types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      "aria-describedby": ariaDescribedBy,
      className,
      dir,
      disabled,
      id,
      invalid,
      multiple,
      required,
      size = "md",
      style,
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
      <div
        className={clsx(styles.container, className)}
        dir={dir}
        style={style}
      >
        <select
          {...props}
          ref={ref}
          id={field.id}
          dir={dir}
          className={clsx(styles.root, styles[size])}
          disabled={field.disabled}
          multiple={multiple}
          required={field.required}
          aria-invalid={field.invalid || undefined}
          aria-describedby={field.describedBy}
        />
        {!multiple ? (
          <ChevronDown
            aria-hidden="true"
            className={styles.indicator}
            focusable="false"
          />
        ) : null}
      </div>
    );
  },
);
