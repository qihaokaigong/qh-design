import type { Separator as SeparatorPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef } from "react";

export type SeparatorProps = Omit<
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
  "asChild"
>;
