// tests/desafios/05-spa-pwa-offline.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — BLOCO E · SPA, PWA E OFFLINE (≈ 35 min)
//
// 🎯 Objetivo do bloco: provar as promessas de uma PWA — abre rápido, "instala",
//    e FUNCIONA SEM INTERNET.
//
// 📚 Direto da Aula 3 (guarde os slides: hidratação, "2 gavetas", fila offline):
//    • SPA: o HTML chega vazio e o JS monta a tela → esperar o SINAL (data-app-ready)
//    • Service Worker: registrado ≠ ativo ≠ CONTROLANDO a página (só o último vale)
//    • Gaveta 1 = Cache Storage (arquivos) · Gaveta 2 = IndexedDB (dados do app)
//    • Fila offline: escrever sem rede → fica "pending" → rede volta → "synced"
//    Novo: context.setOffline · page.waitForFunction · request fixture (HTTP sem página).
//    Estudar: https://web.dev/learn/pwa  ·  setOffline: https://playwright.dev/docs/api/class-browsercontext#browser-context-set-offline
//
// ⚠️ Aqui o Service Worker fica LIGADO (não use serviceWorkers:'block' neste arquivo —
//    o teste precisa dele). É o oposto do Bloco C.
//
// ✅ Validar:  npx playwright test 05-spa   (e as linhas falta('E?') precisam sumir)
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect, type Page } from '@playwright/test';
import { falta } from '../support/todo';

/** 📘 Pronto: espera o SW CONTROLAR a página (não basta estar registrado). */
async function waitForSwControl(page: Page) {
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
}

test.describe('Bloco E — SPA e PWA', () => {
  // ── E1 🟢 · ≈ 4 min ────────────────────────────────────────────────────────
  // 📚 Aprende: deep link (abrir uma URL interna direto, já logado) e rota inexistente.
  // 🧩 O primeiro goto já está pronto. Falta:
  //    • o <html> ter data-app-ready="true"  (o sinal que o app dá quando monta)
  //    • o título do detalhe (testid detail-title) ser "Matrix"
  //    • depois vá pra  /rota-que-nao-existe  — o app redireciona; confira que a URL
  //      termina em "/" (regex /\/$/)
  test('E1. app pronto, deep link logado e rota inexistente', async ({ page }) => {
    await page.goto('/movie/603');

    // Espera o sinal de que a SPA terminou de montar.
    await expect(page.locator('html')).toHaveAttribute(
      'data-app-ready',
      'true'
    );

    // Confere o título do filme Matrix.
    await expect(page.getByTestId('detail-title')).toHaveText('Matrix');

    // A rota inexistente deve redirecionar para a página inicial.
    await page.goto('/rota-que-nao-existe');
    await expect(page).toHaveURL(/\/$/);
  });

  // ── E2 🟡 · ≈ 7 min ────────────────────────────────────────────────────────
  // 📚 Aprende: o ciclo de vida do SW com expect.poll + a fixture `request` (faz GET
  //    HTTP sem abrir página — ótima pra conferir o manifest).
  // 🧩 1. goto('/qa') e espere a grade (movielist-grid)
  //    2. expect.poll: o estado do SW tem que chegar em 'activated'. Leia-o no navegador com
  //       page.evaluate(async () => (await navigator.serviceWorker.getRegistration())?.active?.state)
  //       (page.evaluate roda JavaScript DENTRO da página: https://playwright.dev/docs/evaluating)
  //    3. waitForSwControl(page) (helper acima)
  //    4. leia o href de  link[rel="manifest"]  e faça  request.get(href)  →  .json()
  //    5. confira  manifest.name === 'CineFav — filmes favoritos'  e  display === 'standalone'
  test('E2. Service Worker ativo e controlando + manifest da PWA', async ({ page, request }) => {
    await page.goto('/qa');

    await expect(page.getByTestId('movielist-grid')).toBeVisible();

    // Espera o Service Worker atingir o estado activated.
    await expect
      .poll(async () =>
        page.evaluate(async () => {
          const registration =
            await navigator.serviceWorker.getRegistration();

          return registration?.active?.state;
        })
      )
      .toBe('activated');

    // Registrado e ativado não significa necessariamente que controla a página.
    await waitForSwControl(page);

    // Obtém a URL do manifest e faz uma requisição HTTP diretamente.
    const manifestHref = await page
      .locator('link[rel="manifest"]')
      .getAttribute('href');

    expect(manifestHref).not.toBeNull();

    const manifestUrl = new URL(manifestHref!, page.url()).href;
    const response = await request.get(manifestUrl);

    expect(response.ok()).toBeTruthy();

    const manifest = await response.json();

    expect(manifest.name).toBe('CineFav — filmes favoritos');
    expect(manifest.display).toBe('standalone');
  });

  // ── E3 🔴 · ≈ 12 min ───────────────────────────────────────────────────────
  // 📚 Aprende: a sequência CLÁSSICA do teste offline (decore a ordem!):
  //      1) visita ONLINE (o SW instala e cacheia)   2) espera o SW CONTROLAR
  //      3) context.setOffline(true)                 4) RELOAD → o app tem que continuar
  // 🧩 Escreva o teste inteiro, em /qa:
  //    • online: grade visível → waitForSwControl
  //    • offline + reload: o banner (testid offline-banner) APARECE e a grade continua
  //      com 12 cards
  //    • rede volta (setOffline(false)): o banner SOME
  // 🆘 Se o reload offline falhar com "net::ERR_INTERNET_DISCONNECTED", é porque o passo
  //    2 ficou pra trás: sem controller, ninguém serve o app offline.
  test('E3. offline: banner aparece, app continua, volta a rede e o banner some', async ({ page, context }) => {
    // 1. Visita a aplicação enquanto ainda há internet.
    await page.goto('/qa');

    await expect(page.getByTestId('movielist-grid')).toBeVisible();

    // 2. Garante que o Service Worker controla a página.
    await waitForSwControl(page);

    // 3. Simula a perda da conexão.
    await context.setOffline(true);

    // 4. Recarrega a aplicação offline.
    await page.reload();

    // O banner deve informar que estamos sem conexão.
    await expect(page.getByTestId('offline-banner')).toBeVisible();

    // A aplicação deve continuar apresentando os 12 filmes.
    await expect(page.getByTestId('movielist-grid')).toBeVisible();
    await expect(page.getByRole('article')).toHaveCount(12);

    // 5. Restaura a conexão.
    await context.setOffline(false);

    // O aviso de offline deve desaparecer.
    await expect(page.getByTestId('offline-banner')).toBeHidden();
  });

  // ── E4 🔴 · ≈ 12 min ───────────────────────────────────────────────────────
  // 📚 Aprende: o padrão OFFLINE-FIRST (a "2ª gaveta", IndexedDB). O app grava o
  //    comentário LOCAL primeiro e sincroniza depois. Seu teste conta essa história.
  // 🧩 Escreva o teste inteiro, em /movie/603 (Matrix):
  //    • espere o título (detail-title) e o SW controlar
  //    • fique offline e publique o comentário "Clássico absoluto" (comment-input +
  //      comment-submit-button)
  //    • o 1º comentário da lista (use o prefixo comment-item-) contém o texto, e DENTRO dele
  //      o elemento que tem o atributo data-status (o selo de status) vale "pending"
  //    • recarregue a página AINDA offline: o comentário continua lá (está no IndexedDB)
  //    • volte online: esse selo (prefixo comment-status-) passa a ter data-status="synced"
  //      (na tela aparece escrito "✓ enviado"; o valor técnico "synced" só existe no atributo)
  // 🆘 Dica: o expect do "synced" já espera sozinho (o app leva ~400ms pra sincronizar).
  test('E4. comentário offline entra na fila (IndexedDB) e sincroniza', async ({ page, context }) => {
    // Abre o detalhe de Matrix com a rede disponível.
    await page.goto('/movie/603');

    await expect(page.getByTestId('detail-title')).toHaveText('Matrix');

    // Garante que o Service Worker controla a página antes de ficar offline.
    await waitForSwControl(page);

    // Desconecta a aplicação.
    await context.setOffline(true);

    // Escreve e publica um comentário enquanto está offline.
    await page.getByTestId('comment-input').fill('Clássico absoluto');
    await page.getByTestId('comment-submit-button').click();

    // Localiza o comentário recém-publicado.
    const comment = page
      .locator('[data-testid^="comment-item-"]')
      .filter({ hasText: 'Clássico absoluto' })
      .first();

    await expect(comment).toContainText('Clássico absoluto');

    // O comentário foi salvo localmente e aguarda sincronização.
    await expect(comment.locator('[data-status]')).toHaveAttribute(
      'data-status',
      'pending'
    );

    // Recarrega ainda offline para validar a persistência local.
    await page.reload();

    await expect(page.getByTestId('detail-title')).toHaveText('Matrix');

    const persistedComment = page
      .locator('[data-testid^="comment-item-"]')
      .filter({ hasText: 'Clássico absoluto' })
      .first();

    await expect(persistedComment).toContainText('Clássico absoluto');
    await expect(persistedComment.locator('[data-status]')).toHaveAttribute(
      'data-status',
      'pending'
    );

    // Restaura a internet e espera a sincronização.
    await context.setOffline(false);

    const commentStatus = persistedComment.locator(
      '[data-testid^="comment-status-"]'
    );

    await expect(commentStatus).toHaveAttribute('data-status', 'synced');
  });
});
