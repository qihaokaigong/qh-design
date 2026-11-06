"use client";

import { Button, ButtonLink, Drawer, IconButton } from "@qhkg/react";
import type { DrawerProps } from "@qhkg/react";
import { useRef } from "react";
import type { RefObject } from "react";

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
  /** Receives focus after closing if the trigger was hidden by a layout change. */
  fallbackFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Mobile primary navigation built on QH Drawer. Replace href values with the
 * consuming application's routes and derive current from its router.
 */
export function MobileNav({
  action,
  defaultOpen,
  fallbackFocusRef,
  description = "选择要前往的工作区页面。",
  items,
  onOpenChange,
  open,
  title = "主导航",
  triggerClassName,
  triggerLabel = "打开主导航",
}: MobileNavProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <Drawer defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange}>
      <Drawer.Trigger asChild>
        <IconButton
          ref={triggerRef}
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
      <Drawer.Content
        onCloseAutoFocus={(event) => {
          if (
            fallbackFocusRef?.current &&
            !triggerRef.current?.getClientRects().length
          ) {
            event.preventDefault();
            fallbackFocusRef.current.focus();
          }
        }}
      >
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
                    <span className="whitespace-normal text-start [overflow-wrap:anywhere]">
                      {item.label}
                    </span>
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
