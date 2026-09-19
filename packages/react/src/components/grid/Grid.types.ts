import type { HTMLAttributes } from "react";

import type { LayoutGap } from "../stack";

export type GridColumnCount = 1 | 2 | 3 | 4 | 5 | 6;

export interface ResponsiveGridColumns {
  /** Mobile-first column count. Defaults to 1. */
  base?: GridColumnCount;
  /** Column count from 768px. */
  md?: GridColumnCount;
  /** Column count from 1024px. */
  lg?: GridColumnCount;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Fixed or responsive column count. */
  columns?: GridColumnCount | ResponsiveGridColumns;
  /** Space token between rows and columns. Defaults to 4. */
  gap?: LayoutGap;
}
