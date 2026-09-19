"use client";

import { clsx } from "clsx";
import { createContext, forwardRef, useContext, useId, useMemo } from "react";

import styles from "./Field.module.css";
import type {
  FieldContextValue,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
  FieldProps,
} from "./Field.types";

const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

const FieldRoot = forwardRef<HTMLDivElement, FieldProps>(function FieldRoot(
  {
    children,
    className,
    disabled = false,
    id,
    invalid = false,
    required = false,
    ...props
  },
  ref,
) {
  const generatedId = useId().replaceAll(":", "");
  const baseId = id ?? `qh-field-${generatedId}`;
  const context = useMemo<FieldContextValue>(
    () => ({
      controlId: `${baseId}-control`,
      descriptionId: `${baseId}-description`,
      disabled,
      errorId: `${baseId}-error`,
      invalid,
      labelId: `${baseId}-label`,
      required,
    }),
    [baseId, disabled, invalid, required],
  );

  return (
    <FieldContext.Provider value={context}>
      <div
        {...props}
        ref={ref}
        id={baseId}
        className={clsx(styles.root, className)}
        data-disabled={disabled || undefined}
        data-invalid={invalid || undefined}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
});

const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel({ children, className, htmlFor, id, ...props }, ref) {
    const field = useFieldContext();

    return (
      <label
        {...props}
        ref={ref}
        id={id ?? field?.labelId}
        htmlFor={htmlFor ?? field?.controlId}
        className={clsx(styles.label, className)}
      >
        {children}
        {field?.required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
    );
  },
);

const FieldDescription = forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(function FieldDescription({ className, id, ...props }, ref) {
  const field = useFieldContext();
  return (
    <p
      {...props}
      ref={ref}
      id={id ?? field?.descriptionId}
      className={clsx(styles.description, className)}
    />
  );
});

const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(
  function FieldError({ className, id, ...props }, ref) {
    const field = useFieldContext();
    if (field && !field.invalid) return null;

    return (
      <p
        {...props}
        ref={ref}
        id={id ?? field?.errorId}
        className={clsx(styles.error, className)}
        role="alert"
      />
    );
  },
);

export const Field = Object.assign(FieldRoot, {
  Description: FieldDescription,
  Error: FieldError,
  Label: FieldLabel,
});
