"use client";

import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import styles from "./Accordion.module.css";
import type {
  AccordionContentProps,
  AccordionHeaderProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./Accordion.types";

const AccordionRoot = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(function AccordionRoot({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Root
      {...props}
      ref={ref}
      className={clsx(styles.root, className)}
    />
  );
});

const AccordionItem = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      {...props}
      ref={ref}
      className={clsx(styles.item, className)}
    />
  );
});

const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  function AccordionHeader({ className, headingLevel = 3, ...props }, ref) {
    const Component = `h${headingLevel}` as const;

    return (
      <AccordionPrimitive.Header asChild>
        <Component
          {...props}
          ref={ref}
          className={clsx(styles.header, className)}
        />
      </AccordionPrimitive.Header>
    );
  },
);

const AccordionTrigger = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(function AccordionTrigger(
  { children, className, type = "button", ...props },
  ref,
) {
  return (
    <AccordionPrimitive.Trigger
      {...props}
      ref={ref}
      type={type}
      className={clsx(styles.trigger, className)}
    >
      <span className={styles.triggerLabel}>{children}</span>
      <ChevronDown aria-hidden="true" className={styles.chevron} />
    </AccordionPrimitive.Trigger>
  );
});

const AccordionContent = forwardRef<
  ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(function AccordionContent({ children, className, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      {...props}
      ref={ref}
      className={clsx(styles.content, className)}
    >
      <div className={styles.contentInner}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

export const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Header: AccordionHeader,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
});
