import { ButtonLink, Heading } from "@qhkg/react";

export interface SideNavItem {
  current?: boolean;
  href: string;
  label: string;
}

export interface SideNavProps {
  items: readonly SideNavItem[];
  label?: string;
  title?: string;
}

/** Secondary navigation for settings, project, and account sections. */
export function SideNav({
  items,
  label = "页面内导航",
  title = "本页内容",
}: SideNavProps) {
  return (
    <nav
      aria-label={label}
      className="grid w-full min-w-0 gap-3 rounded-lg border border-border bg-surface p-3 md:max-w-64 [overflow-wrap:anywhere]"
    >
      <Heading level={2} size="sm">
        {title}
      </Heading>
      <ul className="grid list-none gap-1 p-0">
        {items.map((item) => (
          <li key={item.href}>
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
          </li>
        ))}
      </ul>
    </nav>
  );
}
