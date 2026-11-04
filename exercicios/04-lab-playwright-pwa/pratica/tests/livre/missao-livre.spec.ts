// tests/livre/missao-livre.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO (correção MANUAL) — MISSÃO LIVRE (≈ 20 min)
//
// 🎯 Aqui NÃO tem roteiro. Você é o(a) QA: escolhe o fluxo, decide o que testar e
//    justifica. É a parte que mais mostra como você pensa.
//
// 🧩 O que fazer
//   1. ESCOLHA UM fluxo do CineFav que os blocos A–F não testaram. Sugestões:
//        • remover um favorito pela tela /favorites
//        • a tela /pwa (painel "Raio-X da PWA") e seus botões
//        • logout protege as rotas (deslogado, abrir /favorites manda pro /login)
//        • comentário: vazio, muito longo (limite 280), vários comentários
//        • busca com espaços/maiúsculas ("  MATRIX ")
//        • botão Voltar do detalhe (histórico do navegador)
//      …ou um fluxo que VOCÊ achar importante. Dica: use o app de verdade 3 minutos antes!
//   2. ESCREVA 3 testes do MESMO fluxo, com nome começando por:
//        "feliz:"     o caminho normal funciona
//        "negativo:"  algo dá errado e o app reage direito
//        "borda:"     o caso limite (vazio, repetido, máximo, recarregar…)
//   3. Em pelo menos UM deles use algo que você NÃO usou nos blocos A–F — por exemplo
//      test.step · page.goBack() · .not (ex.: not.toBeVisible) · test.fail() · toHaveScreenshot.
//   4. Cada teste precisa de expect de verdade (asserção que falharia se o app quebrasse).
//   5. Responda a pergunta 6 do  RESPOSTAS.md  (por que ESSE fluxo, que risco ele cobre).
//
// 🔎 BÔNUS exploratório (vale reconhecimento): achou algo ESTRANHO no app? Escreva um
//    teste que documenta o comportamento e marque com  test.fixme()  ou  test.fail()
//    + um comentário explicando por que é suspeito. Isso é bug report em forma de código.
//
// ✅ Validar:  npx playwright test livre   → verde nos 3 testes
//
// APAGUE o teste de exemplo abaixo e escreva os seus.
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect, type Page } from '@playwright/test';

async function semear(page: Page, ids: number[]) {
  await page.addInitScript(
    ([chave, valor]) => localStorage.setItem(chave, valor),
    ['cinefav-favorites', JSON.stringify(ids)],
  );
}

test.describe('Missão livre — tela de Favoritos', () => {
  test('feliz: remover um favorito mantém os outros e atualiza o contador', async ({ page }) => {
    await semear(page, [603, 680]);

    await test.step('abre os favoritos e confere os 2 filmes', async () => {
      await page.goto('/favorites');
      await expect(page.getByTestId('favorites-count')).toHaveText('2 filmes favoritos');
      await expect(page.getByTestId('favorites-item-603')).toBeVisible();
      await expect(page.getByTestId('favorites-item-680')).toBeVisible();
    });

    await test.step('remove o Matrix pela própria tela', async () => {
      await page.getByTestId('favorites-item-603-remove').click();
    });

    await test.step('só o Pulp Fiction fica, e o contador vai pro singular', async () => {
      await expect(page.getByTestId('favorites-count')).toHaveText('1 filme favorito');
      await expect(page.getByTestId('favorites-item-603')).toBeHidden();
      await expect(page.getByTestId('favorites-item-680')).toBeVisible();
    });
  });

  test.describe('sem sessão', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('negativo: deslogado, abrir /favorites manda pro login e não vaza os favoritos', async ({ page }) => {
      await semear(page, [603]);

      await page.goto('/favorites');

      await expect(page).toHaveURL(/\/login/);
      await expect(page).not.toHaveURL(/\/favorites/);
      await expect(page.getByTestId('login-screen')).toBeVisible();
      await expect(page.getByTestId('favorites-screen')).toBeHidden();
    });
  });

  test('borda: remover o ÚLTIMO favorito mostra o vazio e grava no localStorage', async ({ page }) => {
    await semear(page, [603]);
    await page.goto('/qa');
    await page.getByTestId('movielist-favorites-button').click();
    await expect(page.getByTestId('favorites-count')).toHaveText('1 filme favorito');

    await page.getByTestId('favorites-item-603-remove').click();

    await expect(page.getByTestId('favorites-count')).toHaveText('0 filmes favoritos');
    await expect(page.getByTestId('favorites-empty')).toBeVisible();

    await expect
      .poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('cinefav-favorites') ?? '[]')))
      .toEqual([]);

    await page.goBack();
    await expect(page.getByTestId('movielist-grid')).toBeVisible();
    await expect(page.getByTestId('movie-card-heart-603')).toHaveAttribute('aria-pressed', 'false');
  });
});
