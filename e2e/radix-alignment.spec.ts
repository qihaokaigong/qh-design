import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});
async function openStory(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&embed=true`);
  await expect(page.locator("#storybook-root > main")).toBeVisible();
}
async function color(page: Page, token: string) {
  return page.evaluate((name) => {
    const probe = document.createElement("span");
    probe.style.color = `var(${name})`;
    document.body.append(probe);
    const value = getComputedStyle(probe).color;
    probe.remove();
    return value;
  }, token);
}
async function pressCheck(
  page: Page,
  control: Locator,
  property: string,
  expected: string,
) {
  await control.hover();
  await page.mouse.down();
  try {
    await expect(control).toHaveCSS(property, expected);
  } finally {
    await page.mouse.up();
  }
}

test("matching input groups stay at their size with and without clear actions", async ({
  page,
}) => {
  await openStory(page, "forms-searchinput--sizes");
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [size, height] of [
      ["sm", 36],
      ["md", 44],
      ["lg", 48],
    ] as const) {
      const input = page.getByRole("searchbox", { name: `搜索（${size}）` });
      const group = input.locator("..");
      expect((await group.boundingBox())!.height).toBe(height);
      await input.fill("QH");
      expect((await group.boundingBox())!.height).toBe(height);
      const clear = group.getByRole("button", { name: "清除搜索" });
      expect((await clear.boundingBox())!.height).toBeGreaterThanOrEqual(
        height,
      );
      // The input's trailing text area must not contain a second native clear action.
      const bounds = (await input.boundingBox())!;
      await input.click({
        position: { x: bounds.width - 20, y: bounds.height / 2 },
      });
      await expect(input).toHaveValue("QH");
      await clear.click();
      await expect(input).toHaveValue("");
      await expect(input).toBeFocused();
      expect((await group.boundingBox())!.height).toBe(height);
      await expect(input).toHaveCSS("font-size", "16px");
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await openStory(page, "forms-inputgroup--sizes");
  for (const [size, height] of [
    ["sm", 36],
    ["md", 44],
    ["lg", 48],
  ] as const) {
    const input = page.getByRole("textbox", { name: `搜索（${size}）` });
    expect((await input.locator("..").boundingBox())!.height).toBe(height);
  }
  await openStory(page, "forms-select--sizes");
  for (const [size, height] of [
    ["sm", 36],
    ["md", 44],
    ["lg", 48],
  ] as const) {
    expect(
      (await page
        .getByRole("combobox", { name: `团队（${size}）` })
        .boundingBox())!.height,
    ).toBe(height);
  }
});

test("native fields and grouped inputs keep hover, invalid and focus independent", async ({
  page,
}) => {
  for (const [id, role, label] of [
    ["forms-input", "textbox", "输入"],
    ["forms-textarea", "textbox", "说明"],
    ["forms-select", "combobox", "选择"],
  ] as const) {
    await openStory(page, id + "--interaction-states");
    const normal = page.getByRole(role, { name: `正常${label}` });
    const invalid = page.getByRole(role, { name: `无效${label}` });
    const disabled = page.getByRole(role, { name: `禁用${label}` });
    await normal.hover();
    await expect(normal).toHaveCSS(
      "border-top-color",
      await color(page, "--qh-color-border-control-hover"),
    );
    await page.keyboard.press("Tab");
    await invalid.focus();
    await expect(invalid).toHaveCSS(
      "border-top-color",
      await color(page, "--qh-color-danger"),
    );
    await expect(invalid).toHaveCSS(
      "outline-color",
      await color(page, "--qh-color-focus"),
    );
    await expect(invalid).toHaveCSS("outline-width", "2px");
    await invalid.hover();
    await expect(invalid).toHaveCSS(
      "border-top-color",
      await color(page, "--qh-color-danger"),
    );
    await disabled.hover();
    await expect(disabled).toBeDisabled();
    await expect(disabled).toHaveCSS(
      "background-color",
      await color(page, "--qh-color-disabled-bg"),
    );
  }
  await openStory(page, "forms-inputgroup--default");
  const input = page.getByRole("textbox", { name: "搜索" });
  const group = input.locator("..");
  await group.hover();
  await expect(group).toHaveCSS(
    "border-top-color",
    await color(page, "--qh-color-border-control-hover"),
  );
  await input.focus();
  await expect(group).toHaveCSS("outline-width", "2px");
  await expect(input).toHaveCSS("border-top-width", "0px");
  await expect(input).toHaveCSS("outline-width", "0px");
  await openStory(page, "forms-inputgroup--invalid");
  const invalidGroup = page
    .getByRole("textbox", { name: "域名" })
    .locator("..");
  await invalidGroup.hover();
  await expect(invalidGroup).toHaveCSS(
    "border-top-color",
    await color(page, "--qh-color-danger"),
  );
});

test("soft and outline preserve hierarchy, open state, focus and icon targets", async ({
  page,
  browserName,
}) => {
  await openStory(page, "actions-button--emphasis");
  const soft = page.getByRole("button", { name: "预览更改" });
  const outline = page.getByRole("button", { name: "导出设置" });
  await expect(soft).toHaveCSS(
    "background-color",
    await color(page, "--qh-color-action-soft"),
  );
  await expect(outline).toHaveCSS(
    "border-top-color",
    await color(page, "--qh-color-action"),
  );
  for (const button of [soft, outline]) {
    await button.hover();
    await expect(button).toHaveCSS(
      "color",
      await color(page, "--qh-color-on-action-soft-hover"),
    );
    await pressCheck(
      page,
      button,
      "background-color",
      await color(page, "--qh-color-action-pressed"),
    );
  }
  // A modal Menu hides background roles from the accessibility tree while open.
  const trigger = page
    .locator("#storybook-root button")
    .filter({ hasText: "更多操作" });
  await trigger.click();
  await expect(page.getByRole("menu")).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(trigger).toHaveCSS(
    "background-color",
    await color(page, "--qh-color-action-pressed"),
  );
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  // Firefox retains pointer modality on restored focus until a Tab navigation.
  if (browserName === "firefox") {
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
  }
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveCSS("outline-width", "2px");
  await expect(page.getByRole("button", { name: "禁用预览" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "正在导出" })).toBeDisabled();
  await expect(page.getByRole("link", { name: "查看预览" })).toHaveAttribute(
    "href",
    "#preview",
  );
  await openStory(page, "actions-iconbutton--emphasis");
  for (const name of ["搜索项目", "更多项目操作"]) {
    const bounds = (await page.getByRole("button", { name }).boundingBox())!;
    expect(bounds.width).toBe(44);
    expect(bounds.height).toBe(44);
  }
});

test("selection controls cover hover and press without obscuring errors or disabled states", async ({
  page,
  browserName,
}) => {
  await openStory(page, "forms-checkbox--interaction-states");
  const checkbox = page.getByRole("checkbox", {
    name: "已选择项目",
    exact: true,
  });
  await checkbox.hover();
  await expect(checkbox).toHaveCSS(
    "background-color",
    await color(page, "--qh-color-action-hover"),
  );
  await pressCheck(
    page,
    checkbox,
    "background-color",
    await color(page, "--qh-color-action-pressed"),
  );
  await expect(checkbox).not.toBeChecked();
  await checkbox.press("Space");
  await expect(checkbox).toBeChecked();
  const error = page.getByRole("checkbox", { name: "无效项目" });
  await error.hover();
  await expect(error).toHaveCSS(
    "border-top-color",
    await color(page, "--qh-color-danger"),
  );
  await expect(
    page.getByRole("checkbox", { name: "禁用项目", exact: true }),
  ).toBeDisabled();
  await openStory(page, "forms-radiogroup--interaction-states");
  const radio = page.getByRole("radio", { name: "团队项目" });
  await radio.hover();
  await expect(radio).toHaveCSS(
    "border-top-color",
    await color(page, "--qh-color-action-hover"),
  );
  await pressCheck(
    page,
    radio,
    "border-top-color",
    await color(page, "--qh-color-action-pressed"),
  );
  await radio.press("ArrowDown", { delay: 40 });
  await expect(page.getByRole("radio", { name: "私有项目" })).toBeChecked();
  const disabled = page.getByRole("radio", { name: "禁用已选项目" });
  await expect(disabled).toBeDisabled();
  await expect(disabled.locator("span")).toHaveCSS(
    "background-color",
    await color(page, "--qh-color-disabled-text"),
  );
  await openStory(page, "forms-switch--interaction-states");
  const toggle = page.getByRole("switch", { name: "已启用通知" });
  await toggle.hover();
  await expect(toggle).toHaveCSS(
    "background-color",
    await color(page, "--qh-color-action-hover"),
  );
  await pressCheck(
    page,
    toggle,
    "background-color",
    await color(page, "--qh-color-action-pressed"),
  );
  await expect(toggle).not.toBeChecked();
  const invalid = page.getByRole("switch", { name: "无效通知" });
  await invalid.focus();
  if (browserName === "firefox") {
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
  }
  await expect(invalid).toBeFocused();
  await invalid.press("Space");
  await expect(invalid).toHaveCSS(
    "outline-color",
    await color(page, "--qh-color-focus"),
  );
  expect(
    await invalid.evaluate((element) => getComputedStyle(element).boxShadow),
  ).toContain(await color(page, "--qh-color-danger"));
  await expect(page.getByRole("switch", { name: "禁用通知" })).toBeDisabled();
});

test("tabs keep their active accent and RTL switches stay inside their track", async ({
  page,
}) => {
  await openStory(page, "navigation-tabs--interaction-states");
  const tab = page.getByRole("tab", { name: "概览" });
  await tab.hover();
  await expect(tab).toHaveCSS("color", await color(page, "--qh-color-action"));
  await pressCheck(
    page,
    tab,
    "background-color",
    await color(page, "--qh-color-surface-pressed"),
  );
  await tab.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "活动" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tab", { name: "已归档" })).toBeDisabled();
  await openStory(page, "forms-switch--right-to-left");
  const toggle = page.getByRole("switch");
  for (let index = 0; index < 2; index++) {
    const track = (await toggle.boundingBox())!;
    const thumb = (await toggle.locator("span").boundingBox())!;
    expect(thumb.x).toBeGreaterThanOrEqual(track.x);
    expect(thumb.x + thumb.width).toBeLessThanOrEqual(track.x + track.width);
    if (index === 0) expect(thumb.x - track.x).toBeCloseTo(2, 0);
    await toggle.click();
  }
});

test("the complete visual workbench reflows and preserves form and menu tasks", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await openStory(page, "foundation-visuallanguage--default");
    await expect(
      page.getByRole("heading", { level: 1, name: "项目设置" }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "保存设置" }).click();
    await expect(page.getByRole("status")).toHaveText("项目设置已保存。");
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.getByRole("textbox", { name: "项目名称" })).toHaveCSS(
    "font-size",
    "32px",
  );
});
