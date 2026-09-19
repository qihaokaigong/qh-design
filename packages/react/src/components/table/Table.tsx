import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Table.module.css";
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
} from "./Table.types";

const TableRoot = forwardRef<HTMLTableElement, TableProps>(function TableRoot(
  {
    className,
    minWidth = "auto",
    scrollContainerLabel = "可横向滚动的表格",
    ...props
  },
  ref,
) {
  return (
    <div
      aria-label={scrollContainerLabel}
      className={styles.container}
      role="region"
      tabIndex={0}
    >
      <table
        {...props}
        ref={ref}
        className={clsx(styles.table, styles[minWidth], className)}
      />
    </div>
  );
});

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <thead {...props} ref={ref} className={clsx(styles.header, className)} />
    );
  },
);

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  function TableBody({ className, ...props }, ref) {
    return (
      <tbody {...props} ref={ref} className={clsx(styles.body, className)} />
    );
  },
);

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  function TableFooter({ className, ...props }, ref) {
    return (
      <tfoot {...props} ref={ref} className={clsx(styles.footer, className)} />
    );
  },
);

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  function TableRow({ className, ...props }, ref) {
    return <tr {...props} ref={ref} className={clsx(styles.row, className)} />;
  },
);

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  function TableHead({ className, numeric, scope = "col", ...props }, ref) {
    return (
      <th
        {...props}
        ref={ref}
        scope={scope}
        className={clsx(styles.head, numeric && styles.numeric, className)}
      />
    );
  },
);

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  function TableCell({ className, numeric, ...props }, ref) {
    return (
      <td
        {...props}
        ref={ref}
        className={clsx(styles.cell, numeric && styles.numeric, className)}
      />
    );
  },
);

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  function TableCaption({ className, ...props }, ref) {
    return (
      <caption
        {...props}
        ref={ref}
        className={clsx(styles.caption, className)}
      />
    );
  },
);

export const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
});
