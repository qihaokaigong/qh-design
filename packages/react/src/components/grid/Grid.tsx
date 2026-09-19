import { clsx } from "clsx";
import { forwardRef } from "react";
import type { CSSProperties } from "react";

import styles from "./Grid.module.css";
import type { GridProps, ResponsiveGridColumns } from "./Grid.types";

interface GridStyle extends CSSProperties {
  "--qh-grid-columns-base": number;
  "--qh-grid-columns-lg"?: number;
  "--qh-grid-columns-md"?: number;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { className, columns = 1, gap = "4", style, ...props },
  ref,
) {
  const responsive: ResponsiveGridColumns =
    typeof columns === "number" ? { base: columns } : columns;
  const gridStyle: GridStyle = {
    "--qh-grid-columns-base": responsive.base ?? 1,
    "--qh-grid-columns-lg": responsive.lg,
    "--qh-grid-columns-md": responsive.md,
    ...style,
  };

  return (
    <div
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[`gap${gap}`], className)}
      style={gridStyle}
    />
  );
});
