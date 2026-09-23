"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import { Calendar as AriaCalendar } from "react-aria-components/Calendar";

import styles from "./Calendar.module.css";
import { CalendarParts } from "./CalendarParts";
import {
  parseOptionalDate,
  serializeDate,
  wrapDateUnavailable,
} from "./date-utils";
import type { CalendarProps } from "./Calendar.types";

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    {
      "aria-label": ariaLabel = "选择日期",
      className,
      defaultValue,
      disabled,
      invalid,
      isDateUnavailable,
      maxValue,
      minValue,
      nextLabel,
      onValueChange,
      previousLabel,
      value,
      ...props
    },
    ref,
  ) {
    return (
      <AriaCalendar
        {...props}
        ref={ref}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        value={parseOptionalDate(value)}
        defaultValue={parseOptionalDate(defaultValue)}
        minValue={parseOptionalDate(minValue)}
        maxValue={parseOptionalDate(maxValue)}
        isDisabled={disabled}
        isInvalid={invalid}
        isDateUnavailable={wrapDateUnavailable(isDateUnavailable)}
        onChange={(nextValue) => onValueChange?.(serializeDate(nextValue))}
      >
        <CalendarParts nextLabel={nextLabel} previousLabel={previousLabel} />
      </AriaCalendar>
    );
  },
);
