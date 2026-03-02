import { test, expect } from "@playwright/test";

test.describe("Layout combinations", () => {
  test("scroll-nav tabs are interactive", async ({ page }) => {
    await page.goto("/scroll-nav");

    // ScrollNav items should be clickable buttons
    const allTab = page.getByRole("button", { name: "All" });
    await expect(allTab).toBeVisible();

    // Click Technology tab
    const techTab = page.getByRole("button", { name: "Technology" });
    await techTab.click();
    await expect(techTab).toBeVisible();
  });
});
