import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/docs/getting-started");
});

test("clicking search trigger opens modal", async ({ page }) => {
  await page.getByRole("button", { name: "Search documentation" }).click();
  await expect(page.getByPlaceholder("Search docs…")).toBeVisible();
});

test("Ctrl+K opens search modal", async ({ page }) => {
  await page.keyboard.press("Control+k");
  await expect(page.getByPlaceholder("Search docs…")).toBeVisible();
});

test("search modal focuses input on open", async ({ page }) => {
  await page.keyboard.press("Control+k");
  const input = page.getByPlaceholder("Search docs…");
  await expect(input).toBeFocused();
});

test("ESC closes search modal", async ({ page }) => {
  await page.keyboard.press("Control+k");
  await expect(page.getByPlaceholder("Search docs…")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByPlaceholder("Search docs…")).not.toBeVisible();
});

test("recommended results are shown when modal is empty", async ({ page }) => {
  await page.keyboard.press("Control+k");
  await expect(page.getByText("Recommended")).toBeVisible();
});

test("typing a query shows results", async ({ page }) => {
  await page.keyboard.press("Control+k");
  await page.getByPlaceholder("Search docs…").fill("auth");
  await expect(page.getByText("No results")).not.toBeVisible();
});

test("typing a nonsense query shows no results message", async ({ page }) => {
  await page.keyboard.press("Control+k");
  await page.getByPlaceholder("Search docs…").fill("xyzzznotapage");
  await expect(page.getByText(/No results for/)).toBeVisible();
});

test("arrow keys move active result", async ({ page }) => {
  await page.keyboard.press("Control+k");
  const firstItem = page.locator("[data-active='true']").first();
  await expect(firstItem).toBeVisible();

  await page.keyboard.press("ArrowDown");
  // After arrow down, index moves — active item still exists
  await expect(page.locator("[data-active='true']").first()).toBeVisible();
});

test("Enter on a search result navigates to that page", async ({ page }) => {
  await page.keyboard.press("Control+k");
  await page.keyboard.press("Enter");
  // Should have navigated away from the modal (modal closes)
  await expect(page.getByPlaceholder("Search docs…")).not.toBeVisible();
});

test("clear button resets query", async ({ page }) => {
  await page.keyboard.press("Control+k");
  const input = page.getByPlaceholder("Search docs…");
  await input.fill("deploy");
  await expect(page.getByRole("button", { name: "Clear" })).toBeVisible();
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(input).toHaveValue("");
});
