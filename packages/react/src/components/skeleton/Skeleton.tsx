import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Skeleton.module.css";
import type { SkeletonProps } from "./Skeleton.types";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(
    { animated = true, className, variant = "text", ...props },
    ref,
  ) {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(
          styles.root,
          styles[variant],
          animated && styles.animated,
          className,
        )}
        aria-hidden="true"
      />
    );
  },
);
