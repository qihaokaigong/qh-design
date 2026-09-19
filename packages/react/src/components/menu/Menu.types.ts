import type { ComponentPropsWithoutRef } from "react";
import type { DropdownMenu as MenuPrimitive } from "radix-ui";

export type MenuProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Root>;
export type MenuTriggerProps = ComponentPropsWithoutRef<
  typeof MenuPrimitive.Trigger
>;
export type MenuContentProps = ComponentPropsWithoutRef<
  typeof MenuPrimitive.Content
>;
export type MenuItemProps = ComponentPropsWithoutRef<
  typeof MenuPrimitive.Item
> & { destructive?: boolean };
export type MenuCheckboxItemProps = ComponentPropsWithoutRef<
  typeof MenuPrimitive.CheckboxItem
>;
export type MenuLabelProps = ComponentPropsWithoutRef<
  typeof MenuPrimitive.Label
>;
export type MenuSeparatorProps = ComponentPropsWithoutRef<
  typeof MenuPrimitive.Separator
>;
