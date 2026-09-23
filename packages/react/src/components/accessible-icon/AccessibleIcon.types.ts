import type { HTMLAttributes, ReactElement } from "react";

export interface AccessibleIconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** A single visual icon. It is hidden from assistive technology. */
  children: ReactElement;
  /** Accessible name announced in place of the visual icon. */
  label: string;
  /** Icon dimensions from the QH icon scale. Defaults to md. */
  size?: "sm" | "md" | "lg";
}
