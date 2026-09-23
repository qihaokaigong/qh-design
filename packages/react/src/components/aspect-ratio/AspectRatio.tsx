import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./AspectRatio.module.css";
import type { AspectRatioProps } from "./AspectRatio.types";

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio(
    { className, fit = "cover", ratio = 16 / 9, style, ...props },
    ref,
  ) {
    if (!Number.isFinite(ratio) || ratio <= 0) {
      throw new RangeError(
        "AspectRatio ratio must be a positive finite number.",
      );
    }

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(styles.root, styles[fit], className)}
        style={{ ...style, aspectRatio: ratio }}
        data-fit={fit}
      />
    );
  },
);
