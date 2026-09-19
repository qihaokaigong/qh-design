import { useFieldContext } from "./Field";

interface FieldControlOptions {
  describedBy?: string;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  required?: boolean;
}

export function useFieldControl({
  describedBy,
  disabled,
  id,
  invalid,
  required,
}: FieldControlOptions) {
  const field = useFieldContext();
  const isInvalid = invalid ?? field?.invalid ?? false;
  const descriptionIds = [
    field?.descriptionId,
    isInvalid ? field?.errorId : undefined,
    describedBy,
  ].filter(Boolean);

  return {
    describedBy: descriptionIds.length ? descriptionIds.join(" ") : undefined,
    disabled: disabled ?? field?.disabled,
    id: field?.controlId ?? id,
    invalid: isInvalid,
    labelId: field?.labelId,
    required: required ?? field?.required,
  };
}
