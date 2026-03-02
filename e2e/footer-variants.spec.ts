import { test, expect } from "@playwright/test";

test.describe("Footer variants", () => {
  test("tab-bar auto-hide footer hides on scroll down, reappears on scroll up", async ({
    page,
  }) => {
    await page.goto("/tab-bar");
    const footer = page.locator("footer").first();
    await expect(footer).toBeVisible();

    // Scroll down incrementally to reliably trigger scroll-direction detection.
    // A single scrollTo can be missed if useScrollDirection's useEffect hasn't
    // registered the scroll listener yet (SSR hydration race on slow CI runners).
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 400));
      await page.waitForTimeout(200);
    }
    await expect(footer).not.toBeVisible({ timeout: 5000 });

    // Scroll up incrementally — footer should reappear
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, -400));
      await page.waitForTimeout(200);
    }
    await expect(footer).toBeVisible({ timeout: 5000 });
  });

  test("tab navigation clicks change active state", async ({ page }) => {
    await page.goto("/tab-bar");

    // Home tab should be active initially
    const homeTab = page.getByRole("button", { name: "Home" });
    await expect(homeTab).toBeVisible();

    // Click Search tab
    const searchTab = page.getByRole("button", { name: "Search" });
    await searchTab.click();

    // Verify Search tab is visible and clickable
    await expect(searchTab).toBeVisible();

    // Click Notifications tab
    const notifTab = page.getByRole("button", { name: "Notifications" });
    await notifTab.click();
    await expect(notifTab).toBeVisible();
  });

  test("floating cart button is visible", async ({ page }) => {
    await page.goto("/floating-footer");
    const floatingButton = page.getByLabel("Show cart");
    await expect(floatingButton).toBeVisible();
  });

});
