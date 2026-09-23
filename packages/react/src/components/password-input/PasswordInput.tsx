"use client";

import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import { InputGroup } from "../input-group";
import type { PasswordInputProps } from "./PasswordInput.types";

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      className,
      defaultVisible = false,
      disabled,
      hidePasswordLabel = "隐藏密码",
      invalid,
      onVisibilityChange,
      required,
      showPasswordLabel = "显示密码",
      size = "md",
      visible,
      ...props
    },
    ref,
  ) {
    const [uncontrolledVisible, setUncontrolledVisible] =
      useState(defaultVisible);
    const isVisible = visible ?? uncontrolledVisible;

    const setVisible = (nextVisible: boolean) => {
      if (visible === undefined) setUncontrolledVisible(nextVisible);
      onVisibilityChange?.(nextVisible);
    };

    return (
      <InputGroup
        className={className}
        disabled={disabled}
        invalid={invalid}
        required={required}
        size={size}
      >
        <InputGroup.Input
          {...props}
          ref={ref}
          type={isVisible ? "text" : "password"}
        />
        <InputGroup.Action
          aria-label={isVisible ? hidePasswordLabel : showPasswordLabel}
          aria-pressed={isVisible}
          onClick={() => setVisible(!isVisible)}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </InputGroup.Action>
      </InputGroup>
    );
  },
);
