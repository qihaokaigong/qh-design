"use client";

import { ChevronRight, MoreHorizontal } from "lucide-react";
import { clsx } from "clsx";
import { forwardRef, Fragment, useState } from "react";

import styles from "./Breadcrumb.module.css";
import type { BreadcrumbItem, BreadcrumbProps } from "./Breadcrumb.types";

/**
 * Shows the current page's hierarchical location. Ancestors are links and the
 * final item is announced as the current page.
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    {
      "aria-label": ariaLabel = "面包屑导航",
      className,
      defaultExpanded = false,
      expandLabel = "显示完整路径",
      items,
      separator,
      ...props
    },
    ref,
  ) {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const lastIndex = items.length - 1;
    const canCollapse = items.length > 3;
    const separatorContent = separator ?? (
      <ChevronRight className={styles.separatorIcon} />
    );

    const renderSeparator = () => (
      <span className={styles.separator} aria-hidden="true">
        {separatorContent}
      </span>
    );

    const renderItem = (item: BreadcrumbItem, index: number) => {
      const current = index === lastIndex;
      const content = item.href ? (
        <a
          {...item.linkProps}
          href={item.href}
          aria-current={current ? "page" : undefined}
          className={clsx(styles.crumb, styles.link, current && styles.current)}
        >
          {item.label}
        </a>
      ) : (
        <span
          aria-current={current ? "page" : undefined}
          className={clsx(styles.crumb, current && styles.current)}
        >
          {item.label}
        </span>
      );

      return (
        <li
          className={styles.item}
          data-collapsible={
            canCollapse && index > 0 && index < lastIndex ? "true" : undefined
          }
        >
          {index > 0 ? renderSeparator() : null}
          {content}
        </li>
      );
    };

    return (
      <nav
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        className={clsx(styles.root, className)}
      >
        <ol className={styles.list} data-expanded={expanded || undefined}>
          {items.map((item, index) => (
            <Fragment key={item.id}>
              {index === 1 && canCollapse && !expanded ? (
                <li className={styles.ellipsisItem}>
                  {renderSeparator()}
                  <button
                    type="button"
                    className={styles.expandButton}
                    aria-label={expandLabel}
                    onClick={() => setExpanded(true)}
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </button>
                </li>
              ) : null}
              {renderItem(item, index)}
            </Fragment>
          ))}
        </ol>
      </nav>
    );
  },
);
