import { test, expect } from '@playwright/test';

test('serves cache when offline', async ({ page, context }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByText('Welcome')).toBeVisible();
});
