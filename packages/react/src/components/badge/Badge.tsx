import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Badge.module.css";
import type { BadgeProps } from "./Badge.types";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone = "neutral", ...props },
  ref,
) {
  return (
    <span
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[tone], className)}
    />
  );
});
