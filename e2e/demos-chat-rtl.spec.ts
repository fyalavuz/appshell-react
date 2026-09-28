import { test, expect } from "@playwright/test";

test.describe("chat demo", () => {
  test("sending a message appends it and it becomes visible", async ({
    page,
  }) => {
    await page.goto("/examples/preview/chat/");

    const composer = page.getByRole("textbox", { name: "Message" });
    await composer.click();
    await composer.fill("Let's push the start time to 7am");
    await page.keyboard.press("Enter");

    await expect(
      page.getByText("Let's push the start time to 7am")
    ).toBeVisible();
    await expect(composer).toHaveValue("");
  });

  test("clicking send also appends the message", async ({ page }) => {
    await page.goto("/examples/preview/chat/");

    const composer = page.getByRole("textbox", { name: "Message" });
    await composer.fill("I'll bring the stove");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(page.getByText("I'll bring the stove")).toBeVisible();
  });
});

test.describe("rtl demo", () => {
  test("toggling the language flips the shell to Arabic and right-to-left", async ({
    page,
  }) => {
    await page.goto("/examples/preview/rtl/");

    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByText("Al-Noor Bank")).toBeVisible();

    await page.getByTestId("rtl-dir-toggle").click();

    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.getByText("بنك النور")).toBeVisible();
  });

  test("the drawer opens anchored to the right edge in rtl and closes on Escape", async ({
    page,
  }) => {
    await page.goto("/examples/preview/rtl/");
    await page.getByTestId("rtl-dir-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

    await page.getByTestId("rtl-sidebar-trigger").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    const viewport = page.viewportSize();
    if (!viewport) throw new Error("missing viewport");

    // Once the slide-in settles the panel is flush with the right edge and
    // clear of the left one (it is at most 85vw wide, so on a phone it still
    // starts well left of the midpoint — only the edges tell the side).
    await expect
      .poll(async () => {
        const box = await dialog.boundingBox();
        return box ? Math.round(box.x + box.width) : -1;
      })
      .toBe(viewport.width);
    const box = await dialog.boundingBox();
    expect(box!.x).toBeGreaterThan(16);

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });
});
