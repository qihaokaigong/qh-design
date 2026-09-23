import type { AriaAttributes } from "react";

export interface TimeFieldProps
  extends Pick<
    AriaAttributes,
    "aria-describedby" | "aria-label" | "aria-labelledby"
  > {
  /** Additional class applied to the component root. */
  className?: string;
  /** Initial time in ISO 8601 format, for example `09:30` or `09:30:00`. */
  defaultValue?: string | null;
  /** Disables the control. Inherits from Field when omitted. */
  disabled?: boolean;
  /** Whether to display 12-hour or 24-hour time. */
  hourCycle?: 12 | 24;
  /** Root id used to connect the control to Field. */
  id?: string;
  /** Marks the control as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Smallest editable unit. Defaults to minute. */
  granularity?: "hour" | "minute" | "second";
  /** Latest selectable ISO time. */
  maxValue?: string;
  /** Earliest selectable ISO time. */
  minValue?: string;
  /** Name used when the control participates in a form. */
  name?: string;
  /** Called when the time changes. */
  onValueChange?: (value: string | null) => void;
  /** Prevents editing while preserving the current value. */
  readOnly?: boolean;
  /** Marks a value as required. Inherits from Field when omitted. */
  required?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: "sm" | "md" | "lg";
  /** Controlled time in ISO 8601 format. */
  value?: string | null;
}
