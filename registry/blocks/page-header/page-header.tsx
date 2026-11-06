import { Breadcrumb, Heading, Text } from "@qhkg/react";
import type { BreadcrumbItem } from "@qhkg/react";
import type { ReactNode } from "react";

export interface PageHeaderProps {
  actions?: ReactNode;
  breadcrumbs?: readonly BreadcrumbItem[];
  description?: ReactNode;
  title: ReactNode;
}

/** Page title region with hierarchy, supporting copy, and visible actions. */
export function PageHeader({
  actions,
  breadcrumbs,
  description,
  title,
}: PageHeaderProps) {
  return (
    <header className="grid gap-4">
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <Breadcrumb items={breadcrumbs} />
      ) : null}
      <div className="flex min-w-0 flex-wrap items-start gap-4">
        <div className="grid min-w-0 grow basis-80 gap-2 [overflow-wrap:anywhere]">
          <Heading level={1}>{title}</Heading>
          {description ? (
            <Text as="p" tone="muted">
              {description}
            </Text>
          ) : null}
        </div>
        {actions ? (
          <div
            aria-label="页面操作"
            className="flex min-w-0 max-w-full flex-wrap gap-2"
            role="group"
          >
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
