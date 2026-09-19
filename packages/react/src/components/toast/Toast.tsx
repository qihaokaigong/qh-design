"use client";

import { X } from "lucide-react";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Toast as ToastPrimitive } from "radix-ui";

import styles from "./Toast.module.css";
import type {
  ToastActionProps,
  ToastCloseProps,
  ToastDescriptionProps,
  ToastProps,
  ToastProviderProps,
  ToastTitleProps,
} from "./Toast.types";

function ToastProvider({
  children,
  label = "通知",
  ...props
}: ToastProviderProps) {
  return (
    <ToastPrimitive.Provider {...props} label={label} swipeDirection="right">
      {children}
      <ToastPrimitive.Viewport
        className={styles.viewport}
        label="通知（{hotkey}）"
      />
    </ToastPrimitive.Provider>
  );
}

const ToastRoot = forwardRef<
  ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(function ToastRoot({ className, tone = "neutral", ...props }, ref) {
  return (
    <ToastPrimitive.Root
      {...props}
      ref={ref}
      className={clsx(styles.root, styles[tone], className)}
      data-tone={tone}
    />
  );
});

const ToastTitle = forwardRef<
  ComponentRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(function ToastTitle({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Title
      {...props}
      ref={ref}
      className={clsx(styles.title, className)}
    />
  );
});

const ToastDescription = forwardRef<
  ComponentRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Description
      {...props}
      ref={ref}
      className={clsx(styles.description, className)}
    />
  );
});

const ToastAction = forwardRef<
  ComponentRef<typeof ToastPrimitive.Action>,
  ToastActionProps
>(function ToastAction({ className, ...props }, ref) {
  return (
    <ToastPrimitive.Action
      {...props}
      ref={ref}
      className={clsx(styles.action, className)}
    />
  );
});

const ToastClose = forwardRef<
  ComponentRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(function ToastClose(
  { "aria-label": ariaLabel = "关闭通知", children, className, ...props },
  ref,
) {
  return (
    <ToastPrimitive.Close
      {...props}
      ref={ref}
      aria-label={ariaLabel}
      className={clsx(styles.close, className)}
    >
      {children ?? <X aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
});

export const Toast = Object.assign(ToastRoot, {
  Action: ToastAction,
  Close: ToastClose,
  Description: ToastDescription,
  Provider: ToastProvider,
  Title: ToastTitle,
});
