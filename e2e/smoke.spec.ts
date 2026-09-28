import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";

// The registry drives the examples gallery; every slug listed there gets a
// full-screen preview route at /examples/preview/<slug>/. Parsed with a
// regex (rather than imported) so this file doesn't need TS module
// resolution for apps/docs's own deps (lucide-react, etc).
const registrySource = readFileSync(
  path.join(__dirname, "../apps/docs/lib/registry.ts"),
  "utf-8"
);
const previewSlugs = [...registrySource.matchAll(/slug:\s*"([\w-]+)"/g)]
  .map((match) => match[1])
  .filter((slug) => slug !== "playground");

test.describe("smoke", () => {
  const routes = [
    "/",
    "/docs/",
    "/examples/",
    "/playground/",
    ...previewSlugs.map((slug) => `/examples/preview/${slug}/`),
  ];

  for (const route of routes) {
    test(`${route} loads cleanly and has a heading landmark`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => pageErrors.push(err.message));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator("h1, header").first()).toBeVisible();

      expect(consoleErrors, `console errors on ${route}`).toEqual([]);
      expect(pageErrors, `page errors on ${route}`).toEqual([]);
    });
  }

  test("/does-not-exist/ returns the 404 page", async ({ page }) => {
    const response = await page.goto("/does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/scrolled away/i);
    await expect(page.getByRole("link", { name: "Back home" })).toBeVisible();
  });
});
