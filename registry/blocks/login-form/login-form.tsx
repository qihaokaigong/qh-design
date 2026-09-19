"use client";

import { Button, Card, Checkbox, Field, Input, Stack } from "@qh-design/react";
import type { FormEvent } from "react";

export interface LoginFormProps {
  /** Called after native validation succeeds. */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  /** Optional destination for password recovery. */
  forgotPasswordHref?: string;
}

export function LoginForm({
  forgotPasswordHref = "/forgot-password",
  onSubmit,
}: LoginFormProps) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <Card.Header>
        <Card.Title>登录</Card.Title>
        <Card.Description>使用你的工作邮箱继续。</Card.Description>
      </Card.Header>
      <Card.Content>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            onSubmit?.(event);
          }}
        >
          <Field required>
            <Field.Label>邮箱</Field.Label>
            <Input
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
            />
          </Field>
          <Field required>
            <Field.Label>密码</Field.Label>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </Field>
          <Stack gap="3">
            <Checkbox name="remember">保持登录</Checkbox>
            <a
              className="w-fit text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              href={forgotPasswordHref}
            >
              忘记密码？
            </a>
          </Stack>
          <Button className="w-full" type="submit">
            登录
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
}
