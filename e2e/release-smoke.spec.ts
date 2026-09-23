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
  expect(registry.items).toHaveLength(14);

  for (const item of registry.items) {
    const itemResponse = await request.get("/r/" + item.name + ".json");
    expect(itemResponse.ok()).toBe(true);
    expect((await itemResponse.json()).files[0].content).toBeTruthy();
  }

  const llmsResponse = await request.get("/llms.txt");
  expect(llmsResponse.ok()).toBe(true);
  expect(await llmsResponse.text()).toContain("## Registry patterns");
});

test("keeps a compact date complete and its calendar anchored", async ({
  page,
}) => {
  await openStory(page, "forms-datepicker--compact");

  const picker = page.getByRole("group", { name: "紧凑交付日期" });
  const trigger = picker.getByRole("button", { name: "打开日历" });
  const lastSegment = picker.getByRole("spinbutton").last();
  const [lastSegmentBox, triggerBox] = await Promise.all([
    lastSegment.boundingBox(),
    trigger.boundingBox(),
  ]);
  expect(lastSegmentBox).not.toBeNull();
  expect(triggerBox).not.toBeNull();
  expect(
    (lastSegmentBox?.x ?? 0) + (lastSegmentBox?.width ?? 0),
  ).toBeLessThanOrEqual(triggerBox?.x ?? 0);

  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "选择日期" });
  await expect(dialog).toBeVisible();
  const dialogBox = await dialog.boundingBox();
  expect(dialogBox).not.toBeNull();
  expect(dialogBox?.width).toBeLessThanOrEqual(352);
  expect(dialogBox?.x).toBeLessThan(triggerBox?.x ?? 0);
  expect((dialogBox?.x ?? 0) + (dialogBox?.width ?? 0)).toBeGreaterThan(
    (triggerBox?.x ?? 0) + (triggerBox?.width ?? 0),
  );
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

  test("opens the date picker inside the viewport and restores focus", async ({
    page,
  }) => {
    await openStory(page, "forms-datepicker--mobile");

    const trigger = page.getByRole("button", {
      name: /打开企业协作平台最终交付日期日历/,
    });
    await expect(trigger).toBeVisible();
    expect(
      (await page.getByRole("group").first().boundingBox())?.height,
    ).toBeGreaterThanOrEqual(44);

    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "选择日期" });
    await expect(dialog).toBeVisible();
    const box = await dialog.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(12);
    expect(320 - (box?.x ?? 0) - (box?.width ?? 0)).toBeGreaterThanOrEqual(12);

    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expectNoPageOverflow(page);
  });

  test("selects and removes a file without overflowing the viewport", async ({
    page,
  }) => {
    await openStory(page, "forms-fileupload--mobile");

    const input = page.locator('input[type="file"]');
    await input.setInputFiles({
      name: "enterprise-compliance-review.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("project brief"),
    });

    await expect(
      page.getByText("enterprise-compliance-review.pdf"),
    ).toBeVisible();
    const remove = page.getByRole("button", {
      name: "移除 enterprise-compliance-review.pdf",
    });
    expect((await remove.boundingBox())?.height).toBeGreaterThanOrEqual(44);
    await remove.click();
    await expect(
      page.getByText("enterprise-compliance-review.pdf"),
    ).not.toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("keeps supplemental display components readable on narrow pages", async ({
    page,
  }) => {
    await openStory(page, "data-datalist--mobile");
    await expect(page.getByText("项目名称")).toBeVisible();
    await expectNoPageOverflow(page);

    await openStory(page, "foundations-code--mobile");
    const codeRegion = page.getByRole("region", { name: "长代码示例" });
    await codeRegion.focus();
    await expect(codeRegion).toBeFocused();
    const codeWidths = await codeRegion.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(codeWidths.scrollWidth).toBeGreaterThan(codeWidths.clientWidth);
    await expectNoPageOverflow(page);

    await openStory(page, "layout-aspectratio--mobile");
    const frame = page
      .getByText("企业协作平台年度发布与合规复核项目横幅预览")
      .locator("..");
    const frameBox = await frame.boundingBox();
    expect((frameBox?.width ?? 0) / (frameBox?.height ?? 1)).toBeCloseTo(
      21 / 9,
      1,
    );
    await expectNoPageOverflow(page);

    await openStory(page, "data-avatar--mobile");
    await expect(page.getByText("Qi Hao 设计系统维护团队")).toBeVisible();
    await expectNoPageOverflow(page);

    await openStory(page, "foundations-kbd--mobile");
    await expect(page.locator("kbd")).toHaveCount(3);
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

  test("supports the data table selection and batch action path", async ({
    page,
  }) => {
    await openStory(page, "patterns-datatable--mobile");

    const tableRegion = page.getByRole("region", {
      name: "项目数据表，可横向滚动",
    });
    await expect(tableRegion).toBeVisible();
    await page
      .getByRole("checkbox", { name: "选择项目：移动端导航重构" })
      .check();
    await expect(page.getByText("共 8 个项目，已选择 1 个")).toBeVisible();

    await page.getByRole("button", { name: "批量操作" }).click();
    await page.getByRole("menuitem", { name: "归档所选项目" }).click();
    await expect(page.getByText("共 8 个项目，已选择 0 个")).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("opens mobile navigation and restores focus to its trigger", async ({
    page,
  }) => {
    await openStory(page, "patterns-header--mobile");

    const trigger = page.getByRole("button", { name: "打开主导航" });
    await expect(page.getByRole("link", { name: "新建项目" })).toBeVisible();
    await trigger.click();
    await expect(
      page.getByRole("dialog", { name: "QH 工作台导航" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "概览" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expectNoPageOverflow(page);
  });

  test("keeps application patterns operable on narrow pages", async ({
    page,
  }) => {
    await openStory(page, "patterns-sidenav--mobile");
    await expect(page.getByRole("link", { name: "基本信息" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expectNoPageOverflow(page);

    await openStory(page, "patterns-pageheader--mobile");
    await expect(
      page.getByRole("heading", { level: 1, name: "QH 设计系统" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "编辑项目" })).toBeVisible();
    await expectNoPageOverflow(page);

    await openStory(page, "patterns-toolbar--mobile");
    await page.getByRole("searchbox", { name: "搜索项目" }).fill("移动端导航");
    await page
      .getByRole("combobox", { name: "项目状态" })
      .selectOption("active");
    await expect(page.getByRole("button", { name: "新建项目" })).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("supports the project list page search and open path", async ({
    page,
  }) => {
    await openStory(page, "patterns-projectlistpage--mobile");

    await expect(
      page.getByRole("heading", { level: 1, name: "项目" }),
    ).toBeVisible();
    await page.getByRole("searchbox", { name: "搜索项目" }).fill("权限管理");
    await page.getByRole("button", { name: "应用筛选" }).click();
    await expect(page.getByText("共 1 个项目，已选择 0 个")).toBeVisible();
    await expect(page.getByRole("button", { name: "查看" })).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("keeps project detail actions and content visible", async ({ page }) => {
    await openStory(page, "patterns-projectdetailpage--mobile");

    await expect(
      page.getByRole("heading", { level: 1, name: "QH 设计系统" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "归档项目" })).toBeVisible();
    await expect(page.getByRole("link", { name: "编辑项目" })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 2, name: "最近动态" }),
    ).toBeVisible();
    await expectNoPageOverflow(page);
  });

  test("filters search results without hiding navigation", async ({ page }) => {
    await openStory(page, "patterns-searchresultspage--mobile");

    await page.getByRole("searchbox", { name: "搜索文档" }).fill("无障碍");
    await expect(page.getByText("找到 1 条结果")).toBeVisible();
    await expect(
      page.getByRole("link", { exact: true, name: "无障碍验收清单" }),
    ).toBeVisible();
    await page.getByRole("searchbox", { name: "搜索文档" }).fill("");
    await page
      .getByRole("combobox", { name: "结果类型" })
      .selectOption("patterns");
    await expect(page.getByText("找到 2 条结果")).toBeVisible();
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
