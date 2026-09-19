import { forwardRef } from "react";

import styles from "./VisuallyHidden.module.css";
import type { VisuallyHiddenProps } from "./VisuallyHidden.types";

/** Visually hides content while keeping it available to assistive technology. */
export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden({ className, ...props }, ref) {
    return (
      <span
        {...props}
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
      />
    );
  },
);
