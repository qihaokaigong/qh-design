import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { expect, fn, userEvent, within } from "storybook/test";

import { Button } from "../components/button";
import { Card } from "../components/card";
import { Combobox } from "../components/combobox";
import { Field } from "../components/field";
import { Inline } from "../components/inline";
import { Input } from "../components/input";
import { MultiSelect } from "../components/multi-select";
import { Stack } from "../components/stack";

const officeOptions = [
  { value: "beijing", label: "北京" },
  { value: "hong-kong", label: "香港" },
  { value: "singapore", label: "新加坡" },
];

const teamOptions = [
  { value: "design", label: "设计" },
  { value: "engineering", label: "工程" },
  { value: "operations", label: "运营" },
];

interface FormValues {
  office: string | null;
  projectName: string;
  teams: string[];
}

interface ReactHookFormExampleProps {
  onSubmit: (value: FormValues) => void;
}

function ReactHookFormExample({ onSubmit }: ReactHookFormExampleProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      office: null,
      projectName: "QH Design",
      teams: [],
    },
  });

  return (
    <Card style={{ inlineSize: "100%", maxInlineSize: 440 }}>
      <Card.Header>
        <Card.Title>创建项目</Card.Title>
        <Card.Description>
          原生输入使用 register，复杂选择控件使用 Controller。
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form
          noValidate
          onSubmit={handleSubmit((value) => {
            setSubmitted(true);
            onSubmit(value);
          })}
        >
          <Stack gap="6">
            <Field invalid={Boolean(errors.projectName)} required>
              <Field.Label>项目名称</Field.Label>
              <Input
                autoComplete="organization"
                {...register("projectName", {
                  required: "请输入项目名称。",
                  minLength: {
                    value: 2,
                    message: "项目名称至少需要 2 个字符。",
                  },
                })}
              />
              <Field.Description>此字段直接注册原生输入。</Field.Description>
              <Field.Error>{errors.projectName?.message}</Field.Error>
            </Field>

            <Controller
              control={control}
              name="office"
              rules={{ required: "请选择办公地点。" }}
              render={({ field, fieldState }) => (
                <Field invalid={fieldState.invalid} required>
                  <Field.Label>办公地点</Field.Label>
                  <Combobox
                    ref={field.ref}
                    name={field.name}
                    options={officeOptions}
                    placeholder="搜索办公地点"
                    value={field.value}
                    onBlur={field.onBlur}
                    onValueChange={field.onChange}
                  />
                  <Field.Error>{fieldState.error?.message}</Field.Error>
                </Field>
              )}
            />

            <Controller
              control={control}
              name="teams"
              rules={{
                validate: (value) =>
                  value.length > 0 || "请至少选择一个参与团队。",
              }}
              render={({ field, fieldState }) => (
                <Field invalid={fieldState.invalid} required>
                  <Field.Label>参与团队</Field.Label>
                  <MultiSelect
                    ref={field.ref}
                    name={field.name}
                    options={teamOptions}
                    placeholder="选择团队"
                    value={field.value}
                    onBlur={field.onBlur}
                    onValueChange={field.onChange}
                  />
                  <Field.Error>{fieldState.error?.message}</Field.Error>
                </Field>
              )}
            />

            {submitted ? (
              <output aria-live="polite">表单已通过校验。</output>
            ) : null}

            <Inline justify="end">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  reset();
                  setSubmitted(false);
                }}
              >
                重置
              </Button>
              <Button
                type="submit"
                loading={isSubmitting}
                loadingText="正在创建"
              >
                创建项目
              </Button>
            </Inline>
          </Stack>
        </form>
      </Card.Content>
    </Card>
  );
}

const meta = {
  title: "Integrations/ReactHookForm",
  component: ReactHookFormExample,
  tags: ["autodocs", "ai-generated"],
  args: { onSubmit: fn() },
} satisfies Meta<typeof ReactHookFormExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);

    await userEvent.click(canvas.getByRole("button", { name: "创建项目" }));
    await expect(canvas.getByText("请选择办公地点。")).toBeVisible();
    await expect(canvas.getByText("请至少选择一个参与团队。")).toBeVisible();
    await expect(
      canvas.getByRole("combobox", { name: "办公地点" }),
    ).toHaveFocus();
    await expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByRole("button", { name: /显示选项/ }));
    await userEvent.click(await page.findByRole("option", { name: "北京" }));
    await userEvent.click(canvas.getByRole("button", { name: /参与团队/ }));
    await userEvent.click(await page.findByRole("option", { name: "设计" }));
    await userEvent.keyboard("{Escape}");
    await userEvent.click(canvas.getByRole("button", { name: "创建项目" }));

    await expect(args.onSubmit).toHaveBeenCalledWith({
      office: "beijing",
      projectName: "QH Design",
      teams: ["design"],
    });
    await expect(canvas.getByText("表单已通过校验。")).toBeVisible();
  },
};

export const Mobile: Story = {
  args: { onSubmit: fn() },
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
