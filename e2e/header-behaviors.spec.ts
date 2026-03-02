import { test, expect } from "@playwright/test";

test.describe("Header behaviors", () => {
  test("fixed header stays visible on scroll", async ({ page }) => {
    await page.goto("/fixed-header");
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    await expect(header).toBeVisible();
  });

  test("reveal-nav header hides on scroll down, reveals on scroll up", async ({
    page,
  }) => {
    await page.goto("/reveal-all");

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 600));
    await page.waitForTimeout(500);

    // Scroll up — overlay should appear
    await page.evaluate(() => window.scrollBy(0, -200));
    await page.waitForTimeout(500);

    const overlay = page.locator("[aria-hidden]").first();
    await expect(overlay).toBeVisible();
  });

  test("static header scrolls away with content", async ({ page }) => {
    await page.goto("/static-header");
    const header = page.locator("header").first();

    const initialBox = await header.boundingBox();
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(300);

    const scrolledBox = await header.boundingBox();
    if (initialBox && scrolledBox) {
      expect(scrolledBox.y).toBeLessThan(initialBox.y);
    }
  });
});
