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

interface GridBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Space token between rows and columns. Defaults to 4. */
  gap?: LayoutGap;
}

/** Minimum card width in auto mode: sm = 12rem, md = 16rem, lg = 20rem. */
export type GridItemWidth = "sm" | "md" | "lg";

export type GridProps = GridBaseProps &
  (
    | {
        /** Fixed or viewport-responsive column count. @default 1 */
        columns?: GridColumnCount | ResponsiveGridColumns;
        minItemWidth?: never;
      }
    | {
        /** Fit as many columns as the container can comfortably hold. */
        columns: "auto";
        /** Minimum item width; shrinks to one column in smaller containers. @default md */
        minItemWidth?: GridItemWidth;
      }
  );
