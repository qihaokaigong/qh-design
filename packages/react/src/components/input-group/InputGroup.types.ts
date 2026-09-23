import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import type { InputGroupSize } from "./InputGroupContext";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Disables the input and actions in the group. Inherits from Field when omitted. */
  disabled?: boolean;
  /** Marks the grouped input as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Marks the grouped input as required. Inherits from Field when omitted. */
  required?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: InputGroupSize;
}

export interface InputGroupAddonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Icon, unit, prefix, or suffix displayed beside the input. */
  children: ReactNode;
}

export interface InputGroupActionProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> {
  /** Required accessible name for the icon-only action. */
  "aria-label": string;
  /** Decorative action icon. */
  children: ReactNode;
}

export type { InputGroupSize } from "./InputGroupContext";
