import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Inline.module.css";
import type { InlineProps } from "./Inline.types";

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  {
    align = "center",
    className,
    gap = "3",
    justify = "start",
    wrap = true,
    ...props
  },
  ref,
) {
  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        styles.root,
        styles[wrap ? "wrap" : "nowrap"],
        styles[`gap${gap}`],
        styles[`align${capitalize(align)}`],
        styles[`justify${capitalize(justify)}`],
        className,
      )}
    />
  );
});
