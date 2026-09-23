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
      className="grid gap-3 rounded-lg border border-border bg-surface p-3 md:w-64"
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
              {item.label}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
