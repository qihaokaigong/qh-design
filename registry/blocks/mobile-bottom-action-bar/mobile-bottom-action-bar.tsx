"use client";

import { useEffect, useRef, useState } from "react";
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
  const barRef = useRef<HTMLElement>(null);
  const [reservedHeight, setReservedHeight] = useState<number>();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => setReservedHeight(bar.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="h-40 shrink-0 md:hidden"
        data-qh-action-bar-spacer=""
        style={
          reservedHeight === undefined ? undefined : { height: reservedHeight }
        }
      />
      <aside
        ref={barRef}
        aria-label="页面操作"
        className="fixed inset-x-0 bottom-0 z-10 max-h-[50dvh] overflow-y-auto border-t border-border bg-surface pt-3 pr-[max(1rem,env(safe-area-inset-right))] pb-[calc(0.75rem+env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] md:static md:max-h-none md:rounded-lg md:border md:p-4"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3">
          {summary ? (
            <div className="min-w-0 grow basis-64 text-sm break-words text-muted-foreground">
              {summary}
            </div>
          ) : null}
          <div
            className={`grid min-w-0 grow basis-64 gap-2 ${secondaryAction ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {secondaryAction}
            {primaryAction}
          </div>
        </div>
      </aside>
    </>
  );
}
