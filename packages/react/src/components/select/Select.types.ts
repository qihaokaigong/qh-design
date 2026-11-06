import type { SelectHTMLAttributes } from "react";

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "color" | "size"> {
  /** Layout class for the outer container. Native attributes and ref target the select. */
  className?: string;
  /** Layout styles for the outer container, such as width or maxWidth. */
  style?: SelectHTMLAttributes<HTMLSelectElement>["style"];
  /** Marks the select as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: "sm" | "md" | "lg";
}
