import { clsx } from "clsx";
import { forwardRef } from "react";

import styles from "./Kbd.module.css";
import type { KbdProps } from "./Kbd.types";

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, size = "sm", ...props },
  ref,
) {
  return (
    <kbd
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[size], className)}
      data-size={size}
    />
  );
});
