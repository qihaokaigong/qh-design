import type { HTMLAttributes } from "react";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "sm" | "md" | "lg" | "xl";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level. Required so document hierarchy is intentional. */
  level: HeadingLevel;
  /** Visual size. Defaults according to level: h1 xl, h2 lg, h3 md, h4-h6 sm. */
  size?: HeadingSize;
}
