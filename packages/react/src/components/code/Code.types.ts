import type { HTMLAttributes } from "react";

export type CodeProps = HTMLAttributes<HTMLElement>;

export interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  /** Accessible name for the scrollable code region. Defaults to 代码片段. */
  label?: string;
  /** Wraps long lines instead of scrolling horizontally. */
  wrap?: boolean;
}
