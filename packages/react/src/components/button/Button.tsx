"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

import { buttonVariants } from "./button.variants";
import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

/**
 * Triggers an in-page action. Use ButtonLink when the destination has a URL.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      disabled,
      iconEnd,
      iconStart,
      loading = false,
      loadingText,
      size,
      type = "button",
      variant,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        className={clsx(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
      >
        <span className={clsx(styles.content, loading && styles.contentHidden)}>
          {iconStart ? <span className={styles.icon}>{iconStart}</span> : null}
          <span>{children}</span>
          {iconEnd ? <span className={styles.icon}>{iconEnd}</span> : null}
        </span>
        {loading ? (
          <span className={styles.loadingIndicator} aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            {loadingText ? (
              <span>{loadingText}</span>
            ) : (
              <span className={styles.srOnly}>加载中</span>
            )}
          </span>
        ) : null}
      </button>
    );
  },
);
