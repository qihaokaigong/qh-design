import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Text.module.css";
import type { TextProps } from "./Text.types";

export const Text = forwardRef<HTMLElement, TextProps>(function Text(
  {
    as: Component = "span",
    className,
    size = "md",
    tone = "default",
    weight = "regular",
    ...props
  },
  ref,
) {
  return (
    <Component
      {...props}
      ref={ref as never}
      className={clsx(
        styles.root,
        styles[size],
        styles[tone],
        styles[weight],
        className,
      )}
    />
  );
});
