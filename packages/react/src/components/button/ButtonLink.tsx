"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { buttonVariants } from "./button.variants";
import styles from "./Button.module.css";
import type { ButtonLinkProps } from "./Button.types";

/**
 * Navigates to a URL while using the visual hierarchy of a button.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    { children, className, iconEnd, iconStart, size, variant, ...props },
    ref,
  ) {
    return (
      <a
        {...props}
        ref={ref}
        className={clsx(buttonVariants({ variant, size }), className)}
      >
        <span className={styles.content}>
          {iconStart ? <span className={styles.icon}>{iconStart}</span> : null}
          <span>{children}</span>
          {iconEnd ? <span className={styles.icon}>{iconEnd}</span> : null}
        </span>
      </a>
    );
  },
);
