import { Page } from '@playwright/test';

/** Page Object pro arngren.net — encapsula as checagens, o teste só lê o resultado. */
export class ArngrenPage {
  constructor(private page: Page) {}

  async hasViewportMeta(): Promise<boolean> {
    const count = await this.page.locator('meta[name="viewport"]').count();
    return count > 0;
  }

  async imagesWithoutAlt(): Promise<number> {
    return this.page.locator('img:not([alt]), img[alt=""]').count();
  }

  async totalImages(): Promise<number> {
    return this.page.locator('img').count();
  }

  async hasLangAttribute(): Promise<boolean> {
    const lang = await this.page.locator('html').getAttribute('lang');
    return !!lang && lang.trim().length > 0;
  }
}
