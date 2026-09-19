import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type { AlertDialog as AlertDialogPrimitive } from "radix-ui";

export type AlertDialogProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Root
>;
export type AlertDialogTriggerProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Trigger
>;
export type AlertDialogContentProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Content
>;
export type AlertDialogTitleProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Title
>;
export type AlertDialogDescriptionProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Description
>;
export type AlertDialogCancelProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Cancel
>;
export type AlertDialogActionProps = ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Action
>;
export type AlertDialogFooterProps = HTMLAttributes<HTMLDivElement>;
