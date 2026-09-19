"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import styles from "./Drawer.module.css";
import type {
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerTitleProps,
} from "./Drawer.types";

const DrawerContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(function DrawerContent({ children, className, ...props }, ref) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={styles.overlay} />
      <DialogPrimitive.Content
        {...props}
        ref={ref}
        className={clsx(styles.content, className)}
      >
        <div aria-hidden="true" className={styles.handle} />
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});

const DrawerTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  DrawerTitleProps
>(function DrawerTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      {...props}
      ref={ref}
      className={clsx(styles.title, className)}
    />
  );
});

const DrawerDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  DrawerDescriptionProps
>(function DrawerDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      {...props}
      ref={ref}
      className={clsx(styles.description, className)}
    />
  );
});

const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  function DrawerFooter({ className, ...props }, ref) {
    return (
      <div {...props} ref={ref} className={clsx(styles.footer, className)} />
    );
  },
);

export const Drawer = Object.assign(DialogPrimitive.Root, {
  Close: DialogPrimitive.Close,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Trigger: DialogPrimitive.Trigger,
});
