import type { VariantProps } from "class-variance-authority";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import type { buttonVariants } from "./button.variants";

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariantProps {
  /** Shows progress, prevents activation, and preserves the original content width. */
  loading?: boolean;
  /** Optional progress text announced and displayed while loading. */
  loadingText?: string;
  /** Decorative or labelled icon rendered before the content. */
  iconStart?: ReactNode;
  /** Decorative or labelled icon rendered after the content. */
  iconEnd?: ReactNode;
}

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">,
    ButtonVariantProps {
  /** Decorative or labelled icon rendered before the content. */
  iconStart?: ReactNode;
  /** Decorative or labelled icon rendered after the content. */
  iconEnd?: ReactNode;
}
