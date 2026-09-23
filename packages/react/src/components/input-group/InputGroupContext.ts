import { createContext, useContext } from "react";

export type InputGroupSize = "sm" | "md" | "lg";

export interface InputGroupContextValue {
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  size: InputGroupSize;
}

export const InputGroupContext = createContext<InputGroupContextValue | null>(
  null,
);

export function useInputGroupContext(): InputGroupContextValue | null {
  return useContext(InputGroupContext);
}
