"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import styles from "./AlertDialog.module.css";
import type {
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogTitleProps,
} from "./AlertDialog.types";

const AlertDialogContent = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(function AlertDialogContent({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay className={styles.overlay} />
      <AlertDialogPrimitive.Content
        {...props}
        ref={ref}
        className={clsx(styles.content, className)}
      />
    </AlertDialogPrimitive.Portal>
  );
});

const AlertDialogTitle = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogTitleProps
>(function AlertDialogTitle({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Title
      {...props}
      ref={ref}
      className={clsx(styles.title, className)}
    />
  );
});

const AlertDialogDescription = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogDescriptionProps
>(function AlertDialogDescription({ className, ...props }, ref) {
  return (
    <AlertDialogPrimitive.Description
      {...props}
      ref={ref}
      className={clsx(styles.description, className)}
    />
  );
});

const AlertDialogFooter = forwardRef<HTMLDivElement, AlertDialogFooterProps>(
  function AlertDialogFooter({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={clsx(styles.footer, className)} />
    );
  },
);

export const AlertDialog = Object.assign(AlertDialogPrimitive.Root, {
  Action: AlertDialogPrimitive.Action,
  Cancel: AlertDialogPrimitive.Cancel,
  Content: AlertDialogContent,
  Description: AlertDialogDescription,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Trigger: AlertDialogPrimitive.Trigger,
});
