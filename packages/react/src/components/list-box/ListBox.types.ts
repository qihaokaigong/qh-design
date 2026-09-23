import type { ListBoxProps as AriaListBoxProps } from "react-aria-components/ListBox";

export interface CollectionOption {
  /** Secondary text announced after the label. */
  description?: string;
  /** Prevents the option from receiving focus or selection. */
  disabled?: boolean;
  /** Visible option label and typeahead text. */
  label: string;
  /** Stable string submitted to the component state. */
  value: string;
}

interface ListBoxCommonProps
  extends Omit<
    AriaListBoxProps<CollectionOption>,
    | "children"
    | "className"
    | "defaultSelectedKeys"
    | "disabledKeys"
    | "items"
    | "onSelectionChange"
    | "renderEmptyState"
    | "selectedKeys"
    | "selectionBehavior"
    | "selectionMode"
  > {
  /** Additional class applied to the listbox root. */
  className?: string;
  /** Disables every option. Inherits from Field when omitted. */
  disabled?: boolean;
  /** Prevents clearing the current selection. */
  disallowEmptySelection?: boolean;
  /** Content displayed when options is empty. Defaults to 暂无选项. */
  emptyText?: string;
  /** Marks the listbox as invalid. Inherits from Field when omitted. */
  invalid?: boolean;
  /** Ordered options rendered by the listbox. */
  options: readonly CollectionOption[];
  /** Marks a selection as required. Inherits from Field when omitted. */
  required?: boolean;
}

export interface SingleListBoxProps extends ListBoxCommonProps {
  /** Initial value when uncontrolled. */
  defaultValue?: string | null;
  /** Called after the selected value changes. */
  onValueChange?: (value: string | null) => void;
  /** Single-selection mode. Defaults to single. */
  selectionMode?: "single";
  /** Current value when controlled. */
  value?: string | null;
}

export interface MultipleListBoxProps extends ListBoxCommonProps {
  /** Initial values when uncontrolled. */
  defaultValue?: string[];
  /** Called with all selected values after selection changes. */
  onValueChange?: (value: string[]) => void;
  /** Multiple-selection mode. */
  selectionMode: "multiple";
  /** Current values when controlled. */
  value?: string[];
}

export type ListBoxProps = SingleListBoxProps | MultipleListBoxProps;
