import type { AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Underline treatment. Defaults to always. */
  underline?: "always" | "hover";
}
