import { expect, test } from "@playwright/test";

test("constrained button labels preserve their icon and count on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(
    "/iframe.html?id=actions-button--truncated-label&viewMode=story&embed=true",
  );
  const button = page.getByRole("button", { name: "展开完整任务记录" });
  await expect(button).toBeVisible();
  expect(
    await button.evaluate(
      (element) => element.scrollWidth <= element.clientWidth,
    ),
  ).toBe(true);
  const buttonBox = (await button.boundingBox())!;
  const countBox = (await button.getByText("2 段").boundingBox())!;
  expect(countBox.x + countBox.width).toBeLessThanOrEqual(
    buttonBox.x + buttonBox.width,
  );
  expect(buttonBox.height).toBeGreaterThanOrEqual(44);
  await button.click();
  // Safari intentionally does not focus native buttons on pointer activation.
  await button.focus();
  await button.press("Space");
  await expect(button).toBeFocused();
});
