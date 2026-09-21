import type { ReactNode } from "react";

import type { ButtonProps } from "../button";

type IconButtonBaseProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "iconEnd" | "iconStart" | "loadingText"
> & {
  /** Decorative icon. It is hidden from the accessibility tree. */
  children: ReactNode;
};

type IconOnlyButtonProps = {
  /** Required accessible name when no visible label is provided. */
  "aria-label": string;
  label?: never;
};

type LabelledIconButtonProps = {
  /** Visible text rendered inline after the icon. */
  label: ReactNode;
  /** Optional accessible name when more context than the visible label is needed. */
  "aria-label"?: string;
};

/**
 * An icon action that stays square by default and expands when a visible label
 * is provided.
 */
export type IconButtonProps = IconButtonBaseProps &
  (IconOnlyButtonProps | LabelledIconButtonProps);
