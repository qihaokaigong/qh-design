import type { HTMLAttributes } from "react";

export type DataListLayout = "responsive" | "stacked";

export interface DataListProps extends HTMLAttributes<HTMLDListElement> {
  /** Item layout. Responsive stacks on narrow screens and aligns labels on wider screens. */
  layout?: DataListLayout;
}

export type DataListItemProps = HTMLAttributes<HTMLDivElement>;
export type DataListLabelProps = HTMLAttributes<HTMLElement>;
export type DataListValueProps = HTMLAttributes<HTMLElement>;
