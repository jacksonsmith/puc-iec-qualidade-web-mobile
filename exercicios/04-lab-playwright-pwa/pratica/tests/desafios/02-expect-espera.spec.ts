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

    await expect(cards).toHaveCount(12);

    // Carregar mais -> 24 cards
    await loadMore.click();
    await expect(cards).toHaveCount(24);

    // Carregar mais -> 36 cards
    await loadMore.click();
    await expect(cards).toHaveCount(36);

    // O botão "Carregar mais" deve sumir ao fim da lista
    await expect(loadMore).toBeHidden();
  });

  // ── B2 🟡 · ≈ 7 min ──────────────────────────────────────────────────────
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

    // 1. Digita "matrix" tecla a tecla
    await searchInput.pressSequentially('matrix', { delay: 80 });

    // 2. Exatamente 1 resultado contendo "Matrix"
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText('Matrix');

    // 3. Limpa o campo e verifica limpeza dos resultados
    await page.getByRole('button', { name: /Limpar/i }).click();
    await expect(searchInput).toHaveValue('');
    await expect(results).toHaveCount(0);

    // 4. Digita termo inexistente e verifica estado vazio
    await searchInput.pressSequentially('xyzw', { delay: 80 });
    const emptyState = page.getByTestId('search-empty');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('xyzw');
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

    // Favorita Matrix (603), Pulp Fiction (680) e Clube da Luta (550)
    const cardMatrix = page.getByRole('article').filter({ hasText: 'Matrix' });
    const cardPulp = page.getByRole('article').filter({ hasText: 'Pulp Fiction' });
    const cardClub = page.getByRole('article').filter({ hasText: 'Clube da Luta' });

    await cardMatrix.getByRole('button', { name: /Favoritar/i }).click();
    await cardPulp.getByRole('button', { name: /Favoritar/i }).click();
    await cardClub.getByRole('button', { name: /Favoritar/i }).click();

    // expect.poll para checar a persistência em localStorage
    await expect
      .poll(async () => {
        return await page.evaluate(() =>
          JSON.parse(localStorage.getItem('cinefav-favorites') ?? '[]')
        );
      })
      .toEqual([603, 680, 550]);

    // Recarrega a página
    await page.reload();

    // expect.soft para checar os estados dos corações
    const matrixBtn = page.getByRole('article').filter({ hasText: 'Matrix' }).getByRole('button', { name: /Remover/i });
    const pulpBtn = page.getByRole('article').filter({ hasText: 'Pulp Fiction' }).getByRole('button', { name: /Remover/i });
    const clubBtn = page.getByRole('article').filter({ hasText: 'Clube da Luta' }).getByRole('button', { name: /Remover/i });
    const forrestBtn = page.getByRole('article').filter({ hasText: 'Forrest Gump' }).getByRole('button', { name: /Favoritar/i });

    await expect.soft(matrixBtn).toHaveAttribute('aria-pressed', 'true');
    await expect.soft(pulpBtn).toHaveAttribute('aria-pressed', 'true');
    await expect.soft(clubBtn).toHaveAttribute('aria-pressed', 'true');
    await expect.soft(forrestBtn).toHaveAttribute('aria-pressed', 'false');
  });
});