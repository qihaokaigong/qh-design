import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckboxGroup } from "../checkbox-group";
import { Fieldset } from "./Fieldset";

const meta = {
  title: "Forms/Fieldset",
  component: Fieldset,
  tags: ["autodocs", "ai-generated"],
  parameters: {
    docs: {
      description: {
        component:
          "使用原生 fieldset 与 legend 组织一组相关控件，并关联说明、必填和错误状态。",
      },
    },
  },
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

const Options = () => (
  <CheckboxGroup defaultValue={["email"]}>
    <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
    <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
    <CheckboxGroup.Item value="push">应用内通知</CheckboxGroup.Item>
  </CheckboxGroup>
);

export const Default: Story = {
  render: () => (
    <Fieldset style={{ maxWidth: 360 }}>
      <Fieldset.Legend>通知渠道</Fieldset.Legend>
      <Fieldset.Description>可以选择多个渠道。</Fieldset.Description>
      <Options />
    </Fieldset>
  ),
};

export const Playground: Story = Default;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--qh-space-6)" }}>
      <Fieldset required>
        <Fieldset.Legend>必选渠道</Fieldset.Legend>
        <Options />
      </Fieldset>
      <Fieldset disabled>
        <Fieldset.Legend>不可修改的渠道</Fieldset.Legend>
        <Options />
      </Fieldset>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Fieldset invalid required>
      <Fieldset.Legend>通知渠道</Fieldset.Legend>
      <CheckboxGroup>
        <CheckboxGroup.Item value="email">邮件</CheckboxGroup.Item>
        <CheckboxGroup.Item value="sms">短信</CheckboxGroup.Item>
      </CheckboxGroup>
      <Fieldset.Error>请至少选择一个通知渠道。</Fieldset.Error>
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset disabled>
      <Fieldset.Legend>通知渠道</Fieldset.Legend>
      <Options />
    </Fieldset>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Fieldset style={{ maxWidth: 360 }}>
      <Fieldset.Legend>团队活动与安全事件的通知渠道</Fieldset.Legend>
      <Fieldset.Description>
        这些设置会应用到项目邀请、权限变更、安全告警和每周协作摘要。
      </Fieldset.Description>
      <Options />
    </Fieldset>
  ),
};

export const Mobile: Story = {
  ...LongContent,
  parameters: { viewport: { defaultViewport: "mobile375" } },
};
