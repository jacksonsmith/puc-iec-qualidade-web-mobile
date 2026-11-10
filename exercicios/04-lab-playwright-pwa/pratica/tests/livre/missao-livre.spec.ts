// tests/livre/missao-livre.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ MISSÃO LIVRE — fluxo: REMOVER UM FAVORITO pela tela /favorites
//
// Por que esse fluxo: os blocos A–F só testam ADICIONAR favoritos. Remover é a
// outra metade do mesmo recurso e mexe em três lugares ao mesmo tempo: a lista de
// favoritos, o contador (singular/plural) e o coração no catálogo (/qa), que lê o
// mesmo localStorage. Se a remoção quebrar, o usuário "perde o controle" da lista.
//
// Técnicas novas (não usadas nos blocos A–F): test.step · .not (not.toContainText) · page.goBack()
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect, type Page } from '@playwright/test';

const FAVORITES_KEY = 'cinefav-favorites';

/** Pré-carrega favoritos no localStorage antes de a página abrir (sem clicar). */
async function seed(page: Page, ids: number[]) {
  await page.addInitScript(
    ([key, value]) => {
      // só semeia na 1ª carga: depois disso quem manda é o app (senão o reload "desfaz" a remoção)
      if (!sessionStorage.getItem('seeded')) {
        localStorage.setItem(key, value);
        sessionStorage.setItem('seeded', '1');
      }
    },
    [FAVORITES_KEY, JSON.stringify(ids)],
  );
}

test.describe('Missão livre — remover favorito pela tela /favorites', () => {
  test('feliz: remover um de dois favoritos atualiza a lista, o contador e o coração no catálogo', async ({ page }) => {
    await seed(page, [603, 680]);

    await test.step('abre favoritos com 2 filmes', async () => {
      await page.goto('/favorites');
      await expect(page.getByTestId('favorites-count')).toHaveText('2 filmes favoritos');
    });

    await test.step('remove o Matrix', async () => {
      await page.getByRole('button', { name: 'Remover Matrix dos favoritos' }).click();
      await expect(page.getByTestId('favorites-screen')).not.toContainText('Matrix');
      await expect(page.getByTestId('favorites-item-680')).toBeVisible();
      await expect(page.getByTestId('favorites-count')).toHaveText('1 filme favorito');
    });

    await test.step('o catálogo reflete a remoção (mesmo estado compartilhado)', async () => {
      await page.goto('/qa');
      await expect(page.getByTestId('movie-card-heart-603')).toHaveAttribute('aria-pressed', 'false');
      await expect(page.getByTestId('movie-card-heart-680')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  test('negativo: sem nenhum favorito, a tela mostra o estado vazio e nenhum botão Remover', async ({ page }) => {
    await page.goto('/favorites');

    await expect(page.getByTestId('favorites-count')).toHaveText('0 filmes favoritos');
    await expect(page.getByTestId('favorites-empty')).toBeVisible();
    await expect(page.getByRole('button', { name: /Remover/ })).toHaveCount(0);
  });

  test('borda: remover o ÚLTIMO favorito, recarregar e voltar no histórico continua vazio', async ({ page }) => {
    await seed(page, [550]);
    await page.goto('/qa');
    await page.getByTestId('movielist-favorites-button').click();
    await expect(page.getByTestId('favorites-count')).toHaveText('1 filme favorito');

    await page.getByTestId('favorites-item-550-remove').click();
    await expect(page.getByTestId('favorites-empty')).toBeVisible();

    // a remoção foi persistida (não é só visual): sobrevive ao reload
    await page.reload();
    await expect(page.getByTestId('favorites-count')).toHaveText('0 filmes favoritos');
    await expect.poll(() => page.evaluate((k) => localStorage.getItem(k), FAVORITES_KEY)).toBe('[]');

    // voltar no histórico pro catálogo: o coração do Clube da Luta está desmarcado
    await page.goBack();
    await expect(page).toHaveURL(/\/qa$/);
    await expect(page.getByTestId('movie-card-heart-550')).toHaveAttribute('aria-pressed', 'false');
  });
});
