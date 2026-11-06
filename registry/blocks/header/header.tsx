"use client";

import { ButtonLink, PageContainer } from "@qhkg/react";
import { useRef } from "react";

import { MobileNav, type NavigationItem } from "../mobile-nav/mobile-nav";

export interface HeaderProps {
  action?: NavigationItem;
  brandName?: string;
  homeHref?: string;
  items: readonly NavigationItem[];
}

/**
 * Responsive application header. Keep route awareness in the application and
 * pass one current item so desktop and mobile navigation stay synchronized.
 */
export function Header({
  action,
  brandName = "QH 工作台",
  homeHref = "#home",
  items,
}: HeaderProps) {
  const homeRef = useRef<HTMLAnchorElement>(null);
  return (
    <header className="@container/qh-header border-b border-border bg-surface">
      <PageContainer className="flex min-h-16 min-w-0 flex-wrap items-center justify-between gap-2 py-2">
        <ButtonLink
          ref={homeRef}
          className="min-w-0 max-w-full"
          href={homeHref}
          variant="ghost"
        >
          <span className="whitespace-normal text-start [overflow-wrap:anywhere]">
            {brandName}
          </span>
        </ButtonLink>

        <nav
          aria-label="主导航"
          className="hidden min-w-0 @min-[48rem]/qh-header:block"
        >
          <ul className="flex list-none flex-wrap items-center justify-center gap-1 p-0">
            {items.map((item) => (
              <li key={item.href}>
                <ButtonLink
                  aria-current={item.current ? "page" : undefined}
                  className="min-w-0 max-w-full"
                  href={item.href}
                  variant={item.current ? "secondary" : "ghost"}
                >
                  <span className="whitespace-normal text-start [overflow-wrap:anywhere]">
                    {item.label}
                  </span>
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-0 max-w-full flex-wrap items-center justify-end gap-2">
          {action ? (
            <ButtonLink className="min-w-0 max-w-full" href={action.href}>
              <span className="whitespace-normal text-start [overflow-wrap:anywhere]">
                {action.label}
              </span>
            </ButtonLink>
          ) : null}
          <MobileNav
            fallbackFocusRef={homeRef}
            items={items}
            title={`${brandName}导航`}
            triggerClassName="@min-[48rem]/qh-header:hidden!"
          />
        </div>
      </PageContainer>
    </header>
  );
}
