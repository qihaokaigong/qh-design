"use client";

import { AccessibleIcon as AccessibleIconPrimitive } from "radix-ui";
import { clsx } from "clsx";

import styles from "./AccessibleIcon.module.css";
import type { AccessibleIconProps } from "./AccessibleIcon.types";

export function AccessibleIcon({
  children,
  className,
  label,
  size = "md",
  ...props
}: AccessibleIconProps) {
  return (
    <span {...props} className={clsx(styles.root, styles[size], className)}>
      <AccessibleIconPrimitive.Root label={label}>
        {children}
      </AccessibleIconPrimitive.Root>
    </span>
  );
}
