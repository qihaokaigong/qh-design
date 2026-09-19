import type { HTMLAttributes, ReactNode } from "react";

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional primary or secondary action. */
  action?: ReactNode;
  /** Supporting guidance explaining the next useful step. */
  description?: ReactNode;
  /** Decorative illustration or icon. */
  icon?: ReactNode;
  /** Concise explanation of the empty state. */
  title: ReactNode;
}
