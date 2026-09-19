import type { ReactNode } from "react";

import type { ButtonProps } from "../button";

export interface IconButtonProps
  extends Omit<
    ButtonProps,
    "aria-label" | "children" | "iconEnd" | "iconStart" | "loadingText"
  > {
  /** Required accessible name for the icon-only action. */
  "aria-label": string;
  /** Decorative icon. It is hidden from the accessibility tree. */
  children: ReactNode;
}
