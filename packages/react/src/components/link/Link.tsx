import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Link.module.css";
import type { LinkProps } from "./Link.types";

/** Navigates to a URL using the inline-link visual treatment. */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, className, underline = "always", ...props },
  ref,
) {
  return (
    <a
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[underline], className)}
    >
      {children}
    </a>
  );
});
