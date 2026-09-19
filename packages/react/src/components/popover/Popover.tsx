"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Popover as PopoverPrimitive } from "radix-ui";

import styles from "./Popover.module.css";
import type { PopoverContentProps } from "./Popover.types";

const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(function PopoverContent(
  { align = "center", children, className, sideOffset = 8, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...props}
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={16}
        className={clsx(styles.content, className)}
      >
        {children}
        <PopoverPrimitive.Arrow className={styles.arrow} />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

export const Popover = Object.assign(PopoverPrimitive.Root, {
  Close: PopoverPrimitive.Close,
  Content: PopoverContent,
  Trigger: PopoverPrimitive.Trigger,
});
