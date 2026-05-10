import { test, expect } from '@playwright/test';

test('test 4 — uses recommended locators', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Entrar' });
  await expect(button).toBeVisible();
  await page.getByText('Welcome').click();
  await page.getByTestId('main-content').click();
  await expect(page).toHaveScreenshot('test-4.png');
});
