// tests/desafios/04-fixtures-pom.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — BLOCO D · CONTA, PAGE OBJECT E FIXTURES (≈ 25 min)
//
// 🎯 Objetivo do bloco: organizar a suíte pra ela crescer sem virar bagunça.
//
// 📚 Conectado com a aula: na Aula 3 você GRAVOU um cadastro com o recorder e viu
//    que o código gerado tem cliques repetidos, Tab sobrando e nenhuma asserção.
//    O D1 é exatamente isso: refazer aquele fluxo, LIMPO e COM expect.
//    Novo: Page Object (D2) e test.extend (D3).
//    Estudar: https://playwright.dev/docs/pom  ·  https://playwright.dev/docs/test-fixtures  ·  https://playwright.dev/docs/auth
//
// ✅ Validar:  npx playwright test 04-fixtures   (e as linhas falta('D?') precisam sumir)
//    D2 e D3 também dependem dos arquivos  tests/support/catalog-page.ts  e  fixtures.ts
// ─────────────────────────────────────────────────────────────────────────────


import { test as base, expect } from '@playwright/test';
import { CatalogPage } from '../support/catalog-page';
import { test, expect as expectFx } from '../support/fixtures';

base.describe('Bloco D — conta nova (sem sessão)', () => {
  base.use({ storageState: { cookies: [], origins: [] } });

  // ── D1 · Cadastro, logout, senha errada e login correto ──
  base(
    'D1. cadastro → sair → senha errada → entrar com a conta nova',
    async ({ page }) => {
      await page.goto('/login');

      const email = `aluna.${Date.now()}@teste.com`;
      const senhaCorreta = 'abcd';
      const senhaIncorreta = '9999';

      // 1. Abre o formulário de cadastro.
      await page.getByTestId('auth-mode-toggle').click();

      // 2. Preenche e envia o cadastro.
      await page.getByTestId('register-name-input').fill('Aluna D1');
      await page.getByTestId('register-email-input').fill(email);
      await page.getByTestId('register-password-input').fill(senhaCorreta);

      await page
        await page.getByTestId('register-submit-button').click();

      // 3. Aguarda a autenticação e abre a área de QA.
      await page.waitForURL(
        (url) => !url.pathname.startsWith('/login')
      );

      await page.goto('/qa');
      await expect(page.getByTestId('logout-button')).toBeVisible();

      // Encerra a sessão.
      await page.getByTestId('logout-button').click();
      await page.waitForURL('**/login');

      // 4. Tenta entrar com a senha incorreta.
      await page.getByLabel('E-mail').fill(email);
      await page.getByLabel('Senha').fill(senhaIncorreta);

      await page.getByRole('button', { name: /^entrar$/i }).click();

      await expect(page.getByTestId('login-error-message'))
        .toContainText('E-mail ou senha inválidos');

      await expect(page).toHaveURL(/\/login/);
      await expect(page.getByTestId('logout-button')).toHaveCount(0);

      // 5. Entra com a senha correta.
      await page.getByLabel('E-mail').fill(email);
      await page.getByLabel('Senha').fill(senhaCorreta);

      await page.getByRole('button', { name: /^entrar$/i }).click();

      await page.waitForURL(
        (url) => !url.pathname.startsWith('/login')
      );

      await page.goto('/qa');
      await expect(page.getByTestId('logout-button')).toBeVisible();
    }
  );
});

// ── D2 · Page Object ──
base('D2. Page Object: o teste lê como uma frase', async ({ page }) => {
  const catalog = new CatalogPage(page);

  await catalog.goto();
  await catalog.favorite('Pulp Fiction');
  await catalog.openFavorites();

  await expect(catalog.favoritesCount).toContainText('1 filme favorito');
});

// ── D3 · Fixtures personalizadas ──
test(
  'D3. fixtures: semeia favoritos sem clicar e confere na tela',
  async ({ catalog, seedFavorites, page }) => {
    // Prepara os favoritos antes de abrir a página.
    await seedFavorites([603, 680]);

    await catalog.goto();
    await catalog.openFavorites();

    await expectFx(page.getByTestId('favorites-count'))
      .toContainText('2 filmes favoritos');

    await expectFx(page.getByTestId('favorites-item-603')).toBeVisible();
    await expectFx(page.getByTestId('favorites-item-680')).toBeVisible();
  }
);
