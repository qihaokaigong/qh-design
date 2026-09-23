import type { HTMLAttributes } from "react";

export type KbdSize = "sm" | "md";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Visual size. Defaults to sm. */
  size?: KbdSize;
}
