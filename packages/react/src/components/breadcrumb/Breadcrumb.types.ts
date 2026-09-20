import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface BreadcrumbItem {
  /** Stable identifier used when the path changes. */
  id: string;
  /** Visible item label. */
  label: ReactNode;
  /** Destination for an ancestor or for an interactive current page. */
  href?: string;
  /** Native anchor attributes for linked items. */
  linkProps?: Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "aria-current" | "children" | "className" | "href"
  >;
}

export interface BreadcrumbProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Ordered path from the highest ancestor to the current page. */
  items: readonly BreadcrumbItem[];
  /** Decorative separator rendered between path items. */
  separator?: ReactNode;
  /** Accessible name for the mobile control that reveals collapsed ancestors. */
  expandLabel?: string;
  /** Shows the complete mobile path initially. @default false */
  defaultExpanded?: boolean;
}
