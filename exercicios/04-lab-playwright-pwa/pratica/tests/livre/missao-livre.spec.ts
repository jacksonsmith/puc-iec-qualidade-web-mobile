import { test, expect } from '@playwright/test';

async function login(page: any) {
  await page.goto('http://localhost:4174/login');

  await page.getByTestId('login-email-input').fill('aluno@puc.br');
  await page.getByTestId('login-password-input').fill('1234');

  // Ajuste o nome do botão se necessário
  await page.getByRole('button', { name: /entrar/i }).click();

  // Aguarda a navegação após o login
  await expect(page).not.toHaveURL(/login/);
}

async function abrirAmbienteQA(page: any) {
  await page.getByText(
    '🧪 Ambiente QA (busca, favoritos, testes)'
  ).click();
  
  await expect(
    page.getByTestId('movielist-search-button')
  ).toBeVisible();
}


test.describe('Missão livre — Busca de filmes', () => {
  test('feliz: navegar para busca pelo botão Buscar', async ({ page }) => {
    await login(page);

    await abrirAmbienteQA(page);

    await page.getByTestId('movielist-search-button').click();

    await expect(page).toHaveURL(/search/);
  });

 test('negativo: botão Buscar não está visível antes de abrir o ambiente QA', async ({ page }) => {
  await login(page);

  await expect(
    page.getByTestId('movielist-search-button')
  ).toBeHidden();
});

  test('borda: voltar pelo histórico retorna para a tela QA', async ({ page }) => {
    await login(page);

    await abrirAmbienteQA(page);

    await page.getByTestId('movielist-search-button').click();

    await expect(page).toHaveURL(/search/);

    await page.goBack();

    await expect(page).toHaveURL(/qa/);
  });
});
