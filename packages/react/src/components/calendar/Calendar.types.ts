import type { AriaAttributes } from "react";

export interface CalendarProps
  extends Pick<
    AriaAttributes,
    "aria-describedby" | "aria-label" | "aria-labelledby"
  > {
  /** Additional class applied to the component root. */
  className?: string;
  /** Initial selected date in ISO 8601 calendar-date format (`YYYY-MM-DD`). */
  defaultValue?: string | null;
  /** Disables calendar navigation and selection. */
  disabled?: boolean;
  /** First day of the week, using Sunday through Saturday. */
  firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  /** Returns whether an ISO calendar date cannot be selected. */
  isDateUnavailable?: (date: string) => boolean;
  /** Marks the current selection as invalid. */
  invalid?: boolean;
  /** Latest selectable date in ISO 8601 calendar-date format. */
  maxValue?: string;
  /** Earliest selectable date in ISO 8601 calendar-date format. */
  minValue?: string;
  /** Accessible name for the next-month button. Defaults to 下个月. */
  nextLabel?: string;
  /** Called when the selected date changes. */
  onValueChange?: (value: string | null) => void;
  /** Accessible name for the previous-month button. Defaults to 上个月. */
  previousLabel?: string;
  /** Controlled selected date in ISO 8601 calendar-date format. */
  value?: string | null;
}
