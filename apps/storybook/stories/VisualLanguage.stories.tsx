import {
  Badge,
  Button,
  ButtonLink,
  Card,
  Checkbox,
  Field,
  Heading,
  Input,
  Menu,
  PageContainer,
  RadioGroup,
  SearchInput,
  Select,
  Switch,
  Tabs,
  Text,
  Textarea,
} from "@qhkg/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

function ProjectSettings() {
  const [message, setMessage] = useState("");
  return (
    <PageContainer className="grid gap-6 py-6 md:gap-8 md:py-8">
      <header className="flex min-w-0 flex-wrap items-start justify-between gap-4">
        <div className="grid min-w-0 gap-2">
          <Heading level={1} size="lg">
            项目设置
          </Heading>
          <Text as="p" tone="muted" variant="ui">
            管理项目信息、协作方式与通知偏好。
          </Text>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="页面操作"
        >
          <ButtonLink href="#project-preview" variant="soft">
            查看预览
          </ButtonLink>
          <Menu>
            <Menu.Trigger asChild>
              <Button variant="outline">更多操作</Button>
            </Menu.Trigger>
            <Menu.Content align="end">
              <Menu.Item onSelect={() => setMessage("暂无未同步的变更。")}>
                查看变更记录
              </Menu.Item>
            </Menu.Content>
          </Menu>
          <Button type="submit" form="visual-settings">
            保存设置
          </Button>
        </div>
      </header>
      <Text
        role="status"
        variant="ui"
        tone="success"
        className={message ? undefined : "sr-only"}
      >
        {message}
      </Text>
      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)] lg:items-start">
        <Card>
          <Card.Header>
            <Heading level={2} size="md">
              基本信息
            </Heading>
            <Text tone="muted" variant="ui">
              清晰的项目资料有助于团队协作。
            </Text>
          </Card.Header>
          <Card.Content>
            <form
              id="visual-settings"
              className="grid gap-6"
              onSubmit={(event) => {
                event.preventDefault();
                setMessage("项目设置已保存。");
              }}
            >
              <Field required>
                <Field.Label>项目名称</Field.Label>
                <Input name="project" defaultValue="QH 设计系统" />
              </Field>
              <Field>
                <Field.Label>可见范围</Field.Label>
                <Select name="visibility">
                  <option value="team">团队成员</option>
                  <option value="private">仅受邀成员</option>
                </Select>
              </Field>
              <Field>
                <Field.Label>搜索项目资料</Field.Label>
                <SearchInput placeholder="名称、文档或负责人" />
              </Field>
              <Field>
                <Field.Label>项目说明</Field.Label>
                <Textarea
                  name="description"
                  defaultValue="统一组件体验，让团队更专注于产品本身。"
                />
              </Field>
              <Field>
                <Field.Label>通知频率</Field.Label>
                <RadioGroup name="frequency" defaultValue="daily">
                  <RadioGroup.Item value="instant">立即通知</RadioGroup.Item>
                  <RadioGroup.Item value="daily">每日汇总</RadioGroup.Item>
                </RadioGroup>
              </Field>
              <div className="grid gap-2">
                <Checkbox defaultChecked>自动同步项目资料</Checkbox>
                <Switch defaultChecked>启用邮件通知</Switch>
              </div>
            </form>
          </Card.Content>
        </Card>
        <aside
          className="grid min-w-0 gap-6"
          id="project-preview"
          aria-label="项目预览"
        >
          <Card variant="filled">
            <Card.Header>
              <Heading level={2} size="md">
                QH 设计系统
              </Heading>
            </Card.Header>
            <Card.Content>
              <Badge tone="info" className="justify-self-start">
                进行中
              </Badge>
              <Text variant="ui">暖纸色与蓝色，清晰的层级与轻量的界面。</Text>
              <Text size="sm" tone="muted" variant="ui">
                负责人：林晓 · 3 位成员
              </Text>
            </Card.Content>
          </Card>
          <section className="grid gap-4" aria-labelledby="activity-title">
            <Heading id="activity-title" level={2} size="md">
              协作动态
            </Heading>
            <Tabs defaultValue="activity">
              <Tabs.List aria-label="协作视图">
                <Tabs.Trigger value="activity">动态</Tabs.Trigger>
                <Tabs.Trigger value="members">成员</Tabs.Trigger>
                <Tabs.Trigger value="archive" disabled>
                  归档
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="activity">
                <Text variant="ui">最近完成了组件体验优化。</Text>
              </Tabs.Content>
              <Tabs.Content value="members">
                <Text variant="ui">林晓、陈一、周芮</Text>
              </Tabs.Content>
            </Tabs>
          </section>
        </aside>
      </div>
    </PageContainer>
  );
}

const meta = {
  title: "Foundation/VisualLanguage",
  component: ProjectSettings,
  tags: ["autodocs", "ai-generated"],
  parameters: { layout: "fullscreen", qh: { page: true } },
} satisfies Meta<typeof ProjectSettings>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("searchbox", { name: "搜索项目资料" }),
      "组件",
    );
    await userEvent.click(canvas.getByRole("button", { name: "清除搜索" }));
    await userEvent.click(canvas.getByRole("button", { name: "保存设置" }));
    await expect(canvas.getByRole("status")).toHaveTextContent(
      "项目设置已保存。",
    );
    await userEvent.click(
      canvas.getByRole("tab", { name: "成员", exact: true }),
    );
    await expect(canvas.getByText("林晓、陈一、周芮")).toBeVisible();
  },
};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
