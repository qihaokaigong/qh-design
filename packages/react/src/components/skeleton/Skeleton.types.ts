import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Enables the loading shimmer. Defaults to true. */
  animated?: boolean;
  /** Shape preset. Defaults to text. */
  variant?: "text" | "rectangular" | "circular";
}
