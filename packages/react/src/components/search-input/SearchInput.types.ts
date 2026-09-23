import type { InputProps } from "../input";

export interface SearchInputProps
  extends Omit<InputProps, "defaultValue" | "onChange" | "type" | "value"> {
  /** Accessible name for the clear action. Defaults to 清除搜索. */
  clearLabel?: string;
  /** Initial search value when uncontrolled. */
  defaultValue?: string;
  /** Called whenever typing or the clear action changes the search value. */
  onValueChange?: (value: string) => void;
  /** Current search value when controlled. */
  value?: string;
}
