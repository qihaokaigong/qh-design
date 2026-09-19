import type { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface RadioGroupProps
  extends Omit<
    ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "asChild"
  > {
  /** Marks every option in the group as invalid. */
  invalid?: boolean;
}

export interface RadioGroupItemProps
  extends Omit<
    ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    "asChild" | "children"
  > {
  /** Visible label that also provides the accessible name. */
  children: ReactNode;
}
