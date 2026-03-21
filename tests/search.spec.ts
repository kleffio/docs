import { test, expect } from "@playwright/test";

const openSearch = async (page: any) => {
  await page.getByRole("button", { name: "Search documentation" }).click();
  await expect(page.getByPlaceholder("Search docs…")).toBeVisible();
};

test.beforeEach(async ({ page }) => {
  await page.goto("/docs/getting-started");
});

test("clicking search trigger opens modal", async ({ page }) => {
  await page.getByRole("button", { name: "Search documentation" }).click();
  await expect(page.getByPlaceholder("Search docs…")).toBeVisible();
});

test("search modal focuses input on open", async ({ page }) => {
  await openSearch(page);
  await expect(page.getByPlaceholder("Search docs…")).toBeFocused();
});

test("ESC closes search modal", async ({ page }) => {
  await openSearch(page);
  await page.keyboard.press("Escape");
  await expect(page.getByPlaceholder("Search docs…")).not.toBeVisible();
});

test("recommended results are shown when modal is empty", async ({ page }) => {
  await openSearch(page);
  await expect(page.getByText("Recommended")).toBeVisible();
});

test("typing a query shows results", async ({ page }) => {
  await openSearch(page);
  await page.getByPlaceholder("Search docs…").fill("auth");
  await expect(page.getByText("No results")).not.toBeVisible();
});

test("typing a nonsense query shows no results message", async ({ page }) => {
  await openSearch(page);
  await page.getByPlaceholder("Search docs…").fill("xyzzznotapage");
  await expect(page.getByText(/No results for/)).toBeVisible();
});

test("arrow keys move active result", async ({ page }) => {
  await openSearch(page);
  await expect(page.locator("[data-active='true']").first()).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("[data-active='true']").first()).toBeVisible();
});

test("Enter on a search result navigates to that page", async ({ page }) => {
  await openSearch(page);
  await page.keyboard.press("Enter");
  await expect(page.getByPlaceholder("Search docs…")).not.toBeVisible();
});

test("clear button resets query", async ({ page }) => {
  await openSearch(page);
  const input = page.getByPlaceholder("Search docs…");
  await input.fill("deploy");
  await expect(page.getByRole("button", { name: "Clear" })).toBeVisible();
  await page.getByRole("button", { name: "Clear" }).click();
  await expect(input).toHaveValue("");
});
