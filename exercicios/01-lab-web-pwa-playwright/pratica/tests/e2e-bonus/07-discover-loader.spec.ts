// tests/e2e-bonus/07-discover-loader.spec.ts
// ─────────────────────────────────────────────────────────────────────────────
// 🎁 BÔNUS — não entra nos 20pts da rubrica. Roda SEPARADO da suíte
// avaliativa: `npm run test:bonus` (nunca `npm run test:e2e`). Por isso fica
// numa pasta própria (tests/e2e-bonus/) com config própria — esse desafio
// bate em rede REAL do TMDB, não pode fazer parte do critério eliminatório
// (3 runs 100% verde) nem do CI que corrige a Atividade.
//
// Precisa de internet E de VITE_TMDB_TOKEN válido no .env.local (ver
// .env.example) — esse teste usa route.continue(), a chamada é REAL. Sem
// token, o TMDB responde 401 e o teste falha — normal, não é bug seu.
// ─────────────────────────────────────────────────────────────────────────────

import { test, expect } from '@playwright/test';
import { DiscoverDetailPage } from './pages/DiscoverDetailPage';

const MOVIE_ID = 969681; // Homem-Aranha: Um Novo Dia — id real, existe no TMDB
const ATRASO_MS = 2000;

// Mesmo pitfall do spec 02: o Service Worker responde fetch por conta própria e
// essa requisição nunca chegaria no page.route(). Bloqueado, o atraso vale sempre.
test.use({ serviceWorkers: 'block' });

test.describe('Discover detail — loader com rede real throttled', () => {
  test('1. loader aparece durante o atraso e some quando o filme real chega', async ({ page }) => {
    let atrasoTerminou = false;

    // Só ATRASA: depois do delay a chamada segue pra rede DE VERDADE (continue),
    // sem mockar conteúdo nenhum.
    await page.route(`**/movie/${MOVIE_ID}*`, async (route) => {
      await new Promise((r) => setTimeout(r, ATRASO_MS));
      atrasoTerminou = true;
      await route.continue();
    });

    const detail = new DiscoverDetailPage(page);
    await detail.goto(MOVIE_ID);

    // Durante o atraso: o loader já está na tela e a resposta ainda não foi liberada.
    await expect(detail.loading).toBeVisible();
    expect(atrasoTerminou).toBe(false);

    // Depois: o loader some, o filme real aparece, e isso só acontece após o delay.
    await detail.expectLoadingThenLoaded();
    expect(atrasoTerminou).toBe(true);
    await expect(detail.title).toHaveText(/\S/);
  });
});
