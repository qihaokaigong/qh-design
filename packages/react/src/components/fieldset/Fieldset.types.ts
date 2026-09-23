import type { FieldsetHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface FieldsetProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "aria-invalid"> {
  /** Marks the group and its error message as invalid. */
  invalid?: boolean;
  /** Marks the group as requiring a selection. Validation remains application-owned. */
  required?: boolean;
}

export interface FieldsetLegendProps extends HTMLAttributes<HTMLLegendElement> {
  /** Visible group name. */
  children: ReactNode;
}

export type FieldsetDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type FieldsetErrorProps = HTMLAttributes<HTMLParagraphElement>;

export interface FieldsetContextValue {
  descriptionId: string;
  disabled: boolean;
  errorId: string;
  invalid: boolean;
  legendId: string;
  required: boolean;
}
