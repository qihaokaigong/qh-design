import type { HTMLAttributes, ComponentPropsWithoutRef } from "react";
import type { Dialog as DialogPrimitive } from "radix-ui";

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type DialogTriggerProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Trigger
>;
export type DialogContentProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
>;
export type DialogTitleProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Title
>;
export type DialogDescriptionProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Description
>;
export type DialogCloseProps = ComponentPropsWithoutRef<
  typeof DialogPrimitive.Close
>;
export type DialogFooterProps = HTMLAttributes<HTMLDivElement>;
