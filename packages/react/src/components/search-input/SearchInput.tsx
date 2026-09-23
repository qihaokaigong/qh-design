"use client";

import { Search, X } from "lucide-react";
import { forwardRef, useRef, useState } from "react";

import { InputGroup } from "../input-group";
import type { SearchInputProps } from "./SearchInput.types";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    {
      className,
      clearLabel = "清除搜索",
      defaultValue = "",
      disabled,
      invalid,
      onValueChange,
      required,
      size = "md",
      value,
      ...props
    },
    forwardedRef,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = value ?? uncontrolledValue;

    const setValue = (nextValue: string) => {
      if (value === undefined) setUncontrolledValue(nextValue);
      onValueChange?.(nextValue);
    };

    return (
      <InputGroup
        className={className}
        disabled={disabled}
        invalid={invalid}
        required={required}
        size={size}
      >
        <InputGroup.Addon>
          <Search aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input
          {...props}
          ref={(node) => {
            inputRef.current = node;
            if (typeof forwardedRef === "function") forwardedRef(node);
            else if (forwardedRef) forwardedRef.current = node;
          }}
          type="search"
          value={currentValue}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        {currentValue ? (
          <InputGroup.Action
            aria-label={clearLabel}
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
          >
            <X />
          </InputGroup.Action>
        ) : null}
      </InputGroup>
    );
  },
);
