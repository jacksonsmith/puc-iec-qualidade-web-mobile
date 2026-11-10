import { test as base, expect } from '@playwright/test';
import { CatalogPage } from './catalog-page';

type MyFixtures = {
  catalog: CatalogPage;
  seedFavorites: (ids: number[]) => Promise<void>;
};

export const test = base.extend<MyFixtures>({
  catalog: async ({ page }, use) => {
    const catalog = new CatalogPage(page);
    await use(catalog);
  },
  seedFavorites: async ({ page }, use) => {
    const seed = async (ids: number[]) => {
      await page.addInitScript((favorites) => {
        localStorage.setItem('cinefav-favorites', JSON.stringify(favorites));
      }, ids);
    };
    await use(seed);
  },
});

export { expect };