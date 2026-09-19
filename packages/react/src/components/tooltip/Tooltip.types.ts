import type { ComponentPropsWithoutRef } from "react";
import type { Tooltip as TooltipPrimitive } from "radix-ui";

export type TooltipProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Root
>;
export type TooltipTriggerProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
>;
export type TooltipContentProps = ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Content
>;
