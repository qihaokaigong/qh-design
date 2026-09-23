import type { AriaAttributes } from "react";

import type { DateRangeValue } from "../calendar";

export interface DateRangePickerProps
  extends Pick<
    AriaAttributes,
    "aria-describedby" | "aria-label" | "aria-labelledby"
  > {
  /** Accessible name for the calendar dialog. Defaults to 选择日期范围. */
  calendarLabel?: string;
  /** Additional class applied to the component root. */
  className?: string;
  /** Initial inclusive range using ISO 8601 calendar dates. */
  defaultValue?: DateRangeValue | null;
  /** Whether the calendar popover is initially open. */
  defaultOpen?: boolean;
  /** Disables both date inputs and the calendar trigger. Inherits from Field when omitted. */
  disabled?: boolean;
  /** First day of the week, using Sunday through Saturday. */
  firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  /** Root id used to connect the control to Field. */
  id?: string;
  /** Returns whether an ISO calendar date cannot be selected. */
  isDateUnavailable?: (date: string) => boolean;
  /** Whether the calendar popover is controlled as open. */
  isOpen?: boolean;
  /** Marks the range as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Latest selectable date in ISO 8601 calendar-date format. */
  maxValue?: string;
  /** Earliest selectable date in ISO 8601 calendar-date format. */
  minValue?: string;
  /** Accessible name for the next-month button. Defaults to 下个月. */
  nextLabel?: string;
  /** Called when the calendar popover opens or closes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Called when the inclusive range changes. */
  onValueChange?: (value: DateRangeValue | null) => void;
  /** Accessible name for the calendar trigger. Defaults to 打开日历. */
  openLabel?: string;
  /** Accessible name for the previous-month button. Defaults to 上个月. */
  previousLabel?: string;
  /** Prevents editing while preserving the current range. */
  readOnly?: boolean;
  /** Marks a range as required. Inherits from Field when omitted. */
  required?: boolean;
  /** Whether the popover closes after selecting a complete range. */
  shouldCloseOnSelect?: boolean;
  /** Visual and touch-target size. Defaults to md. */
  size?: "sm" | "md" | "lg";
  /** Controlled inclusive range using ISO 8601 calendar dates. */
  value?: DateRangeValue | null;
}
