"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { Button } from "../button";
import styles from "./IconButton.module.css";
import type { IconButtonProps } from "./IconButton.types";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { children, className, loading, size = "md", ...props },
    ref,
  ) {
    return (
      <Button
        {...props}
        ref={ref}
        className={clsx(styles.root, className)}
        data-size={size}
        loading={loading}
        size={size}
      >
        <span className={styles.icon} aria-hidden="true">
          {children}
        </span>
      </Button>
    );
  },
);
