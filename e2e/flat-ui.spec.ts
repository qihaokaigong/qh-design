import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function openStory(page: Page, id: string) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story&embed=true`);
  await expect(page.locator("#storybook-root > main")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

test("tool pages use one gutter and restrained semantic titles", async ({
  page,
}) => {
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    const gutter = width < 768 ? 16 : width < 1024 ? 24 : 32;
    for (const id of [
      "patterns-projectlistpage--default",
      "patterns-projectdetailpage--default",
      "patterns-searchresultspage--default",
    ]) {
      await openStory(page, id);
      const canvas = page.locator("#storybook-root > main");
      const container = canvas.locator(":scope > div");
      const heading = canvas.getByRole("heading", { level: 1 });
      await expect(canvas).toHaveCSS("padding-left", "0px");
      await expect(container).toHaveCSS("padding-left", `${gutter}px`);
      const title = (await heading.boundingBox())!;
      const bounds = (await container.boundingBox())!;
      expect(title.x - bounds.x).toBeCloseTo(gutter, 0);
      const fontSize = await heading.evaluate((element) =>
        parseFloat(getComputedStyle(element).fontSize),
      );
      expect(fontSize).toBeGreaterThanOrEqual(24);
      expect(fontSize).toBeLessThanOrEqual(32);
      if (width === 375) expect(fontSize).toBe(24);
      if (width === 1280) expect(fontSize).toBe(32);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
});

test("embedded filters are unframed while standalone blocks keep their border", async ({
  page,
}) => {
  await openStory(page, "patterns-projectlistpage--default");
  await expect(page.getByRole("form", { name: "项目筛选" })).toHaveCSS(
    "border-top-width",
    "0px",
  );
  await expect(page.getByRole("region", { name: "项目列表" })).toBeVisible();
  // The accessible partition remains without a duplicate visual heading.
  const partition = page.locator("#project-list-heading");
  expect((await partition.boundingBox())!.width).toBeLessThanOrEqual(1);
  await openStory(page, "patterns-filterbar--default");
  const standalone = page.getByRole("form", { name: "项目筛选" });
  await expect(standalone).toHaveCSS("border-top-width", "1px");
  await expect(standalone).toHaveCSS("padding-left", "16px");
  await openStory(page, "patterns-toolbar--plain");
  await expect(page.getByRole("region", { name: "列表工具" })).toHaveCSS(
    "border-top-width",
    "0px",
  );
});

test("quiet actions keep transparent borders, pressed feedback and keyboard focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openStory(page, "actions-button--quiet-actions");
  const ghost = page.getByRole("button", { name: "清除筛选" });
  await ghost.hover();
  await expect(ghost).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
  const hover = await ghost.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  await page.mouse.down();
  await expect(ghost).toHaveCSS("box-shadow", "none");
  await expect(ghost).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
  const pressed = await ghost.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  expect(pressed).not.toBe(hover);
  await page.mouse.up();
  const link = page.getByRole("link", { name: "查看详情" });
  await link.hover();
  await expect(link).toHaveCSS("border-top-color", "rgba(0, 0, 0, 0)");
  await page.keyboard.press("Tab");
  await ghost.focus();
  await expect(ghost).toHaveCSS("outline-style", "solid");
  await expect(ghost).toHaveCSS("outline-width", "2px");
  await expect(page.getByRole("button", { name: "禁用操作" })).toBeDisabled();
  const loading = page.getByRole("button", { name: "正在处理" });
  await expect(loading).toHaveAttribute("aria-busy", "true");
  await expect(loading).toBeDisabled();
});

test("UI typography is opt-in and text zoom preserves control access", async ({
  page,
}) => {
  await openStory(page, "foundation-text--typography-roles");
  const paragraphs = page.locator("#storybook-root p");
  await expect(paragraphs.nth(0)).toHaveCSS("line-height", "28px");
  await expect(paragraphs.nth(1)).toHaveCSS("line-height", "24px");
  await page.setViewportSize({ width: 375, height: 900 });
  await openStory(page, "patterns-projectlistpage--default");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  const select = page.getByRole("combobox", { name: "状态" });
  await expect(select).toHaveCSS("font-size", "32px");
  const bounds = (await select.boundingBox())!;
  expect(bounds.height).toBeGreaterThanOrEqual(44);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(375);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "应用筛选" }).click();
  await expect(page.getByText("共 8 个项目，已选择 0 个")).toBeVisible();
});
