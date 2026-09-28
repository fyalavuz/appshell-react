import { test, expect } from "@playwright/test";

test.describe("reveal-context header", () => {
  test("context row leaves on scroll down and floats back with the current step on scroll up", async ({
    page,
  }) => {
    await page.goto("/examples/preview/reveal-context/");
    const header = page.locator("header").first();
    await expect(header).toBeInViewport();

    // Deep scroll down — the in-flow header (with the title) scrolls away.
    await page.mouse.wheel(0, 3000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(800);
    await expect(header).not.toBeInViewport();

    // A nudge upward brings the floating context-row overlay back, showing
    // the recipe title and which step is currently in view.
    await page.mouse.wheel(0, -300);
    const overlayHeader = page.locator("[data-header-overlay]");
    await expect(overlayHeader).toBeVisible();
    await expect(overlayHeader).toContainText(
      "Brown-Butter Chocolate Chip Cookies"
    );
    await expect(overlayHeader).toContainText(/Step \d of 7/);

    // Scrolling all the way back to the top restores the original header.
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toBeInViewport();
  });
});

test.describe("reveal-combined header + footer", () => {
  test("nav and search rows float back together on scroll up", async ({
    page,
  }) => {
    await page.goto("/examples/preview/reveal-combined/");
    const header = page.locator("header").first();
    await expect(header).toBeInViewport();

    await page.mouse.wheel(0, 3000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(800);
    await expect(header).not.toBeInViewport();

    await page.mouse.wheel(0, -300);
    const overlayHeader = page.locator("[data-header-overlay]");
    await expect(overlayHeader).toBeVisible();
    await expect(overlayHeader).toContainText("Lighting");
    await expect(
      overlayHeader.getByPlaceholder("Search Drift")
    ).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toBeInViewport();
  });

  test("tab bar auto-hides on scroll down and returns on scroll up", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile-chrome",
      "auto-hide tab bar is only exercised on the mobile project"
    );

    await page.goto("/examples/preview/reveal-combined/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    await page.mouse.wheel(0, 1500);
    await expect(footer).toHaveCount(0);

    await page.mouse.wheel(0, -1500);
    await expect(page.locator("footer")).toBeVisible();
  });
});
