import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./PageContainer.module.css";
import type { PageContainerProps } from "./PageContainer.types";

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  function PageContainer({ className, maxWidth = "content", ...props }, ref) {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(styles.root, styles[maxWidth], className)}
      />
    );
  },
);
