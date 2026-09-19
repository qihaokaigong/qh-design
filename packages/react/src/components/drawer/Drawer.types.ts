import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type { Dialog as DialogPrimitive } from "radix-ui";

export type DrawerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DrawerTriggerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>;
export type DrawerContentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>;
export type DrawerTitleProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;
export type DrawerDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
export type DrawerCloseProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>;
export type DrawerFooterProps = HTMLAttributes<HTMLDivElement>;
