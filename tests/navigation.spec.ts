import { test, expect } from "@playwright/test";
import { flattenNav } from "../src/lib/nav";

test("root redirects to /docs/getting-started", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/docs/getting-started");
});

const pages = flattenNav();

for (const { label, href, section } of pages) {
  test(`[${section}] ${label} — page loads`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(href);

    expect(response?.status(), `${href} returned non-200`).toBe(200);
    expect(errors, `JS errors on ${href}`).toHaveLength(0);
  });

  test(`[${section}] ${label} — active sidebar link is highlighted`, async ({ page }) => {
    await page.goto(href);

    const activeLink = page.locator(`nav a[href="${href}"]`);
    await expect(activeLink).toBeVisible();
    await expect(activeLink).toHaveClass(/text-primary/);
  });
}
