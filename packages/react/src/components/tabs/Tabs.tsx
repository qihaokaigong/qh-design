"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import styles from "./Tabs.module.css";
import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from "./Tabs.types";

const TabsRoot = forwardRef<ComponentRef<typeof TabsPrimitive.Root>, TabsProps>(
  function TabsRoot({ className, ...props }, ref) {
    return (
      <TabsPrimitive.Root
        {...props}
        ref={ref}
        className={clsx(styles.root, className)}
      />
    );
  },
);

const TabsList = forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      {...props}
      ref={ref}
      className={clsx(styles.list, className)}
    />
  );
});

const TabsTrigger = forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      {...props}
      ref={ref}
      className={clsx(styles.trigger, className)}
    />
  );
});

const TabsContent = forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      {...props}
      ref={ref}
      className={clsx(styles.content, className)}
    />
  );
});

export const Tabs = Object.assign(TabsRoot, {
  Content: TabsContent,
  List: TabsList,
  Trigger: TabsTrigger,
});
