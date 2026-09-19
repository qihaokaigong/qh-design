import type { HTMLAttributes } from "react";

export type LayoutGap = "1" | "2" | "3" | "4" | "6" | "8";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Cross-axis alignment. Defaults to stretch. */
  align?: "start" | "center" | "end" | "stretch";
  /** Space token between children. Defaults to 4. */
  gap?: LayoutGap;
}
