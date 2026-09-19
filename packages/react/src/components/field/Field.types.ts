import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Disables controls that consume this Field state. */
  disabled?: boolean;
  /** Marks the field and its error message as invalid. */
  invalid?: boolean;
  /** Marks controls in the field as required. */
  required?: boolean;
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Optional content displayed after the label text. */
  children: ReactNode;
}

export type FieldDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type FieldErrorProps = HTMLAttributes<HTMLParagraphElement>;

export interface FieldContextValue {
  controlId: string;
  descriptionId: string;
  disabled: boolean;
  errorId: string;
  invalid: boolean;
  labelId: string;
  required: boolean;
}
