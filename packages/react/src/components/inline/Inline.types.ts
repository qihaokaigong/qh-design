import type { HTMLAttributes } from "react";

import type { LayoutGap } from "../stack";

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  /** Cross-axis alignment. Defaults to center. */
  align?: "start" | "center" | "end" | "stretch";
  /** Space token between children. Defaults to 3. */
  gap?: LayoutGap;
  /** Main-axis distribution. Defaults to start. */
  justify?: "start" | "center" | "end" | "between";
  /** Allows children to move onto another line. Defaults to true. */
  wrap?: boolean;
}
