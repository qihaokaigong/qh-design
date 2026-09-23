import {
  parseDate,
  parseTime,
  type CalendarDate,
  type Time,
} from "@internationalized/date";

export interface DateRangeValue {
  /** Inclusive range start in ISO 8601 calendar-date format (`YYYY-MM-DD`). */
  start: string;
  /** Inclusive range end in ISO 8601 calendar-date format (`YYYY-MM-DD`). */
  end: string;
}

export function parseOptionalDate(value: string | null | undefined) {
  return value == null ? value : parseDate(value);
}

export function parseOptionalTime(value: string | null | undefined) {
  return value == null ? value : parseTime(value);
}

export function parseOptionalRange(value: DateRangeValue | null | undefined) {
  return value == null
    ? value
    : { start: parseDate(value.start), end: parseDate(value.end) };
}

export function serializeDate(value: CalendarDate | null) {
  return value?.toString() ?? null;
}

export function serializeTime(value: Time | null) {
  return value?.toString() ?? null;
}

export function serializeRange(
  value: { start: CalendarDate; end: CalendarDate } | null,
): DateRangeValue | null {
  return value
    ? { start: value.start.toString(), end: value.end.toString() }
    : null;
}

export function wrapDateUnavailable(
  predicate: ((date: string) => boolean) | undefined,
) {
  return predicate
    ? (date: { toString(): string }) => predicate(date.toString())
    : undefined;
}
