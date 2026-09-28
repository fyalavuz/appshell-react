import { test, expect } from "@playwright/test";

test.describe("content-header demo", () => {
  test("clicking a breadcrumb changes the title and moves aria-current", async ({
    page,
  }) => {
    await page.goto("/examples/preview/content-header/");

    const heading = page.locator("h1");
    await expect(heading).toHaveText("Website redesign");
    await expect(page.locator('[aria-current="page"]')).toHaveText(
      "Website redesign"
    );

    await page.getByRole("button", { name: "Projects" }).click();

    await expect(heading).toHaveText("Projects");
    await expect(page.locator('[aria-current="page"]')).toHaveText(
      "Projects"
    );

    await page.getByRole("button", { name: "Bramble" }).click();

    await expect(heading).toHaveText("Bramble");
    await expect(page.locator('[aria-current="page"]')).toHaveText(
      "Bramble"
    );
  });
});

test.describe("nested-overlays demo", () => {
  test("Escape closes exactly one stacked layer at a time, topmost first, and locks scroll while any layer is open", async ({
    page,
  }) => {
    await page.goto("/examples/preview/nested-overlays/");

    const bodyOverflow = () =>
      page.evaluate(() => document.body.style.overflow);

    const sidebar = page.getByRole("dialog", { name: "Saved trails" });
    const sheet = page.getByRole("dialog", { name: "Trail details" });
    const search = page.getByRole("dialog", { name: "Search trails" });

    await expect(sidebar).not.toBeVisible();
    await expect(bodyOverflow()).resolves.not.toBe("hidden");

    // Layer 1: Sidebar
    await page.getByRole("button", { name: "Open saved trails" }).click();
    await expect(sidebar).toBeVisible();
    await expect(bodyOverflow()).resolves.toBe("hidden");

    // Layer 2: BottomSheet, opened from inside the sidebar — the sidebar
    // stays open underneath it.
    await page.getByRole("button", { name: "Widowmaker Ridge" }).click();
    await expect(sheet).toBeVisible();
    await expect(sidebar).toBeVisible();

    // Layer 3: SearchModal, opened from inside the sheet — both layers
    // below stay open underneath it.
    await page.getByRole("button", { name: "Search other trails" }).click();
    await expect(search).toBeVisible();
    await expect(sheet).toBeVisible();
    await expect(sidebar).toBeVisible();
    await expect(bodyOverflow()).resolves.toBe("hidden");

    // First Escape closes only the topmost layer: Search.
    await page.keyboard.press("Escape");
    await expect(search).not.toBeVisible();
    await expect(sheet).toBeVisible();
    await expect(sidebar).toBeVisible();
    await expect(bodyOverflow()).resolves.toBe("hidden");

    // Second Escape closes only the next layer down: the sheet.
    await page.keyboard.press("Escape");
    await expect(sheet).not.toBeVisible();
    await expect(sidebar).toBeVisible();
    await expect(bodyOverflow()).resolves.toBe("hidden");

    // Third Escape closes the last layer: the sidebar. Scroll unlocks.
    await page.keyboard.press("Escape");
    await expect(sidebar).not.toBeVisible();
    await expect(bodyOverflow()).resolves.not.toBe("hidden");
  });
});
