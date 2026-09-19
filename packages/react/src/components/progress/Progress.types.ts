import type { Progress as ProgressPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef } from "react";

export interface ProgressProps
  extends Omit<
    ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    "asChild" | "value"
  > {
  /** Accessible and visible progress label. */
  label: string;
  /** Displays the numeric percentage beside the label. */
  showValue?: boolean;
  /** Completion percentage from 0 through 100, or null when indeterminate. */
  value: number | null;
}
