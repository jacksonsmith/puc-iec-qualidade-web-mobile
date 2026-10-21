import { test as base, expect } from '@playwright/test';
import { CatalogPage } from './catalog-page';

type Fixtures = {
  catalog: CatalogPage;
  seedFavorites: (ids: number[]) => Promise<void>;
};

export const test = base.extend<Fixtures>({
  catalog: async ({ page }, use) => {
    const catalog = new CatalogPage(page);

    await use(catalog);
  },

  seedFavorites: async ({ context }, use) => {
    await use(async (ids: number[]) => {
      await context.addInitScript(
        ([key, value]) => {
          localStorage.setItem(key, value);
        },
        ['cinefav-favorites', JSON.stringify(ids)],
      );
    });
  },
});

export { expect };