"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";
import {
  DateInput,
  DateSegment,
  TimeField as AriaTimeField,
} from "react-aria-components/TimeField";

import { parseOptionalTime, serializeTime } from "../calendar/date-utils";
import { useFieldControl } from "../field/useFieldControl";
import styles from "./TimeField.module.css";
import type { TimeFieldProps } from "./TimeField.types";

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  function TimeField(
    {
      "aria-describedby": ariaDescribedBy,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className,
      defaultValue,
      disabled,
      granularity = "minute",
      hourCycle,
      id,
      invalid,
      maxValue,
      minValue,
      name,
      onValueChange,
      readOnly,
      required,
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
      <AriaTimeField
        ref={ref}
        id={field.id}
        className={clsx(styles.root, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? field.labelId}
        aria-describedby={field.describedBy}
        value={parseOptionalTime(value)}
        defaultValue={parseOptionalTime(defaultValue)}
        minValue={parseOptionalTime(minValue)}
        maxValue={parseOptionalTime(maxValue)}
        granularity={granularity}
        hourCycle={hourCycle}
        name={name}
        isDisabled={field.disabled}
        isInvalid={field.invalid}
        isRequired={field.required}
        isReadOnly={readOnly}
        onChange={(nextValue) => onValueChange?.(serializeTime(nextValue))}
      >
        <DateInput className={clsx(styles.input, styles[size])}>
          {(segment) => (
            <DateSegment className={styles.segment} segment={segment} />
          )}
        </DateInput>
      </AriaTimeField>
    );
  },
);
