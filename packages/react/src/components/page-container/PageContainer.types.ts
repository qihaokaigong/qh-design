import type { HTMLAttributes } from "react";

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum content width. Defaults to content. */
  maxWidth?: "reading" | "content" | "full";
}
