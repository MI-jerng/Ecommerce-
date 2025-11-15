import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('You did it!');
})

test('categories load with images', async ({ page }) => {
  await page.goto('/');
  // Wait for categories to load
  await page.waitForSelector('.category-item');
  // Check that there are category items
  const categoryItems = page.locator('.category-item');
  await expect(categoryItems).toHaveCount(10);
  // Check that images are present and not broken
  const images = page.locator('.category-icon');
  await expect(images).toHaveCount(10);
  // Verify each image has a valid src
  for (let i = 0; i < 10; i++) {
    const src = await images.nth(i).getAttribute('src');
    expect(src).toMatch(/^http:\/\/localhost:3000\//);
  }
})
