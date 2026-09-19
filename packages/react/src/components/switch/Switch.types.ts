import type { Switch as SwitchPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface SwitchProps
  extends Omit<
    ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    "asChild" | "children"
  > {
  /** Visible label that also provides the accessible name. */
  children: ReactNode;
  /** Marks the switch as invalid. */
  invalid?: boolean;
}
