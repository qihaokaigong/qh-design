import type { ComponentPropsWithoutRef } from "react";
import type { Tabs as TabsPrimitive } from "radix-ui";

export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;
export type TabsListProps = ComponentPropsWithoutRef<typeof TabsPrimitive.List>;
export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
>;
export type TabsContentProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;
