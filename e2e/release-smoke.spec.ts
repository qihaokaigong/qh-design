import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

async function openStory(page: Page, id: string) {
  await page.goto("/iframe.html?id=" + id + "&viewMode=story");
  await expect(page.locator("main")).toBeVisible();
}

async function expectNoPageOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
}

test("serves the public Registry and AI discovery files", async ({
  request,
}) => {
  const registryResponse = await request.get("/r/registry.json");
  expect(registryResponse.ok()).toBe(true);
  const registry = await registryResponse.json();
  expect(registry.items).toHaveLength(5);

  for (const item of registry.items) {
    const itemResponse = await request.get("/r/" + item.name + ".json");
    expect(itemResponse.ok()).toBe(true);
    expect((await itemResponse.json()).files[0].content).toBeTruthy();
  }

  const llmsResponse = await request.get("/llms.txt");
  expect(llmsResponse.ok()).toBe(true);
  expect(await llmsResponse.text()).toContain("## Registry patterns");
});

test.describe("320px release paths", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ height: 720, width: 320 });
  });

  test("keeps the login form readable and touch-sized", async ({ page }) => {
    await openStory(page, "patterns-loginform--mobile");

    const email = page.getByRole("textbox", { name: "邮箱" });
    const submit = page.getByRole("button", { name: "登录" });
    await expect(email).toBeVisible();
    await expect(submit).toBeVisible();

    const emailStyle = await email.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        fontSize: getComputedStyle(element).fontSize,
        height: rect.height,
      };
    });
    expect(emailStyle.fontSize).toBe("16px");
    expect(emailStyle.height).toBeGreaterThanOrEqual(44);
    expect((await submit.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    await expectNoPageOverflow(page);
  });

  test("contains wide tables inside their own focusable region", async ({
    page,
  }) => {
    await openStory(page, "data-table--mobile");

    const region = page.getByRole("region", {
      name: "可横向滚动的表格",
    });
    await expect(region).toBeVisible();
    await region.focus();
    await expect(region).toBeFocused();

    const widths = await region.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(widths.scrollWidth).toBeGreaterThan(widths.clientWidth);
    await expectNoPageOverflow(page);
  });

  test("pins the mobile action bar without covering page width", async ({
    page,
  }) => {
    await openStory(page, "patterns-mobilebottomactionbar--mobile");

    const actionBar = page.getByRole("complementary", {
      name: "页面操作",
    });
    await expect(actionBar).toBeVisible();
    const box = await actionBar.boundingBox();
    expect(box?.x).toBe(0);
    expect(box?.width).toBe(320);
    expect(Math.round((box?.y ?? 0) + (box?.height ?? 0))).toBe(720);
    await expect(page.getByRole("button", { name: "继续" })).toHaveCSS(
      "min-height",
      "44px",
    );
    await expectNoPageOverflow(page);
  });

  test("opens destructive confirmation with safe margins and cancel focus", async ({
    page,
  }) => {
    await openStory(page, "patterns-deleteconfirmation--mobile");

    await page.getByRole("button", { name: "删除" }).click();
    const dialog = page.getByRole("alertdialog");
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("button", { name: "取消" })).toBeFocused();

    const box = await dialog.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(16);
    expect(320 - (box?.x ?? 0) - (box?.width ?? 0)).toBeGreaterThanOrEqual(16);
    await expectNoPageOverflow(page);
  });
});
