"use client";

import { Button, Card, Field, Input, Select, Switch } from "@qhkg/react";
import type { FormEvent } from "react";

export interface SettingsFormProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export function SettingsForm({ onSubmit }: SettingsFormProps) {
  return (
    <Card className="w-full max-w-2xl">
      <Card.Header>
        <Card.Title>项目设置</Card.Title>
        <Card.Description>管理项目名称、可见范围和通知。</Card.Description>
      </Card.Header>
      <Card.Content>
        <form className="grid gap-6" onSubmit={onSubmit}>
          <Field required>
            <Field.Label>项目名称</Field.Label>
            <Input name="name" defaultValue="移动端应用" />
            <Field.Description>
              成员将在项目列表中看到这个名称。
            </Field.Description>
          </Field>
          <Field>
            <Field.Label>可见范围</Field.Label>
            <Select name="visibility" defaultValue="team">
              <option value="team">团队成员</option>
              <option value="private">仅受邀成员</option>
            </Select>
          </Field>
          <Switch name="notifications" defaultChecked>
            项目更新时发送通知
          </Switch>
          <div className="grid gap-2 sm:flex sm:justify-end">
            <Button type="reset" variant="secondary">
              重置
            </Button>
            <Button type="submit">保存设置</Button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}
