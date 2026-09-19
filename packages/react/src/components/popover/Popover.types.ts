import type { ComponentPropsWithoutRef } from "react";
import type { Popover as PopoverPrimitive } from "radix-ui";

export type PopoverProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Root
>;
export type PopoverTriggerProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Trigger
>;
export type PopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Content
>;
export type PopoverCloseProps = ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Close
>;
