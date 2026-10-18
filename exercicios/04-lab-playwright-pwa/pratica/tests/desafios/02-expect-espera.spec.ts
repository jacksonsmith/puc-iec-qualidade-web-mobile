// tests/desafios/02-expect-espera.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — BLOCO B · EXPECT E ESPERA (≈ 25 min)
//
// 🎯 Objetivo do bloco: nunca mais "esperar 2 segundos e torcer". O Playwright
//    espera sozinho (auto-wait) se você usar o expect CERTO.
//
// 📚 Conectado com a Aula 3 (SPA: o app "monta" depois do HTML chegar → esperar
//    por sinal, não por tempo) e com o data-app-ready.
//    Novo: toHaveCount · pressSequentially · locator CSS por prefixo [data-testid^=…]
//          expect.poll · expect.soft.    Estudar: https://playwright.dev/docs/test-assertions  ·  https://playwright.dev/docs/actionability  ·  page.evaluate: https://playwright.dev/docs/evaluating
//
// ✅ Validar:  npx playwright test 02-expect   (e a linha falta('B?') precisa sumir)
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect } from '@playwright/test';
import { falta } from '../support/todo';

test.describe('Bloco B — expect e espera', () => {
  // ── B1 🟢 · ≈ 4 min ────────────────────────────────────────────────────────
  // 📚 Aprende: toHaveCount (conta e ESPERA chegar no número) e toBeHidden
  // 🧩 O catálogo de /qa tem 36 filmes e mostra 12 por vez. O primeiro expect está
  //    pronto — repita o padrão: clique em "Carregar mais" e confira 24, clique de
  //    novo e confira 36; no fim o botão "Carregar mais" não pode mais existir.
  // 🆘 Dica: guarde os locators em variáveis (cards, loadMore) e reuse.
  test('B1. paginação: 12 → 24 → 36 e o botão some', async ({ page }) => {
    await page.goto('/qa');
    const cards = page.getByRole('article');
    const loadMore = page.getByTestId('movielist-load-more-button');

    // O catálogo começa mostrando 12 filmes.
    await expect(cards).toHaveCount(12);

    // Carrega mais 12: total de 24.
    await loadMore.click();
    await expect(cards).toHaveCount(24);

    // Carrega os últimos 12: total de 36.
    await loadMore.click();
    await expect(cards).toHaveCount(36);

    // Não deve haver mais botão para carregar filmes.
    await expect(loadMore).toHaveCount(0);
  });

  // ── B2 🟡 · ≈ 7 min ────────────────────────────────────────────────────────
  // 📚 Aprende: pressSequentially (digitar tecla a tecla, como gente), seletor CSS
  //    por PREFIXO  page.locator('[data-testid^="search-result-"]')  e toHaveValue.
  // 🧩 Na tela /search:
  //    1. digite "matrix" tecla a tecla (pressSequentially, delay ~80ms), como um usuário. A busca tem *debounce*:
  //       só dispara 250ms depois da última tecla — e o expect espera isso sozinho
  //    2. exatamente 1 resultado aparece (use o seletor por prefixo) e ele contém "Matrix"
  //    3. clique em "Limpar": o input volta vazio e os resultados somem (0)
  //    4. digite "xyzw": aparece o estado vazio (search-empty) mencionando "xyzw"
  // 🆘 Dica: não precisa de nenhum sleep — cada expect já espera sozinho.
  test('B2. busca com debounce: digita devagar, limpa, e o vazio', async ({ page }) => {
    await page.goto('/search');
    const searchInput = page.getByTestId('search-input');
    const results = page.locator('[data-testid^="search-result-"]');

    await searchInput.fill('matrix');

    // A busca retorna Matrix.
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText('Matrix');

    // Limpa a busca.
    await page.getByRole('button', { name: /limpar/i }).click();

    await expect(searchInput).toHaveValue('');
    await expect(results).toHaveCount(0);

    // Uma busca sem correspondências deve apresentar o estado vazio.
    await searchInput.fill('xyzw');

    await expect(results).toHaveCount(0);
    await expect(page.getByTestId('search-empty')).toBeVisible();
  });

  // ── B3 🔴 · ≈ 12 min ───────────────────────────────────────────────────────
  // 📚 Aprende: expect.poll (esperar um valor que NÃO é elemento de tela, ex.:
  //    localStorage) e expect.soft (não parar no 1º erro — junta todos os erros).
  // 🧩 Escreva o teste inteiro:
  //    • em /qa, favorite 3 filmes clicando nos corações: Matrix (603), Pulp Fiction (680)
  //      e Clube da Luta (550) — NESSA ordem
  //    • com expect.poll leia  localStorage['cinefav-favorites']  (JSON) e espere
  //      ficar igual a [603, 680, 550]
  //    • recarregue a página (reload) e, com expect.soft, confira que os 3 corações
  //      continuam aria-pressed="true" e que um filme que você NÃO favoritou (Forrest
  //      Gump, id 13) está "false"
  // 🆘 Dicas:
  //    1) await page.evaluate(() => JSON.parse(localStorage.getItem('...') ?? '[]'))
  //    2) await expect.poll(() => <aquilo acima>).toEqual([...])
  //    3) await expect.soft(locator).toHaveAttribute(...)
  test('B3. favoritos persistem: expect.poll no localStorage + soft após reload', async ({ page }) => {
    await page.goto('/qa');

        // Localiza cada filme pelo título, sem depender da posição do card.
    const matrix = page
      .getByRole('article')
      .filter({ hasText: 'Matrix' });

    const pulpFiction = page
      .getByRole('article')
      .filter({ hasText: 'Pulp Fiction' });

    const fightClub = page
      .getByRole('article')
      .filter({ hasText: 'Clube da Luta' });

    // Favorita na ordem solicitada.
    await matrix.getByRole('button', { name: /Favoritar/ }).click();

    await pulpFiction
      .getByRole('button', { name: /Favoritar/ })
      .click();

    await fightClub
      .getByRole('button', { name: /Favoritar/ })
      .click();

    // Aguarda o localStorage conter os IDs na ordem esperada.
    await expect.poll(async () => {
      return await page.evaluate(() => {
        return JSON.parse(
          localStorage.getItem('cinefav-favorites') ?? '[]'
        );
      });
    }).toEqual([603, 680, 550]);

    // Recarrega para verificar se os favoritos persistem.
    await page.reload();

    // Verifica os três favoritos sem interromper no primeiro erro.
    await expect.soft(
      matrix.getByRole('button', { name: /Remover/ })
    ).toHaveAttribute('aria-pressed', 'true');

    await expect.soft(
      pulpFiction.getByRole('button', { name: /Remover/ })
    ).toHaveAttribute('aria-pressed', 'true');

    await expect.soft(
      fightClub.getByRole('button', { name: /Remover/ })
    ).toHaveAttribute('aria-pressed', 'true');

    // Forrest Gump não foi favoritado.
    const forrestGump = page
      .getByRole('article')
      .filter({ hasText: 'Forrest Gump' });

    await expect.soft(
      forrestGump.getByRole('button', { name: /Favoritar/ })
    ).toHaveAttribute('aria-pressed', 'false');
  });
});
