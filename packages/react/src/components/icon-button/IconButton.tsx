"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { Button } from "../button";
import styles from "./IconButton.module.css";
import type { IconButtonProps } from "./IconButton.types";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { children, className, label, loading, size = "md", ...props },
    ref,
  ) {
    const hasLabel = label !== undefined && label !== null;
    const icon = (
      <span className={styles.icon} aria-hidden="true">
        {children}
      </span>
    );

    return (
      <Button
        {...props}
        ref={ref}
        className={clsx(styles.root, className)}
        data-has-label={hasLabel || undefined}
        data-size={size}
        iconStart={hasLabel ? icon : undefined}
        loading={loading}
        size={size}
      >
        {hasLabel ? label : icon}
      </Button>
    );
  },
);
