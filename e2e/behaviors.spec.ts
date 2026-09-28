import { test, expect } from "@playwright/test";

test.describe("header scroll behaviors", () => {
  test("fixed header stays pinned to the top while scrolling", async ({
    page,
  }) => {
    await page.goto("/examples/preview/fixed-header/");
    const header = page.locator("header").first();
    await expect(header).toBeInViewport();

    await page.mouse.wheel(0, 2000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(500);
    await expect(header).toBeInViewport();
    await expect(header).toHaveCSS("position", "sticky");
  });

  test("reveal-all header leaves the viewport on scroll down and floats back on scroll up", async ({
    page,
  }) => {
    await page.goto("/examples/preview/reveal-all/");
    const header = page.locator("header").first();
    await expect(header).toBeInViewport();

    // Deep scroll down — the in-flow header scrolls away with the page.
    await page.mouse.wheel(0, 3000);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(800);
    await expect(header).not.toBeInViewport();

    // A nudge upward brings the floating overlay copy back.
    await page.mouse.wheel(0, -300);
    const overlayHeader = page.locator("[data-header-overlay]");
    await expect(overlayHeader).toBeVisible();

    // Scrolling all the way back to the top restores the original header.
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toBeInViewport();
  });
});

test.describe("sidebar drawer", () => {
  test("opens as a dialog, closes on Escape, and returns focus to the trigger", async ({
    page,
  }) => {
    await page.goto("/examples/preview/sidebar/");
    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });
});

test.describe("bottom sheet", () => {
  test("is open by default, drag-dismisses, and reopens from its trigger", async ({
    page,
  }) => {
    await page.goto("/examples/preview/bottom-sheet/");
    const sheet = page.getByRole("dialog", { name: "Nearby places" });
    await expect(sheet).toBeVisible();

    // The sheet slides in over a CSS transition; grab its resting position
    // (bounding box stops changing) rather than mid-flight, or the drag's
    // start offset is computed against a moving target.
    const grabber = sheet.locator("> div").first();
    let lastY: number | null = null;
    await expect
      .poll(async () => {
        const box = await grabber.boundingBox();
        const y = box ? Math.round(box.y) : null;
        const stable = y !== null && y === lastY;
        lastY = y;
        return stable;
      })
      .toBe(true);

    // Drag the grabber well below its lowest snap point to dismiss it — this
    // sheet is non-modal, so Escape won't close it.
    const box = await grabber.boundingBox();
    if (!box) throw new Error("bottom sheet grabber not found");
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x, y + 700, { steps: 10 });
    await page.mouse.up();

    await expect(sheet).not.toBeVisible();

    await page.getByRole("button", { name: "Show nearby places" }).click();
    await expect(sheet).toBeVisible();
  });
});

test.describe("search modal", () => {
  test("search-command demo opens the modal by clicking the search field", async ({
    page,
  }) => {
    await page.goto("/examples/preview/search-command/");
    await page.getByPlaceholder("Search articles").click();

    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });

  test("docked-sidebar demo opens the modal with the ⌘K / Ctrl+K shortcut", async ({
    page,
  }) => {
    await page.goto("/examples/preview/docked-sidebar/");

    // The handler answers either modifier, so one keypress covers both
    // platforms' shortcuts.
    await page.keyboard.press("Control+k");

    const modal = page.getByRole("dialog");
    await expect(modal).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });
});

test.describe("tab-bar footer", () => {
  test("auto-hides on scroll down and returns on scroll up", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "mobile-chrome",
      "auto-hide tab bar is only exercised on the mobile project"
    );

    await page.goto("/examples/preview/tab-bar/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    await page.mouse.wheel(0, 1500);
    await expect(footer).toHaveCount(0);

    await page.mouse.wheel(0, -1500);
    await expect(page.locator("footer")).toBeVisible();
  });
});
