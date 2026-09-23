"use client";

import { Button, ButtonLink, Drawer, IconButton } from "@qhkg/react";
import type { DrawerProps } from "@qhkg/react";

export interface NavigationItem {
  current?: boolean;
  href: string;
  label: string;
}

export interface MobileNavProps
  extends Pick<DrawerProps, "defaultOpen" | "onOpenChange" | "open"> {
  action?: NavigationItem;
  description?: string;
  items: readonly NavigationItem[];
  title?: string;
  triggerClassName?: string;
  triggerLabel?: string;
}

/**
 * Mobile primary navigation built on QH Drawer. Replace href values with the
 * consuming application's routes and derive current from its router.
 */
export function MobileNav({
  action,
  defaultOpen,
  description = "选择要前往的工作区页面。",
  items,
  onOpenChange,
  open,
  title = "主导航",
  triggerClassName,
  triggerLabel = "打开主导航",
}: MobileNavProps) {
  return (
    <Drawer defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>
        <IconButton
          aria-label={triggerLabel}
          className={triggerClassName}
          variant="secondary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M4 7h16M4 12h16M4 17h16"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Title>{title}</Drawer.Title>
        <Drawer.Description>{description}</Drawer.Description>
        <nav aria-label="移动端主导航">
          <ul className="grid list-none gap-2 p-0">
            {items.map((item) => (
              <li key={item.href}>
                <Drawer.Close asChild>
                  <ButtonLink
                    aria-current={item.current ? "page" : undefined}
                    className="w-full justify-start"
                    href={item.href}
                    variant={item.current ? "secondary" : "ghost"}
                  >
                    {item.label}
                  </ButtonLink>
                </Drawer.Close>
              </li>
            ))}
          </ul>
        </nav>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">关闭</Button>
          </Drawer.Close>
          {action ? (
            <Drawer.Close asChild>
              <ButtonLink href={action.href}>{action.label}</ButtonLink>
            </Drawer.Close>
          ) : null}
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
