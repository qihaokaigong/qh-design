import type { HTMLAttributes, ReactNode } from "react";

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional action or link displayed after the message. */
  action?: ReactNode;
  /** Optional short heading for the message. */
  title?: ReactNode;
  /** Semantic message tone. Defaults to info. */
  tone?: "info" | "success" | "warning" | "danger";
}
