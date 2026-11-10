import { test, expect } from '@playwright/test';

test.describe('Missão Livre — CineFav Exploratório', () => {
  // 1. Cenário Feliz: Filtrar ou buscar por um termo existente com sucesso
  test('feliz: busca por um filme existente exibe o card corretamente', async ({ page }) => {
    await page.goto('/search');
    await page.getByTestId('search-input').pressSequentially('Pulp Fiction', { delay: 50 });
    
    const resultCard = page.getByTestId('search-result-680');
    await expect(resultCard).toBeVisible();
    await expect(resultCard).toContainText('Pulp Fiction');
  });

  // 2. Cenário Negativo: Buscar por um filme que não existe e verificar estado vazio
  test('negativo: busca por termo inexistente exibe mensagem de nenhum resultado', async ({ page }) => {
    await page.goto('/search');
    await page.getByTestId('search-input').pressSequentially('filmeinexistentexyz123', { delay: 50 });
    
    const emptyState = page.getByTestId('search-empty');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('filmeinexistentexyz123');
  });

  // 3. Cenário de Borda: Enviar comentário vazio ou tentar interagir com campos limites
  test('borda: tentativa de enviar comentário vazio mantém o estado restrito', async ({ page }) => {
    await page.goto('/movie/603');
    await expect(page.getByTestId('detail-title')).toBeVisible();

    const submitButton = page.getByTestId('comment-submit-button');
    // Como o campo está vazio, o botão deve estar desabilitado ou a submissão impedida
    await expect(submitButton).toBeDisabled();
  });
});