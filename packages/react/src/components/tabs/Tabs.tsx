"use client";

import { clsx } from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
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
  const listRef = useRef<ComponentRef<typeof TabsPrimitive.List>>(null);
  useImperativeHandle(ref, () => listRef.current!, []);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const revealTab = () => {
      const active = list.ownerDocument.activeElement;
      const tab =
        active instanceof HTMLElement && list.contains(active)
          ? active.closest<HTMLElement>('[role="tab"]')
          : list.querySelector<HTMLElement>(
              '[role="tab"][aria-selected="true"]',
            );
      if (!tab) return;
      const bounds = list.getBoundingClientRect();
      const target = tab.getBoundingClientRect();
      const left = bounds.left + list.clientLeft;
      const right = left + list.clientWidth;
      const delta =
        target.width > list.clientWidth
          ? getComputedStyle(list).direction === "rtl"
            ? target.right - right
            : target.left - left
          : target.left < left
            ? target.left - left
            : target.right > right
              ? target.right - right
              : 0;
      if (delta) list.scrollBy({ left: delta, behavior: "instant" });
    };
    revealTab();
    const resizeObserver = new ResizeObserver(revealTab);
    const mutationObserver = new MutationObserver(revealTab);
    resizeObserver.observe(list);
    mutationObserver.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-selected"],
    });
    list.addEventListener("focusin", revealTab);
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      list.removeEventListener("focusin", revealTab);
    };
  }, []);
  return (
    <TabsPrimitive.List
      {...props}
      ref={listRef}
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
