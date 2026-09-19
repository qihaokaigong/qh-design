"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { useFieldControl } from "../field/useFieldControl";
import styles from "./Textarea.module.css";
import type { TextareaProps } from "./Textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
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
      <textarea
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
