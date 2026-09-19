import type { SelectHTMLAttributes } from "react";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "color" | "size"> {
  /** Marks the select as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: "sm" | "md" | "lg";
}
