import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./EmptyState.module.css";
import type { EmptyStateProps } from "./EmptyState.types";

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    { action, className, description, icon, title, ...props },
    ref,
  ) {
    return (
      <div {...props} ref={ref} className={clsx(styles.root, className)}>
        {icon ? (
          <div className={styles.icon} aria-hidden="true">
            {icon}
          </div>
        ) : null}
        <h3 className={styles.title}>{title}</h3>
        {description ? (
          <p className={styles.description}>{description}</p>
        ) : null}
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
    );
  },
);
