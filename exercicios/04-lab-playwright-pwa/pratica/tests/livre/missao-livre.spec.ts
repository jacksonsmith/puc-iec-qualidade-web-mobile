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

// Fluxo escolhido: GERENCIAR FAVORITOS NA TELA /favorites (remover).
// Os blocos A–F só ADICIONAM favoritos; nenhum testa tirar um da lista,
// nem o que a tela faz quando o dado salvo está estranho.

const FAVORITOS_KEY = 'cinefav-favorites';

/**
 * Grava o valor bruto da chave de favoritos ANTES de qualquer script da página rodar.
 * O addInitScript roda em TODA navegação/reload — por isso só grava se a chave ainda
 * não existe (semeia uma vez). Sem isso, um goto/reload desfaria o que o teste mudou.
 */
async function semear(page: Page, valorBruto: string) {
  await page.addInitScript(
    ([k, v]) => {
      if (localStorage.getItem(k) === null) localStorage.setItem(k, v);
    },
    [FAVORITOS_KEY, valorBruto],
  );
}

const lerFavoritos = (page: Page) =>
  page.evaluate((k) => JSON.parse(localStorage.getItem(k) ?? '[]'), FAVORITOS_KEY);

test.describe('Missão livre — remover favoritos na tela /favorites', () => {
  test('feliz: remover um favorito tira da lista, do localStorage e do coração do catálogo', async ({ page }) => {
    await semear(page, JSON.stringify([603, 680]));

    await test.step('abre favoritos com 2 filmes', async () => {
      await page.goto('/favorites');
      await expect(page.getByTestId('favorites-count')).toHaveText('2 filmes favoritos');
    });

    await test.step('remove o Matrix pelo botão da linha', async () => {
      await page.getByRole('button', { name: 'Remover Matrix dos favoritos' }).click();
      await expect(page.getByTestId('favorites-count')).toHaveText('1 filme favorito');
      await expect(page.getByTestId('favorites-item-603')).toBeHidden();
      await expect(page.getByTestId('favorites-item-680')).toBeVisible();
      await expect.poll(() => lerFavoritos(page)).toEqual([680]);
    });

    await test.step('o catálogo concorda: coração do Matrix desmarcado, Pulp Fiction marcado', async () => {
      await page.goto('/qa');
      await expect(page.getByTestId('movie-card-heart-603')).toHaveAttribute('aria-pressed', 'false');
      await expect(page.getByTestId('movie-card-heart-680')).toHaveAttribute('aria-pressed', 'true');
    });
  });

  test('negativo: localStorage corrompido não quebra a tela e o app se recupera', async ({ page }) => {
    // dado salvo inválido (ex.: versão antiga do app, extensão do navegador, edição manual)
    await semear(page, '{isso nao e json');

    await page.goto('/favorites');
    await expect(page.getByTestId('error-boundary')).toBeHidden();
    await expect(page.getByTestId('favorites-count')).toHaveText('0 filmes favoritos');
    await expect(page.getByTestId('favorites-empty')).toBeVisible();

    // e o usuário consegue favoritar de novo: o app regrava um valor válido
    await page.goto('/qa');
    await page.getByTestId('movie-card-heart-603').click();
    await expect.poll(() => lerFavoritos(page)).toEqual([603]);
  });

  test('borda: remover o ÚLTIMO favorito mostra "0 filmes favoritos", o vazio, e continua vazio após reload', async ({ page }) => {
    await semear(page, JSON.stringify([603]));
    await page.goto('/favorites');
    await expect(page.getByTestId('favorites-count')).toHaveText('1 filme favorito');
    await expect(page.getByTestId('favorites-empty')).toBeHidden();

    await page.getByTestId('favorites-item-603-remove').click();

    // fronteira singular → plural com zero ("0 filmes", não "0 filme")
    await expect(page.getByTestId('favorites-count')).toHaveText('0 filmes favoritos');
    await expect(page.getByTestId('favorites-empty')).toBeVisible();
    await expect.poll(() => lerFavoritos(page)).toEqual([]);

    // recarregar não "ressuscita" o favorito: a remoção foi persistida
    await page.reload();
    await expect(page.getByTestId('favorites-count')).toHaveText('0 filmes favoritos');
  });

  // 🔎 BÔNUS exploratório — comportamento SUSPEITO (bug report em forma de código)
  // Se o catálogo falha (500) ao abrir /favorites, o app engole o erro
  // (Favorites.tsx: .catch(() => setCatalog([]))) e diz "Nada por aqui ainda —
  // favorite um filme", mesmo o usuário TENDO favoritos salvos. Isso engana o
  // usuário (ele acha que perdeu os favoritos). O esperado seria um estado de erro
  // com "Tentar de novo", como o /qa tem. O teste abaixo descreve o comportamento
  // CERTO; está em fixme até o app ser corrigido. (Rodei como test.fail e ele
  // falhou do jeito esperado — o bug é reproduzível.)
  test.describe('bônus', () => {
    test.use({ serviceWorkers: 'block' }); // sem SW, senão o cache responde e o erro não acontece

    test.fixme('bug: catálogo fora do ar faz a tela dizer que não há favoritos', async ({ page }) => {
      await semear(page, JSON.stringify([603, 680]));
      await page.route('**/api/movies.json', (route) => route.fulfill({ status: 500 }));

      await page.goto('/favorites');
      await expect(page.getByTestId('favorites-screen')).toBeVisible();
      await expect(page.getByTestId('favorites-empty')).toBeHidden();
    });
  });
});
