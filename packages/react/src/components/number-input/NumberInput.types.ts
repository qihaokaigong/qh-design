import type { InputProps } from "../input";

export interface NumberInputProps
  extends Omit<InputProps, "defaultValue" | "onChange" | "type" | "value"> {
  /** Initial numeric value when uncontrolled. */
  defaultValue?: number | null;
  /** Accessible name for the decrement action. Defaults to 减少. */
  decrementLabel?: string;
  /** Accessible name for the increment action. Defaults to 增加. */
  incrementLabel?: string;
  /** Called with a number, or null when the input is empty. */
  onValueChange?: (value: number | null) => void;
  /** Current numeric value when controlled. */
  value?: number | null;
}
