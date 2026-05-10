import { test, expect } from '@playwright/test';

test('Service Worker registers and caches', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.ready;
    return reg.active?.state;
  });
  const cached = await page.evaluate(async () => {
    const cache = await caches.open('app-v1');
    return cache.match('/');
  });
  expect(cached).toBeDefined();
});
