import { test, expect } from '@playwright/test';
test('1. busca', async ({ page }) => {
  await page.goto('/search');
  await expect(page.getByTestId('search-input')).toBeVisible();
});
