"use client";

import { Separator as SeparatorPrimitive } from "radix-ui";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";

import styles from "./Separator.module.css";
import type { SeparatorProps } from "./Separator.types";

export const Separator = forwardRef<
  ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(function Separator(
  { className, decorative = true, orientation = "horizontal", ...props },
  ref,
) {
  return (
    <SeparatorPrimitive.Root
      {...props}
      ref={ref}
      className={clsx(styles.root, className)}
      decorative={decorative}
      orientation={orientation}
    />
  );
});
