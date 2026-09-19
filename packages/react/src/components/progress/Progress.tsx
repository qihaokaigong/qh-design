"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef, CSSProperties } from "react";

import styles from "./Progress.module.css";
import type { ProgressProps } from "./Progress.types";

type ProgressStyle = CSSProperties & { "--qh-progress-value": number };

export const Progress = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(
  { className, label, max = 100, showValue = false, value, ...props },
  ref,
) {
  const normalizedValue =
    value === null ? 0 : Math.min(Math.max(value, 0), Number(max));
  const percentage = Math.round((normalizedValue / Number(max)) * 100);
  const indicatorStyle: ProgressStyle = {
    "--qh-progress-value": percentage,
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.header}>
        <span>{label}</span>
        {showValue && value !== null ? (
          <span className={styles.value}>{percentage}%</span>
        ) : null}
      </div>
      <ProgressPrimitive.Root
        {...props}
        ref={ref}
        className={styles.root}
        max={max}
        value={value}
        aria-label={label}
      >
        <ProgressPrimitive.Indicator
          className={styles.indicator}
          style={indicatorStyle}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});
