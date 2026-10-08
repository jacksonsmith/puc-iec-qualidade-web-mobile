// tests/e2e-bonus/pages/DiscoverDetailPage.ts
// ─────────────────────────────────────────────────────────────────────────────
// 🎁 BÔNUS — Page Object da tela de detalhe do Discover (dado real do TMDB).
// Encapsula os locators e a sequência "loading → conteúdo real" — o spec
// não deve conhecer testID nenhum, só chamar métodos daqui.
// ─────────────────────────────────────────────────────────────────────────────

import { type Page, type Locator, expect } from '@playwright/test';

export class DiscoverDetailPage {
  readonly page: Page;
  readonly loading: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loading = page.getByTestId('discover-detail-loading');
    this.title = page.getByTestId('discover-detail-title');
  }

  async goto(movieId: number) {
    await this.page.goto(`/discover/${movieId}`);
  }

  // Prova as DUAS pontas do loader: apareceu (não foi rápido demais pra
  // existir) E sumiu (não ficou girando pra sempre quando o dado chegou).
  async expectLoadingThenLoaded() {
    await expect(this.loading).toBeVisible();
    // O delay injetado pelo spec é de 2s; 10s dá folga pra rede real do TMDB.
    await expect(this.loading).toBeHidden({ timeout: 10_000 });
    await expect(this.title).toBeVisible();
  }
}
