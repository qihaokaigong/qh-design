"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import styles from "./Dialog.module.css";
import type {
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogTitleProps,
} from "./Dialog.types";

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(function DialogContent({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={clsx(styles.content, className)}
      />
    </DialogPrimitive.Portal>
  );
});

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      {...props}
      ref={ref}
      className={clsx(styles.title, className)}
    />
  );
});

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      {...props}
      ref={ref}
      className={clsx(styles.description, className)}
    />
  );
});

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={clsx(styles.footer, className)} />
    );
  },
);

export const Dialog = Object.assign(DialogPrimitive.Root, {
  Close: DialogPrimitive.Close,
  Content: DialogContent,
  Description: DialogDescription,
  Footer: DialogFooter,
  Title: DialogTitle,
  Trigger: DialogPrimitive.Trigger,
});
