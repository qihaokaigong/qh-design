import type { Checkbox as CheckboxPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface CheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    "asChild" | "children"
  > {
  /** Visible label that also provides the accessible name. */
  children: ReactNode;
  /** Marks the checkbox as invalid. */
  invalid?: boolean;
}
