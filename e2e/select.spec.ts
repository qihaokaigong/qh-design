import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

async function openStory(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&embed=true`);
  await expect(page.locator("#storybook-root select").first()).toBeVisible();
}

async function expectIndicator(select: Locator, inset: number, rtl = false) {
  const icon = select.locator("..").locator(":scope > svg");
  const control = (await select.boundingBox())!;
  const arrow = (await icon.boundingBox())!;
  const actualInset = rtl
    ? arrow.x - control.x
    : control.x + control.width - arrow.x - arrow.width;
  expect(actualInset).toBeCloseTo(inset, 0);
  expect(arrow.y + arrow.height / 2).toBeCloseTo(
    control.y + control.height / 2,
    0,
  );
  const padding = await select.evaluate((element) =>
    parseFloat(getComputedStyle(element).paddingInlineEnd),
  );
  expect(padding).toBeGreaterThanOrEqual(inset + arrow.width + 8);
  // The decorative SVG must not intercept taps in the arrow area.
  expect(
    await select.evaluate(
      (element, point) => {
        return document.elementFromPoint(point.x, point.y) === element;
      },
      { x: arrow.x + arrow.width / 2, y: arrow.y + arrow.height / 2 },
    ),
  ).toBe(true);
}

test("select arrows keep their inset and text space across sizes and directions", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 800 });
    await openStory(page, "forms-select--sizes");
    for (const size of ["sm", "md", "lg"]) {
      await expectIndicator(
        page.getByRole("combobox", { name: `团队（${size}）` }),
        size === "lg" ? 16 : 12,
      );
    }
    const normal = page.getByRole("combobox", { name: "团队（md）" });
    expect((await normal.boundingBox())!.height).toBeGreaterThanOrEqual(44);
    await expect(normal).toHaveCSS("font-size", "16px");

    await openStory(page, "forms-select--long-content");
    await expectIndicator(page.getByRole("combobox", { name: "项目" }), 12);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }

  await openStory(page, "forms-select--right-to-left");
  const rtl = page.getByRole("combobox", { name: "الفريق" });
  await expectIndicator(rtl, 12, true);
  await rtl.evaluate((element) => {
    element.removeAttribute("dir");
    element.parentElement!.removeAttribute("dir");
    document.documentElement.dir = "rtl";
  });
  await expectIndicator(rtl, 12, true);
});

test("select keeps keyboard focus, selection and native multiple rendering", async ({
  page,
}) => {
  await openStory(page, "patterns-filterbar--default");
  const select = page.getByRole("combobox", { name: "状态" });
  await page.keyboard.press("Tab");
  await expect(page.getByRole("searchbox", { name: "搜索项目" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(select).toBeFocused();
  // OS popup key events cannot be driven consistently in headless browsers.
  // Exercise the native selection API and keyboard tab order independently.
  await select.selectOption("active");
  await expect(select).toHaveValue("active");
  await expect(select).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("searchbox", { name: "搜索项目" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(select).toBeFocused();
  await openStory(page, "forms-select--multiple");
  const multiple = page.getByRole("listbox", { name: "团队多选" });
  await expect(multiple.locator("..").locator("svg")).toHaveCount(0);
  await multiple.selectOption(["product", "engineering"]);
  await expect(multiple).toHaveValues(["product", "engineering"]);
});

test("forced colors restores the native select indicator", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Forced-colors emulation uses Chromium",
  );
  await page.emulateMedia({ forcedColors: "active" });
  await openStory(page, "forms-select--default");
  const select = page.getByRole("combobox", { name: "团队" });
  await expect(select).toHaveCSS("appearance", "auto");
  await expect(select.locator("..").locator("svg")).toBeHidden();
});
