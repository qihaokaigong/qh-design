"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import styles from "./Tooltip.module.css";
import type { TooltipContentProps, TooltipProps } from "./Tooltip.types";

function TooltipRoot({ delayDuration = 400, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props} />
    </TooltipPrimitive.Provider>
  );
}

const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(function TooltipContent(
  { children, className, sideOffset = 6, ...props },
  ref,
) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...props}
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={12}
        className={clsx(styles.content, className)}
      >
        {children}
        <TooltipPrimitive.Arrow className={styles.arrow} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
});

export const Tooltip = Object.assign(TooltipRoot, {
  Content: TooltipContent,
  Trigger: TooltipPrimitive.Trigger,
});
