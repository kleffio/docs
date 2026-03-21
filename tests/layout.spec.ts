import { test, expect } from "@playwright/test";
import { navigation } from "../src/lib/nav";

test.beforeEach(async ({ page }) => {
  await page.goto("/docs/getting-started");
});

test("navbar is visible", async ({ page }) => {
  await expect(page.locator("header")).toBeVisible();
});

test("sidebar is visible", async ({ page }) => {
  await expect(page.locator("nav")).toBeVisible();
});

test("sidebar renders all section headings", async ({ page }) => {
  for (const section of navigation) {
    await expect(
      page.locator(`nav p:has-text("${section.title}")`).first()
    ).toBeVisible();
  }
});

test("search trigger button is visible", async ({ page }) => {
  await expect(page.getByRole("button", { name: "Search documentation" })).toBeVisible();
});

test("footer is visible", async ({ page }) => {
  await expect(page.locator("footer")).toBeVisible();
});
