"use client";

import { clsx } from "clsx";
import { CalendarDays } from "lucide-react";
import { forwardRef } from "react";
import {
  Button as AriaButton,
  Calendar as AriaCalendar,
  DateInput as AriaDateInput,
  DatePicker as AriaDatePicker,
  DateSegment,
  Group as AriaGroup,
  Popover as AriaPopover,
} from "react-aria-components/DatePicker";

import calendarStyles from "../calendar/Calendar.module.css";
import { CalendarParts } from "../calendar/CalendarParts";
import {
  parseOptionalDate,
  serializeDate,
  wrapDateUnavailable,
} from "../calendar/date-utils";
import { useFieldControl } from "../field/useFieldControl";
import styles from "./DatePicker.module.css";
import type { DatePickerProps } from "./DatePicker.types";

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  function DatePicker(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      calendarLabel = "选择日期",
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
      name,
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
      <AriaDatePicker
        ref={ref}
        id={field.id}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? field.labelId}
        aria-describedby={field.describedBy}
        value={parseOptionalDate(value)}
        defaultValue={parseOptionalDate(defaultValue)}
        minValue={parseOptionalDate(minValue)}
        maxValue={parseOptionalDate(maxValue)}
        isDisabled={field.disabled}
        isInvalid={field.invalid}
        isRequired={field.required}
        isReadOnly={readOnly}
        isOpen={isOpen}
        defaultOpen={defaultOpen}
        name={name}
        shouldCloseOnSelect={shouldCloseOnSelect}
        isDateUnavailable={wrapDateUnavailable(isDateUnavailable)}
        onOpenChange={onOpenChange}
        onChange={(nextValue) => onValueChange?.(serializeDate(nextValue))}
      >
        <AriaGroup className={clsx(styles.control, styles[size])}>
          <AriaDateInput className={styles.input}>
            {(segment) => (
              <DateSegment className={styles.segment} segment={segment} />
            )}
          </AriaDateInput>
          <AriaButton className={styles.trigger} aria-label={openLabel}>
            <CalendarDays aria-hidden="true" />
          </AriaButton>
        </AriaGroup>
        <AriaPopover
          className={styles.popover}
          aria-label={calendarLabel}
          offset={4}
        >
          <AriaCalendar
            className={calendarStyles.root}
            firstDayOfWeek={firstDayOfWeek}
          >
            <CalendarParts
              nextLabel={nextLabel}
              previousLabel={previousLabel}
            />
          </AriaCalendar>
        </AriaPopover>
      </AriaDatePicker>
    );
  },
);
