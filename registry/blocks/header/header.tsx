import { ButtonLink, PageContainer } from "@qhkg/react";

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
  return (
    <header className="border-b border-border bg-surface">
      <PageContainer className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-2 py-2">
        <ButtonLink href={homeHref} variant="ghost">
          {brandName}
        </ButtonLink>

        <nav aria-label="主导航" className="hidden md:block">
          <ul className="flex list-none items-center justify-center gap-1 p-0">
            {items.map((item) => (
              <li key={item.href}>
                <ButtonLink
                  aria-current={item.current ? "page" : undefined}
                  href={item.href}
                  variant={item.current ? "secondary" : "ghost"}
                >
                  {item.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          {action ? (
            <ButtonLink href={action.href}>{action.label}</ButtonLink>
          ) : null}
          <MobileNav
            items={items}
            title={`${brandName}导航`}
            triggerClassName="md:hidden"
          />
        </div>
      </PageContainer>
    </header>
  );
}
