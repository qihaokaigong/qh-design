import type { HTMLAttributes } from "react";

export type AspectRatioFit = "cover" | "contain";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** Width divided by height. Defaults to 16 / 9. */
  ratio?: number;
  /** How direct image or video children fill the frame. Defaults to cover. */
  fit?: AspectRatioFit;
}
