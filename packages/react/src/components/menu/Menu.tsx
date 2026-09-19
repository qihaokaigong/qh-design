"use client";

import { Check } from "lucide-react";
import { clsx } from "clsx";
import { forwardRef } from "react";
import type { ComponentRef } from "react";
import { DropdownMenu as MenuPrimitive } from "radix-ui";

import styles from "./Menu.module.css";
import type {
  MenuCheckboxItemProps,
  MenuContentProps,
  MenuItemProps,
  MenuLabelProps,
  MenuSeparatorProps,
} from "./Menu.types";

const MenuContent = forwardRef<
  ComponentRef<typeof MenuPrimitive.Content>,
  MenuContentProps
>(function MenuContent(
  { align = "start", className, sideOffset = 6, ...props },
  ref,
) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        {...props}
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={clsx(styles.content, className)}
        collisionPadding={16}
      />
    </MenuPrimitive.Portal>
  );
});

const MenuItem = forwardRef<
  ComponentRef<typeof MenuPrimitive.Item>,
  MenuItemProps
>(function MenuItem({ className, destructive, ...props }, ref) {
  return (
    <MenuPrimitive.Item
      {...props}
      ref={ref}
      className={clsx(styles.item, className)}
      data-destructive={destructive || undefined}
    />
  );
});

const MenuCheckboxItem = forwardRef<
  ComponentRef<typeof MenuPrimitive.CheckboxItem>,
  MenuCheckboxItemProps
>(function MenuCheckboxItem({ children, className, ...props }, ref) {
  return (
    <MenuPrimitive.CheckboxItem
      {...props}
      ref={ref}
      className={clsx(styles.item, styles.checkboxItem, className)}
    >
      <MenuPrimitive.ItemIndicator className={styles.indicator}>
        <Check aria-hidden="true" />
      </MenuPrimitive.ItemIndicator>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
});

const MenuLabel = forwardRef<
  ComponentRef<typeof MenuPrimitive.Label>,
  MenuLabelProps
>(function MenuLabel({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Label
      {...props}
      ref={ref}
      className={clsx(styles.label, className)}
    />
  );
});

const MenuSeparator = forwardRef<
  ComponentRef<typeof MenuPrimitive.Separator>,
  MenuSeparatorProps
>(function MenuSeparator({ className, ...props }, ref) {
  return (
    <MenuPrimitive.Separator
      {...props}
      ref={ref}
      className={clsx(styles.separator, className)}
    />
  );
});

export const Menu = Object.assign(MenuPrimitive.Root, {
  CheckboxItem: MenuCheckboxItem,
  Content: MenuContent,
  Item: MenuItem,
  Label: MenuLabel,
  Separator: MenuSeparator,
  Trigger: MenuPrimitive.Trigger,
});
