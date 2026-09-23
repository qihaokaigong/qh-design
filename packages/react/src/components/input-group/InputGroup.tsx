"use client";

import { clsx } from "clsx";
import { forwardRef, useMemo } from "react";

import { IconButton } from "../icon-button";
import { Input } from "../input";
import { useFieldControl } from "../field/useFieldControl";
import styles from "./InputGroup.module.css";
import { InputGroupContext, useInputGroupContext } from "./InputGroupContext";
import type {
  InputGroupActionProps,
  InputGroupAddonProps,
  InputGroupProps,
} from "./InputGroup.types";

const InputGroupRoot = forwardRef<HTMLDivElement, InputGroupProps>(
  function InputGroupRoot(
    { children, className, disabled, invalid, required, size = "md", ...props },
    ref,
  ) {
    const field = useFieldControl({ disabled, invalid, required });
    const context = useMemo(
      () => ({
        disabled: field.disabled ?? false,
        invalid: field.invalid,
        required: field.required ?? false,
        size,
      }),
      [field.disabled, field.invalid, field.required, size],
    );

    return (
      <InputGroupContext.Provider value={context}>
        <div
          {...props}
          ref={ref}
          className={clsx(styles.root, styles[size], className)}
          data-disabled={context.disabled || undefined}
          data-invalid={context.invalid || undefined}
        >
          {children}
        </div>
      </InputGroupContext.Provider>
    );
  },
);

const InputGroupAddon = forwardRef<HTMLSpanElement, InputGroupAddonProps>(
  function InputGroupAddon({ className, ...props }, ref) {
    return (
      <span {...props} ref={ref} className={clsx(styles.addon, className)} />
    );
  },
);

const InputGroupAction = forwardRef<HTMLButtonElement, InputGroupActionProps>(
  function InputGroupAction({ className, disabled, ...props }, ref) {
    const context = useInputGroupContext();

    return (
      <IconButton
        {...props}
        ref={ref}
        className={clsx(styles.action, className)}
        disabled={Boolean(disabled || context?.disabled)}
        size={context?.size ?? "md"}
        variant="ghost"
      />
    );
  },
);

export const InputGroup = Object.assign(InputGroupRoot, {
  Action: InputGroupAction,
  Addon: InputGroupAddon,
  Input,
});
