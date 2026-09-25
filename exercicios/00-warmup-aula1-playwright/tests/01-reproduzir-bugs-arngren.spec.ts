import { test, expect } from '@playwright/test';
import { ArngrenPage } from '../pom/ArngrenPage';

/**
 * Reproduzindo com Playwright os bugs que a turma achou na unha (Aula 1,
 * exploratório com Charter + FEW HICCUPPS no arngren.net).
 *
 * `test.fail()` marca o teste como "sabemos que falha, é esperado":
 * - Falhar (o normal, bug ainda existe) → CI mostra VERDE ("expected failure").
 * - Passar (bug foi corrigido) → CI mostra VERMELHO — alerta real de que
 *   algo mudou. É assim que se documenta um bug conhecido igual um ticket
 *   de verdade, sem poluir a esteira com vermelho o tempo todo.
 */

test.describe('arngren.net — bugs de acessibilidade/responsividade', () => {
  test('BUG-001: página deveria ter meta viewport (responsividade)', async ({ page }) => {
    test.fail();
    await page.goto('');
    const arngren = new ArngrenPage(page);

    // Categoria: Performance/UI (ISO 25010) — sem isso, mobile não escala a página.
    expect(await arngren.hasViewportMeta()).toBe(true);
  });

  test('BUG-002: imagens deveriam ter texto alternativo (acessibilidade)', async ({ page }) => {
    test.fail();
    await page.goto('');
    const arngren = new ArngrenPage(page);

    const semAlt = await arngren.imagesWithoutAlt();
    const total = await arngren.totalImages();
    console.log(`${semAlt} de ${total} imagens sem alt`);

    // Categoria: Acessibilidade — leitor de tela não consegue descrever a imagem.
    expect(semAlt).toBe(0);
  });

  test('BUG-003: <html> deveria ter atributo lang (acessibilidade)', async ({ page }) => {
    test.fail();
    await page.goto('');
    const arngren = new ArngrenPage(page);

    // Categoria: Acessibilidade — leitor de tela não sabe em que idioma ler.
    expect(await arngren.hasLangAttribute()).toBe(true);
  });
});

test.describe('DESAFIO — encontrem e reproduzam o de vocês', () => {
  test.skip('BUG-00X: escrevam aqui um bug que VOCÊS acharam no charter da Aula 1', async ({ page }) => {
    test.fail(); // mantenham essa linha — o objetivo é documentar, não corrigir
    await page.goto('');
    // Dica: locator + expect. Ex.: contraste, tamanho de fonte,
    // link quebrado, elemento sem texto legível.
  });
});
