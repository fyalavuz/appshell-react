import { test, expect } from "@playwright/test";

test.describe("Responsive layout", () => {
  test("responsive page hamburger menu opens sidebar on mobile", async ({
    page,
  }) => {
    // Use a mobile viewport
    await page.setViewportSize({ width: 393, height: 851 });
    await page.goto("/responsive");

    // Hamburger button should be visible on mobile
    const menuButton = page.getByLabel("Open menu");
    await expect(menuButton).toBeVisible();

    // Click to open sidebar
    await menuButton.click();
    await page.waitForTimeout(300);

    // Sidebar dialog should be visible
    const sidebar = page.getByRole("dialog");
    await expect(sidebar).toBeVisible();

    // Press Escape to close
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
  });

  test("example picker page renders all example links", async ({
    page,
  }) => {
    await page.goto("/");

    // The index page now has 13 main high-quality examples
    const exampleLinks = page.locator('main section a[href^="/"]');

    await expect(exampleLinks).toHaveCount(13);
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
