import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Stack.module.css";
import type { StackProps } from "./Stack.types";

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { align = "stretch", className, gap = "4", ...props },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        styles.root,
        styles[`gap${gap}`],
        styles[align],
        className,
      )}
    />
  );
});
