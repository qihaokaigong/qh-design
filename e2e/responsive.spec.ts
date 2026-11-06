import { expect, test } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

async function openStory(page: Page, id: string) {
  // E2E owns the interaction; don't race the Story's independent play test.
  await page.goto(`/iframe.html?id=${id}&viewMode=story&embed=true`);
  await expect(page.locator("#storybook-root > main")).toBeVisible({
    timeout: 15_000,
  });
  await page.evaluate(() => document.fonts.ready);
}

async function expectContained(host: Locator) {
  await expect
    .poll(() =>
      host.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return (
          [...element.querySelectorAll("input, select, button, a")]
            .filter((control) => control.getClientRects().length)
            .every((control) => {
              const rect = control.getBoundingClientRect();
              return (
                rect.left >= bounds.left - 1 && rect.right <= bounds.right + 1
              );
            }) && element.scrollWidth <= element.clientWidth + 1
        );
      }),
    )
    .toBe(true);
}

const fluidStories = [
  "patterns-filterbar--default",
  "patterns-toolbar--multiple-actions",
  "navigation-pagination--long-content",
  "patterns-pageheader--long-content",
  "patterns-header--long-brand",
  "patterns-sidenav--long-labels",
];

for (const width of [280, 360, 480]) {
  test(`contains controls in a ${width}px desktop panel`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    for (const id of fluidStories) {
      await openStory(page, id);
      const host = page.locator("#storybook-root > main");
      await host.evaluate((element, size) => {
        element.style.width = `${size}px`;
        element.style.padding = "16px";
      }, width);
      await expectContained(host);
      if (width === 360) {
        await test.info().attach(`${id}-360px-panel`, {
          body: await host.screenshot({ animations: "disabled" }),
          contentType: "image/png",
        });
      }
    }
  });
}

for (const width of [320, 375, 639, 640, 767, 768, 1023, 1024, 1280]) {
  test(`keeps page tasks usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const id of [
      "patterns-projectlistpage--default",
      "patterns-projectdetailpage--default",
      "patterns-searchresultspage--default",
    ]) {
      await openStory(page, id);
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              document.documentElement.scrollWidth <=
              document.documentElement.clientWidth + 1,
          ),
        )
        .toBe(true);
      // Tables may scroll locally; the page header and form controls may not.
      const host = page.locator("#storybook-root > main");
      const bounds = await host.boundingBox();
      for (const control of await page.locator("input, select").all()) {
        const box = await control.boundingBox();
        if (box)
          expect(box.x + box.width).toBeLessThanOrEqual(
            bounds!.x + bounds!.width + 1,
          );
      }
    }
  });
}

test("auto grid fits its container while explicit columns retain their contract", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openStory(page, "layout-grid--auto-fit");
  const host = page.locator("#storybook-root > main");
  const columns = () =>
    host
      .locator(":scope > div")
      .evaluate(
        (grid) => getComputedStyle(grid).gridTemplateColumns.split(" ").length,
      );
  for (const [width, count] of [
    [220, 1],
    [360, 1],
    [640, 2],
    [960, 3],
  ]) {
    await host.evaluate((element, size) => {
      element.style.width = `${size}px`;
      element.style.padding = "16px";
    }, width);
    await expect.poll(columns).toBe(count);
    await expectContained(host);
  }
  await openStory(page, "layout-grid--default");
  await expect.poll(columns).toBe(3);
  await page.setViewportSize({ width: 768, height: 800 });
  await expect.poll(columns).toBe(2);
  await page.setViewportSize({ width: 375, height: 800 });
  await expect.poll(columns).toBe(1);
});

test("pagination keeps page state and focus when its container contracts", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openStory(page, "navigation-pagination--long-content");
  const current = page.getByRole("button", { name: "第 5000 页，当前页" });
  await current.focus();
  await page.locator("#storybook-root > main").evaluate((host) => {
    host.style.width = "360px";
  });
  await expect(page.getByText("第 5000 / 9999 页")).toBeVisible();
  await expect(page.getByRole("button", { name: "上一页" })).toBeFocused();
  await page.getByRole("button", { name: "下一页" }).click();
  await expect(page.getByText("第 5001 / 9999 页")).toBeVisible();
});

test("mobile navigation returns focus to a visible entry after expanding", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 720 });
  await openStory(page, "patterns-header--default");
  await page.getByRole("button", { name: "打开主导航" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("link", { name: "QH 工作台" })).toBeFocused();
});

test("pagination skips a disabled previous button when restoring compact focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await openStory(page, "navigation-pagination--states");
  const first = page.getByRole("navigation", { name: "首页状态分页" });
  await first.getByRole("button", { name: "第 1 页，当前页" }).focus();
  await page.locator("#storybook-root > main").evaluate((host) => {
    host.style.width = "360px";
  });
  await expect(first.getByRole("button", { name: "下一页" })).toBeFocused();
});

test("expanded page ranges wrap without dropping navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 800 });
  await openStory(page, "navigation-pagination--expanded-range");
  await expectContained(page.locator("#storybook-root > main"));
  await page.getByRole("button", { name: "下一页" }).click();
  await expect(
    page.getByRole("button", { name: "第 51 页，当前页" }),
  ).toBeVisible();
});

test("the fixed action bar reserves its changing height and single actions fill the row", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await openStory(page, "patterns-mobilebottomactionbar--growing-summary");
  const bar = page.getByRole("complementary", { name: "页面操作" });
  const spacer = page.locator("[data-qh-action-bar-spacer]");
  const matchesHeight = async () => {
    await expect
      .poll(async () =>
        Math.abs(
          (await spacer.boundingBox())!.height -
            (await bar.boundingBox())!.height,
        ),
      )
      .toBeLessThanOrEqual(1);
  };
  await matchesHeight();
  const originalHeight = (await bar.boundingBox())!.height;
  await page.getByRole("button", { name: "切换摘要" }).click();
  await matchesHeight();
  expect((await bar.boundingBox())!.height).toBeGreaterThan(originalHeight);
  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );
  const last = await page.getByTestId("last-content").boundingBox();
  expect(last!.y + last!.height).toBeLessThanOrEqual(
    (await bar.boundingBox())!.y + 1,
  );
  await page.setViewportSize({ width: 768, height: 720 });
  await expect(spacer).toBeHidden();
  await expect(bar).toHaveCSS("position", "static");
  await page.setViewportSize({ width: 320, height: 720 });
  await matchesHeight();
  await openStory(page, "patterns-mobilebottomactionbar--single-action");
  const button = page.getByRole("button", { name: "继续" });
  const row = await button.locator("..").boundingBox();
  expect(
    Math.abs((await button.boundingBox())!.width - row!.width),
  ).toBeLessThanOrEqual(1);
});

for (const dir of ["ltr", "rtl"]) {
  test(`reveals selected and keyboard-focused tabs in ${dir}`, async ({
    page,
  }) => {
    await openStory(
      page,
      dir === "rtl"
        ? "navigation-tabs--right-to-left"
        : "navigation-tabs--narrow-container",
    );
    const list = page.getByRole("tablist");
    const tab = page.getByRole("tab", { name: "通知和自动化规则" });
    await page.getByRole("button", { name: "显示通知设置" }).click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    const isInside = (target: Locator) =>
      expect
        .poll(async () => {
          const a = (await list.boundingBox())!;
          const b = (await target.boundingBox())!;
          return b.x >= a.x - 1 && b.x + b.width <= a.x + a.width + 1;
        })
        .toBe(true);
    await isInside(tab);
    await tab.focus();
    await page.keyboard.press("Home");
    const first = page.getByRole("tab", { name: "项目整体进展与关键指标" });
    await expect(first).toBeFocused();
    await isInside(first);
  });
}

test("long overlays remain operable in a short viewport and preserve drafts on resize", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 320 });
  await openStory(page, "overlays-dialog--long-form");
  const trigger = page.getByRole("button", { name: "编辑详细设置" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  const bounds = (await dialog.boundingBox())!;
  expect(bounds.y).toBeGreaterThanOrEqual(0);
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(320);
  await page.getByRole("button", { name: "保存设置" }).click();
  const name = page.getByRole("textbox", { name: "最终项目名称" });
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(name).toBeFocused();
  await name.fill("新的协作项目");
  await page.setViewportSize({ width: 1024, height: 600 });
  await expect(name).toHaveValue("新的协作项目");
  await page.getByRole("button", { name: "保存设置" }).click();
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await page.setViewportSize({ width: 375, height: 320 });
  await openStory(page, "overlays-drawer--long-form");
  const drawerTrigger = page.getByRole("button", { name: "配置筛选条件" });
  await drawerTrigger.click();
  const lastField = page.getByRole("textbox", {
    name: "筛选条件 8",
    exact: true,
  });
  await lastField.fill("设计系统");
  await page.setViewportSize({ width: 768, height: 600 });
  await expect(lastField).toHaveValue("设计系统");
  await page.getByRole("button", { name: "应用条件" }).click();
  await expect(drawerTrigger).toBeFocused();
});

test("text at 200 percent reflows in a narrow panel", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const id of fluidStories.slice(0, 4)) {
    await openStory(page, id);
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
      const host = document.querySelector<HTMLElement>(
        "#storybook-root > main",
      )!;
      host.style.width = "360px";
      host.style.padding = "16px";
    });
    await expectContained(page.locator("#storybook-root > main"));
  }
});
