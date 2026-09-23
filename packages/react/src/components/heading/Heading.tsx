import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Heading.module.css";
import type { HeadingProps, HeadingSize } from "./Heading.types";

const defaultSizes: Record<HeadingProps["level"], HeadingSize> = {
  1: "xl",
  2: "lg",
  3: "md",
  4: "sm",
  5: "sm",
  6: "sm",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading(
    { className, level, size = defaultSizes[level], ...props },
    ref,
  ) {
    const Component = `h${level}` as const;

    return (
      <Component
        {...props}
        ref={ref}
        className={clsx(styles.root, styles[size], className)}
      />
    );
  },
);
