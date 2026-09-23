"use client";

import { clsx } from "clsx";
import { CalendarRange } from "lucide-react";
import { forwardRef } from "react";
import {
  Button as AriaButton,
  DateInput as AriaDateInput,
  DateRangePicker as AriaDateRangePicker,
  DateSegment,
  Group as AriaGroup,
  Popover as AriaPopover,
  RangeCalendar as AriaRangeCalendar,
} from "react-aria-components/DateRangePicker";

import calendarStyles from "../calendar/Calendar.module.css";
import { CalendarParts } from "../calendar/CalendarParts";
import {
  parseOptionalDate,
  parseOptionalRange,
  serializeRange,
  wrapDateUnavailable,
} from "../calendar/date-utils";
import { useFieldControl } from "../field/useFieldControl";
import styles from "./DateRangePicker.module.css";
import type { DateRangePickerProps } from "./DateRangePicker.types";

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      calendarLabel = "选择日期范围",
      className,
      defaultOpen,
      defaultValue,
      disabled,
      firstDayOfWeek,
      id,
      invalid,
      isDateUnavailable,
      isOpen,
      maxValue,
      minValue,
      nextLabel,
      onOpenChange,
      onValueChange,
      openLabel = "打开日历",
      previousLabel,
      readOnly,
      required,
      shouldCloseOnSelect,
      size = "md",
      value,
    },
    ref,
  ) {
    const field = useFieldControl({
      describedBy: ariaDescribedBy,
      disabled,
      id,
      invalid,
      required,
    });

    return (
      <AriaDateRangePicker
        ref={ref}
        id={field.id}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? field.labelId}
        aria-describedby={field.describedBy}
        value={parseOptionalRange(value)}
        defaultValue={parseOptionalRange(defaultValue)}
        minValue={parseOptionalDate(minValue)}
        maxValue={parseOptionalDate(maxValue)}
        isDisabled={field.disabled}
        isInvalid={field.invalid}
        isRequired={field.required}
        isReadOnly={readOnly}
        isOpen={isOpen}
        defaultOpen={defaultOpen}
        shouldCloseOnSelect={shouldCloseOnSelect}
        isDateUnavailable={wrapDateUnavailable(isDateUnavailable)}
        onOpenChange={onOpenChange}
        onChange={(nextValue) => onValueChange?.(serializeRange(nextValue))}
      >
        <AriaGroup className={clsx(styles.control, styles[size])}>
          <AriaDateInput slot="start" className={styles.input}>
            {(segment) => (
              <DateSegment className={styles.segment} segment={segment} />
            )}
          </AriaDateInput>
          <span className={styles.separator} aria-hidden="true">
            –
          </span>
          <AriaDateInput slot="end" className={styles.input}>
            {(segment) => (
              <DateSegment className={styles.segment} segment={segment} />
            )}
          </AriaDateInput>
          <AriaButton className={styles.trigger} aria-label={openLabel}>
            <CalendarRange aria-hidden="true" />
          </AriaButton>
        </AriaGroup>
        <AriaPopover
          className={styles.popover}
          aria-label={calendarLabel}
          offset={4}
        >
          <AriaRangeCalendar
            className={calendarStyles.root}
            firstDayOfWeek={firstDayOfWeek}
          >
            <CalendarParts
              nextLabel={nextLabel}
              previousLabel={previousLabel}
            />
          </AriaRangeCalendar>
        </AriaPopover>
      </AriaDateRangePicker>
    );
  },
);
