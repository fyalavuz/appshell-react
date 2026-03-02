import { test, expect } from "@playwright/test";

test.describe("Responsive layout", () => {
  test("example picker page renders all example links", async ({
    page,
  }) => {
    await page.goto("/");

    // The index page has: 1 hero CTA + 3 featured previews + 4 category cards = 8 links
    const exampleLinks = page.locator('main section a[href^="/"]');

    await expect(exampleLinks).toHaveCount(8);
  });

  test("tab bar footer renders on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto("/tab-bar");

    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    // All 5 tab items should be present
    const tabButtons = footer.getByRole("button");
    await expect(tabButtons).toHaveCount(5);
  });
});
