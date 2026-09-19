import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

export type TableMinWidth = "auto" | "sm" | "md" | "lg";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Minimum table width. Use md or lg when columns must scroll on narrow screens. */
  minWidth?: TableMinWidth;
  /** Accessible name for the keyboard-focusable horizontal scroll region. */
  scrollContainerLabel?: string;
}

export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Aligns tabular numeric content to the inline end. */
  numeric?: boolean;
}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Aligns tabular numeric content to the inline end. */
  numeric?: boolean;
}
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
