"use client";

import {
  Alert,
  Badge,
  Button,
  ButtonLink,
  Card,
  EmptyState,
  Heading,
  PageContainer,
  Skeleton,
  Text,
} from "@qhkg/react";

import { PageHeader } from "../page-header/page-header";

export type ProjectDetailState = "ready" | "loading" | "error" | "not-found";
export type ProjectDetailStatus = "active" | "completed" | "archived";

export interface ProjectActivity {
  id: string;
  summary: string;
  time: string;
}

export interface ProjectDetail {
  activities: readonly ProjectActivity[];
  createdAt: string;
  description: string;
  id: string;
  name: string;
  owner: string;
  status: ProjectDetailStatus;
  updatedAt: string;
}

export interface ProjectDetailPageProps {
  editHref?: string;
  listHref?: string;
  onArchive?: (projectId: string) => void;
  onRetry?: () => void;
  project?: ProjectDetail;
  state?: ProjectDetailState;
}

export const demoProjectDetail: ProjectDetail = {
  activities: [
    {
      id: "activity-1",
      summary: "完成移动端导航键盘验收",
      time: "今天 10:24",
    },
    {
      id: "activity-2",
      summary: "更新组件接入说明",
      time: "昨天 16:08",
    },
    {
      id: "activity-3",
      summary: "发布 0.5.0 版本",
      time: "2026-09-18",
    },
  ],
  createdAt: "2026-08-12",
  description: "统一多个 React 项目的组件、交互规范和 AI 接入方式。",
  id: "QH-108",
  name: "QH 设计系统",
  owner: "林晓",
  status: "active",
  updatedAt: "2026-09-22",
};

const statusPresentation: Record<
  ProjectDetailStatus,
  { label: string; tone: "info" | "success" | "neutral" }
> = {
  active: { label: "进行中", tone: "info" },
  completed: { label: "已完成", tone: "success" },
  archived: { label: "已归档", tone: "neutral" },
};

/** Complete detail-page shell with visible actions and resilient data states. */
export function ProjectDetailPage({
  editHref = "#edit-project",
  listHref = "#projects",
  onArchive,
  onRetry,
  project = demoProjectDetail,
  state = "ready",
}: ProjectDetailPageProps) {
  const presentation = statusPresentation[project.status];
  const title = state === "ready" ? project.name : "项目详情";

  return (
    <PageContainer className="grid gap-6 py-6 md:gap-8 md:py-8">
      <PageHeader
        actions={
          state === "ready" ? (
            <>
              <Button
                variant="secondary"
                onClick={() => onArchive?.(project.id)}
              >
                归档项目
              </Button>
              <ButtonLink href={editHref}>编辑项目</ButtonLink>
            </>
          ) : undefined
        }
        breadcrumbs={[
          { id: "home", label: "首页", href: "#home" },
          { id: "projects", label: "项目", href: listHref },
          { id: "current", label: title },
        ]}
        description={state === "ready" ? project.description : undefined}
        title={title}
      />

      {state === "error" ? (
        <Alert
          action={
            <Button variant="secondary" onClick={onRetry}>
              重试
            </Button>
          }
          title="项目加载失败"
          tone="danger"
        >
          请检查网络连接后重试。
        </Alert>
      ) : null}

      {state === "not-found" ? (
        <section aria-labelledby="missing-project-heading">
          <Heading className="sr-only" id="missing-project-heading" level={2}>
            项目不可用
          </Heading>
          <EmptyState
            action={<ButtonLink href={listHref}>返回项目列表</ButtonLink>}
            description="项目可能已被删除，或你没有查看权限。"
            title="找不到这个项目"
          />
        </section>
      ) : null}

      {state === "loading" ? (
        <section
          aria-busy="true"
          aria-label="正在加载项目详情"
          className="grid gap-4"
        >
          <Text role="status" size="sm" tone="muted">
            正在加载项目详情…
          </Text>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
            <Skeleton className="h-72" variant="rectangular" />
            <Skeleton className="h-72" variant="rectangular" />
          </div>
        </section>
      ) : null}

      {state === "ready" ? (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:items-start">
          <div className="grid gap-4">
            <section aria-labelledby="overview-heading">
              <Card>
                <Card.Header>
                  <Heading id="overview-heading" level={2} size="md">
                    项目概览
                  </Heading>
                </Card.Header>
                <Card.Content className="grid gap-4">
                  <Text as="p">{project.description}</Text>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-1">
                      <dt className="text-sm text-muted-foreground">
                        项目编号
                      </dt>
                      <dd>{project.id}</dd>
                    </div>
                    <div className="grid gap-1">
                      <dt className="text-sm text-muted-foreground">状态</dt>
                      <dd>
                        <Badge tone={presentation.tone}>
                          {presentation.label}
                        </Badge>
                      </dd>
                    </div>
                    <div className="grid gap-1">
                      <dt className="text-sm text-muted-foreground">负责人</dt>
                      <dd>{project.owner}</dd>
                    </div>
                    <div className="grid gap-1">
                      <dt className="text-sm text-muted-foreground">
                        创建时间
                      </dt>
                      <dd>{project.createdAt}</dd>
                    </div>
                  </dl>
                </Card.Content>
              </Card>
            </section>

            <section aria-labelledby="activity-heading">
              <Card>
                <Card.Header>
                  <Heading id="activity-heading" level={2} size="md">
                    最近动态
                  </Heading>
                </Card.Header>
                <Card.Content>
                  {project.activities.length > 0 ? (
                    <ol className="grid list-none gap-4 p-0">
                      {project.activities.map((activity) => (
                        <li
                          className="grid gap-1 border-b border-border pb-4 last:border-0 last:pb-0"
                          key={activity.id}
                        >
                          <Text weight="medium">{activity.summary}</Text>
                          <Text size="sm" tone="muted">
                            {activity.time}
                          </Text>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <Text as="p" tone="muted">
                      暂无项目动态。
                    </Text>
                  )}
                </Card.Content>
              </Card>
            </section>
          </div>

          <aside aria-labelledby="metadata-heading">
            <Card variant="filled">
              <Card.Header>
                <Heading id="metadata-heading" level={2} size="sm">
                  项目信息
                </Heading>
              </Card.Header>
              <Card.Content>
                <dl className="grid gap-4">
                  <div className="grid gap-1">
                    <dt className="text-sm text-muted-foreground">最近更新</dt>
                    <dd>{project.updatedAt}</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="text-sm text-muted-foreground">负责人</dt>
                    <dd>{project.owner}</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="text-sm text-muted-foreground">状态</dt>
                    <dd>{presentation.label}</dd>
                  </div>
                </dl>
              </Card.Content>
            </Card>
          </aside>
        </div>
      ) : null}
    </PageContainer>
  );
}
