import type { AriaAttributes } from "react";

export interface DatePickerProps
  extends Pick<
    AriaAttributes,
    "aria-describedby" | "aria-label" | "aria-labelledby"
  > {
  /** Accessible name for the calendar dialog. Defaults to 选择日期. */
  calendarLabel?: string;
  /** Additional class applied to the component root. */
  className?: string;
  /** Initial selected date in ISO 8601 calendar-date format (`YYYY-MM-DD`). */
  defaultValue?: string | null;
  /** Whether the calendar popover is initially open. */
  defaultOpen?: boolean;
  /** Disables the date input and calendar trigger. Inherits from Field when omitted. */
  disabled?: boolean;
  /** First day of the week, using Sunday through Saturday. */
  firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  /** Root id used to connect the control to Field. */
  id?: string;
  /** Whether the calendar popover is controlled as open. */
  isOpen?: boolean;
  /** Returns whether an ISO calendar date cannot be selected. */
  isDateUnavailable?: (date: string) => boolean;
  /** Marks the control as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Latest selectable date in ISO 8601 calendar-date format. */
  maxValue?: string;
  /** Earliest selectable date in ISO 8601 calendar-date format. */
  minValue?: string;
  /** Name used when the control participates in a form. */
  name?: string;
  /** Accessible name for the next-month button. Defaults to 下个月. */
  nextLabel?: string;
  /** Called when the calendar popover opens or closes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Called when the selected date changes. */
  onValueChange?: (value: string | null) => void;
  /** Accessible name for the calendar trigger. Defaults to 打开日历. */
  openLabel?: string;
  /** Accessible name for the previous-month button. Defaults to 上个月. */
  previousLabel?: string;
  /** Prevents editing while preserving the current value. */
  readOnly?: boolean;
  /** Marks a value as required. Inherits from Field when omitted. */
  required?: boolean;
  /** Whether the popover closes after selecting a date. */
  shouldCloseOnSelect?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: "sm" | "md" | "lg";
  /** Controlled selected date in ISO 8601 calendar-date format. */
  value?: string | null;
}
