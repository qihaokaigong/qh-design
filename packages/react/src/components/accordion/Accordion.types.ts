import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type { Accordion as AccordionPrimitive } from "radix-ui";

import type { HeadingLevel } from "../heading";

type WithoutAsChild<T> = T extends unknown ? Omit<T, "asChild"> : never;

export type AccordionProps = WithoutAsChild<
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>;
export type AccordionItemProps = WithoutAsChild<
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>;
export interface AccordionHeaderProps
  extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level for this accordion item. Defaults to 3. */
  headingLevel?: HeadingLevel;
}
export type AccordionTriggerProps = WithoutAsChild<
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>;
export type AccordionContentProps = WithoutAsChild<
  ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>;
