"use client";

import { clsx } from "clsx";
import { createContext, forwardRef, useContext, useId, useMemo } from "react";

import styles from "./Fieldset.module.css";
import type {
  FieldsetContextValue,
  FieldsetDescriptionProps,
  FieldsetErrorProps,
  FieldsetLegendProps,
  FieldsetProps,
} from "./Fieldset.types";

const FieldsetContext = createContext<FieldsetContextValue | null>(null);

export function useFieldsetContext(): FieldsetContextValue | null {
  return useContext(FieldsetContext);
}

const FieldsetRoot = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function FieldsetRoot(
    {
      "aria-describedby": ariaDescribedBy,
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
    const baseId = id ?? `qh-fieldset-${generatedId}`;
    const context = useMemo<FieldsetContextValue>(
      () => ({
        descriptionId: `${baseId}-description`,
        disabled,
        errorId: `${baseId}-error`,
        invalid,
        legendId: `${baseId}-legend`,
        required,
      }),
      [baseId, disabled, invalid, required],
    );
    const describedBy = [
      context.descriptionId,
      invalid ? context.errorId : undefined,
      ariaDescribedBy,
    ].filter(Boolean);

    return (
      <FieldsetContext.Provider value={context}>
        <fieldset
          {...props}
          ref={ref}
          id={baseId}
          className={clsx(styles.root, className)}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={
            describedBy.length ? describedBy.join(" ") : undefined
          }
          data-invalid={invalid || undefined}
        >
          {children}
        </fieldset>
      </FieldsetContext.Provider>
    );
  },
);

const FieldsetLegend = forwardRef<HTMLLegendElement, FieldsetLegendProps>(
  function FieldsetLegend({ children, className, id, ...props }, ref) {
    const fieldset = useFieldsetContext();

    return (
      <legend
        {...props}
        ref={ref}
        id={id ?? fieldset?.legendId}
        className={clsx(styles.legend, className)}
      >
        {children}
        {fieldset?.required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
    );
  },
);

const FieldsetDescription = forwardRef<
  HTMLParagraphElement,
  FieldsetDescriptionProps
>(function FieldsetDescription({ className, id, ...props }, ref) {
  const fieldset = useFieldsetContext();

  return (
    <p
      {...props}
      ref={ref}
      id={id ?? fieldset?.descriptionId}
      className={clsx(styles.description, className)}
    />
  );
});

const FieldsetError = forwardRef<HTMLParagraphElement, FieldsetErrorProps>(
  function FieldsetError({ className, id, ...props }, ref) {
    const fieldset = useFieldsetContext();
    if (fieldset && !fieldset.invalid) return null;

    return (
      <p
        {...props}
        ref={ref}
        id={id ?? fieldset?.errorId}
        className={clsx(styles.error, className)}
        role="alert"
      />
    );
  },
);

export const Fieldset = Object.assign(FieldsetRoot, {
  Description: FieldsetDescription,
  Error: FieldsetError,
  Legend: FieldsetLegend,
});
