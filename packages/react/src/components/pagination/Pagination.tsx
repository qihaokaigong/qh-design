"use client";

import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef } from "react";

import { Button, ButtonLink } from "../button";
import styles from "./Pagination.module.css";
import type {
  PaginationItemAriaLabelContext,
  PaginationProps,
} from "./Pagination.types";

type PageItem = number | "start-ellipsis" | "end-ellipsis";

const range = (start: number, end: number) =>
  Array.from(
    { length: Math.max(0, end - start + 1) },
    (_, index) => start + index,
  );

const normalizeCount = (value: number, fallback: number) =>
  Number.isFinite(value) ? Math.max(0, Math.floor(value)) : fallback;

const getPageItems = (
  totalPages: number,
  page: number,
  boundaryCount: number,
  siblingCount: number,
): PageItem[] => {
  const boundary = Math.min(boundaryCount, totalPages);
  const pages = new Set<number>([
    ...range(1, boundary),
    ...range(Math.max(1, totalPages - boundary + 1), totalPages),
  ]);

  const middleStart = boundary + 1;
  const middleEnd = totalPages - boundary;
  const windowSize = siblingCount * 2 + 1;
  let siblingStart = Math.max(middleStart, page - siblingCount);
  let siblingEnd = Math.min(middleEnd, page + siblingCount);

  if (siblingStart <= middleStart + 1) {
    siblingEnd = Math.min(middleEnd, middleStart + windowSize - 1);
  }

  if (siblingEnd >= middleEnd - 1) {
    siblingStart = Math.max(middleStart, middleEnd - windowSize + 1);
  }

  range(siblingStart, siblingEnd).forEach((item) => pages.add(item));

  const sortedPages = [...pages].sort((a, b) => a - b);
  const items: PageItem[] = [];

  sortedPages.forEach((item, index) => {
    const previous = sortedPages[index - 1];

    if (previous !== undefined && item - previous === 2) {
      items.push(previous + 1);
    } else if (previous !== undefined && item - previous > 2) {
      items.push(index === 1 ? "start-ellipsis" : "end-ellipsis");
    }

    items.push(item);
  });

  return items;
};

const defaultItemAriaLabel = ({
  page,
  selected,
  type,
}: PaginationItemAriaLabelContext) => {
  if (type === "previous") return "上一页";
  if (type === "next") return "下一页";
  return selected ? `第 ${page} 页，当前页` : `前往第 ${page} 页`;
};

const defaultFormatPageStatus = (page: number, totalPages: number) =>
  `第 ${page} / ${totalPages} 页`;

/**
 * Navigates a one-based page collection with compact mobile controls and a
 * wider numbered view. Use getPageHref for URL navigation.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    {
      "aria-label": ariaLabel = "分页导航",
      boundaryCount: boundaryCountProp = 1,
      className,
      disabled = false,
      formatPageStatus = defaultFormatPageStatus,
      getItemAriaLabel = defaultItemAriaLabel,
      getPageHref,
      onPageChange,
      page: pageProp,
      siblingCount: siblingCountProp = 1,
      totalPages: totalPagesProp,
      ...props
    },
    ref,
  ) {
    const totalPages = Math.max(1, normalizeCount(totalPagesProp, 1));
    const page = Math.min(totalPages, Math.max(1, normalizeCount(pageProp, 1)));
    const boundaryCount = normalizeCount(boundaryCountProp, 1);
    const siblingCount = normalizeCount(siblingCountProp, 1);
    const items = getPageItems(totalPages, page, boundaryCount, siblingCount);

    const notifyPageChange = (nextPage: number) => {
      if (!disabled && nextPage !== page) onPageChange?.(nextPage);
    };

    const renderControl = (
      targetPage: number,
      context: PaginationItemAriaLabelContext,
      icon?: "previous" | "next",
    ) => {
      const isBoundaryDisabled =
        disabled ||
        (context.type === "previous" && page === 1) ||
        (context.type === "next" && page === totalPages);
      const content = icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon === "previous" ? <ChevronLeft /> : <ChevronRight />}
        </span>
      ) : (
        targetPage
      );
      const commonProps = {
        "aria-current": context.selected ? ("page" as const) : undefined,
        "aria-label": getItemAriaLabel(context),
        className: styles.control,
        size: "md" as const,
        variant: context.selected ? ("secondary" as const) : ("ghost" as const),
      };

      if (getPageHref && !isBoundaryDisabled) {
        return (
          <ButtonLink
            {...commonProps}
            href={getPageHref(targetPage)}
            onClick={() => notifyPageChange(targetPage)}
          >
            {content}
          </ButtonLink>
        );
      }

      return (
        <Button
          {...commonProps}
          disabled={isBoundaryDisabled}
          onClick={() => notifyPageChange(targetPage)}
        >
          {content}
        </Button>
      );
    };

    return (
      <nav
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        className={clsx(styles.root, className)}
      >
        <ul className={styles.list}>
          <li>
            {renderControl(
              Math.max(1, page - 1),
              {
                type: "previous",
                page: Math.max(1, page - 1),
                selected: false,
              },
              "previous",
            )}
          </li>
          <li className={styles.statusItem}>
            <span
              className={styles.status}
              aria-live="polite"
              aria-atomic="true"
            >
              {formatPageStatus(page, totalPages)}
            </span>
          </li>
          {items.map((item) =>
            typeof item === "number" ? (
              <li className={styles.pageItem} key={item}>
                {renderControl(item, {
                  type: "page",
                  page: item,
                  selected: item === page,
                })}
              </li>
            ) : (
              <li className={styles.ellipsisItem} key={item} aria-hidden="true">
                <span className={styles.ellipsis}>…</span>
              </li>
            ),
          )}
          <li>
            {renderControl(
              Math.min(totalPages, page + 1),
              {
                type: "next",
                page: Math.min(totalPages, page + 1),
                selected: false,
              },
              "next",
            )}
          </li>
        </ul>
      </nav>
    );
  },
);
