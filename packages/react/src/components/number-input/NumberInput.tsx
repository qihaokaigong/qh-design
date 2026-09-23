"use client";

import { Minus, Plus } from "lucide-react";
import { forwardRef, useRef, useState } from "react";

import { InputGroup } from "../input-group";
import styles from "./NumberInput.module.css";
import type { NumberInputProps } from "./NumberInput.types";

function toFiniteNumber(value: number | string | undefined): number | null {
  if (value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      className,
      decrementLabel = "减少",
      defaultValue = null,
      disabled,
      incrementLabel = "增加",
      invalid,
      max,
      min,
      onValueChange,
      readOnly,
      required,
      size = "md",
      step,
      value,
      ...props
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = value !== undefined ? value : uncontrolledValue;
    const minimum = toFiniteNumber(min);
    const maximum = toFiniteNumber(max);
    const atMinimum =
      currentValue !== null && minimum !== null && currentValue <= minimum;
    const atMaximum =
      currentValue !== null && maximum !== null && currentValue >= maximum;

    const setValue = (nextValue: number | null) => {
      if (value === undefined) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    };

    const stepValue = (direction: "down" | "up") => {
      const input = inputRef.current;
      if (!input) return;
      const previousValue = input.value;

      try {
        if (direction === "up") input.stepUp();
        else input.stepDown();
      } catch {
        const fallbackStep = toFiniteNumber(step) ?? 1;
        const nextValue =
          (currentValue ?? 0) +
          (direction === "up" ? fallbackStep : -fallbackStep);
        input.value = String(
          Math.min(
            maximum ?? nextValue,
            Math.max(minimum ?? nextValue, nextValue),
          ),
        );
      }

      const nextValue = Number.isNaN(input.valueAsNumber)
        ? null
        : input.valueAsNumber;
      if (value !== undefined) input.value = previousValue;
      setValue(nextValue);
      input.focus();
    };

    return (
      <InputGroup
        className={className}
        disabled={disabled}
        invalid={invalid}
        required={required}
        size={size}
      >
        <InputGroup.Action
          aria-label={decrementLabel}
          disabled={Boolean(readOnly || atMinimum)}
          onClick={() => stepValue("down")}
        >
          <Minus />
        </InputGroup.Action>
        <InputGroup.Input
          {...props}
          ref={(node) => {
            inputRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          className={styles.input}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          readOnly={readOnly}
          step={step}
          value={currentValue ?? ""}
          onChange={(event) =>
            setValue(
              Number.isNaN(event.currentTarget.valueAsNumber)
                ? null
                : event.currentTarget.valueAsNumber,
            )
          }
        />
        <InputGroup.Action
          aria-label={incrementLabel}
          disabled={Boolean(readOnly || atMaximum)}
          onClick={() => stepValue("up")}
        >
          <Plus />
        </InputGroup.Action>
      </InputGroup>
    );
  },
);
