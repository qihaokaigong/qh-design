import type { ReactNode } from "react";

export interface MobileBottomActionBarProps {
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
  /** Short context shown above the actions on narrow screens. */
  summary?: ReactNode;
}

export function MobileBottomActionBar({
  primaryAction,
  secondaryAction,
  summary,
}: MobileBottomActionBarProps) {
  return (
    <aside
      aria-label="页面操作"
      className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-surface px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:static md:rounded-lg md:border md:p-4"
    >
      <div className="mx-auto grid w-full max-w-5xl gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        {summary ? (
          <div className="text-sm text-muted-foreground">{summary}</div>
        ) : (
          <span />
        )}
        <div className="grid grid-cols-2 gap-2 md:flex md:justify-end">
          {secondaryAction ?? <span />}
          {primaryAction}
        </div>
      </div>
    </aside>
  );
}
