import type { ComboBoxProps as AriaComboBoxProps } from "react-aria-components/ComboBox";

import type { CollectionOption } from "../list-box";

export interface ComboboxProps
  extends Omit<
    AriaComboBoxProps<CollectionOption, "single">,
    | "allowsCustomValue"
    | "children"
    | "className"
    | "defaultItems"
    | "defaultValue"
    | "isDisabled"
    | "isInvalid"
    | "isRequired"
    | "items"
    | "onChange"
    | "onInputChange"
    | "value"
  > {
  /** Additional class applied to the component root. */
  className?: string;
  /** Initial input text when uncontrolled. */
  defaultInputValue?: string;
  /** Initial selected option when uncontrolled. */
  defaultValue?: string | null;
  /** Disables the input and trigger. Inherits from Field when omitted. */
  disabled?: boolean;
  /** Content displayed when filtering returns no options. Defaults to 无匹配选项. */
  emptyText?: string;
  /** Current input text when controlled. */
  inputValue?: string;
  /** Marks the control as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Called when the input text changes. */
  onInputValueChange?: (value: string) => void;
  /** Called when the selected option changes. */
  onValueChange?: (value: string | null) => void;
  /** Accessible name for the popup trigger. Defaults to 显示选项. */
  openLabel?: string;
  /** Ordered options rendered in the popup. */
  options: readonly CollectionOption[];
  /** Hint displayed while no option is selected or query entered. */
  placeholder?: string;
  /** Marks a selection as required. Inherits from Field when omitted. */
  required?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: "sm" | "md" | "lg";
  /** Current selected option when controlled. */
  value?: string | null;
}
