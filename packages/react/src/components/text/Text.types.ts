import type { HTMLAttributes } from "react";

export type TextElement = "div" | "p" | "span";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextTone = "default" | "muted" | "danger" | "success" | "warning";
export type TextWeight = "regular" | "medium" | "semibold";
export type TextVariant = "body" | "ui";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Semantic element. Defaults to span. */
  as?: TextElement;
  /** Text size from the QH type scale. Defaults to md. */
  size?: TextSize;
  /** Semantic text color. Defaults to default. */
  tone?: TextTone;
  /** Font weight from the QH type scale. Defaults to regular. */
  weight?: TextWeight;
  /** Typography role. body preserves reading line-height; ui uses the tighter UI rhythm. Defaults to body. */
  variant?: TextVariant;
}
