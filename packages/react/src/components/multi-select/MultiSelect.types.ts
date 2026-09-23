import type { SelectProps as AriaSelectProps } from "react-aria-components/Select";

import type { CollectionOption } from "../list-box";

export interface MultiSelectProps
  extends Omit<
    AriaSelectProps<CollectionOption, "multiple">,
    | "children"
    | "className"
    | "defaultValue"
    | "isDisabled"
    | "isInvalid"
    | "isRequired"
    | "onChange"
    | "placeholder"
    | "value"
  > {
  /** Additional class applied to the component root. */
  className?: string;
  /** Initial selected values when uncontrolled. */
  defaultValue?: string[];
  /** Disables the trigger and popup. Inherits from Field when omitted. */
  disabled?: boolean;
  /** Content displayed when options is empty. Defaults to 暂无选项. */
  emptyText?: string;
  /** Marks the control as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Called with all selected values after selection changes. */
  onValueChange?: (value: string[]) => void;
  /** Ordered options rendered in the popup. */
  options: readonly CollectionOption[];
  /** Hint displayed while no option is selected. */
  placeholder?: string;
  /** Marks a selection as required. Inherits from Field when omitted. */
  required?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: "sm" | "md" | "lg";
  /** Current selected values when controlled. */
  value?: string[];
}
