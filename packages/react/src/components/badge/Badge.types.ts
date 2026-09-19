import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color. Defaults to neutral. */
  tone?: "neutral" | "info" | "success" | "warning" | "danger";
}
