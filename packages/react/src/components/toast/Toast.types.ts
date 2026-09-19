import type { ComponentPropsWithoutRef } from "react";
import type { Toast as ToastPrimitive } from "radix-ui";

export type ToastTone = "neutral" | "success" | "warning" | "danger";
export type ToastProviderProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Provider
>;
export type ToastProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Root
> & {
  /** Visual tone. Does not replace an informative title or description. */
  tone?: ToastTone;
};
export type ToastTitleProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Title
>;
export type ToastDescriptionProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Description
>;
export type ToastActionProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Action
>;
export type ToastCloseProps = ComponentPropsWithoutRef<
  typeof ToastPrimitive.Close
>;
