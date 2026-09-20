import type { HTMLAttributes } from "react";

export type PaginationItemType = "previous" | "page" | "next";

export interface PaginationItemAriaLabelContext {
  /** Kind of pagination control being labelled. */
  type: PaginationItemType;
  /** One-based page that the control represents. */
  page: number;
  /** Whether the control represents the current page. */
  selected: boolean;
}

interface PaginationBaseProps
  extends Omit<HTMLAttributes<HTMLElement>, "children" | "onChange"> {
  /** Current page, using one-based numbering. Values outside the range are clamped. */
  page: number;
  /** Total number of pages. Must be at least 1. */
  totalPages: number;
  /** Number of always-visible pages at each edge. @default 1 */
  boundaryCount?: number;
  /** Number of pages shown on each side of the current page. @default 1 */
  siblingCount?: number;
  /** Disables every pagination control. @default false */
  disabled?: boolean;
  /** Creates accessible labels for page, previous, and next controls. */
  getItemAriaLabel?: (context: PaginationItemAriaLabelContext) => string;
  /** Formats the compact mobile page status. */
  formatPageStatus?: (page: number, totalPages: number) => string;
}

export interface PaginationButtonProps extends PaginationBaseProps {
  /** Called with a one-based page after a button control is activated. */
  onPageChange: (page: number) => void;
  getPageHref?: never;
}

export interface PaginationLinkProps extends PaginationBaseProps {
  /** Returns the URL for a one-based page and switches controls to links. */
  getPageHref: (page: number) => string;
  /** Optional notification fired before link navigation. */
  onPageChange?: (page: number) => void;
}

/**
 * Pagination is button-based when onPageChange is provided and link-based when
 * getPageHref is provided. Link mode is preferred when every page has a URL.
 */
export type PaginationProps = PaginationButtonProps | PaginationLinkProps;
