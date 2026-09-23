import type { HTMLAttributes } from "react";

import type { CheckboxProps } from "../checkbox";

export interface CheckboxGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** Values selected on first render when the group is uncontrolled. */
  defaultValue?: string[];
  /** Disables every item in the group. */
  disabled?: boolean;
  /** Marks every item and the group as invalid. */
  invalid?: boolean;
  /** Name submitted by every selected item. */
  name?: string;
  /** Called with the complete selected-value array after an item changes. */
  onValueChange?: (value: string[]) => void;
  /** Selected values when the group is controlled. */
  value?: string[];
}

export interface CheckboxGroupItemProps
  extends Omit<
    CheckboxProps,
    | "checked"
    | "defaultChecked"
    | "invalid"
    | "name"
    | "onCheckedChange"
    | "required"
  > {
  /** Stable value added to or removed from the group selection. */
  value: string;
}
