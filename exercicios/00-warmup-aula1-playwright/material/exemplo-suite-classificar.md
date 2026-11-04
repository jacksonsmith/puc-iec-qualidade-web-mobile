# Exercício — classifique a suíte

Projeto fictício: app de e-commerce. 6 trechos de teste, tirados (e simplificados) da suíte real do time. Pra cada um: **Unit**, **Integration** ou **E2E**? Justifique em 1 frase.

---

## Trecho 1

```typescript
function calcularDesconto(preco: number, percentual: number): number {
  return preco - (preco * percentual) / 100;
}

test('calcula 10% de desconto corretamente', () => {
  expect(calcularDesconto(100, 10)).toBe(90);
});
```

## Trecho 2

```typescript
test('checkout completo: login → carrinho → pagamento → confirmação', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@test.com');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.getByRole('link', { name: 'Carrinho' }).click();
  await page.getByRole('button', { name: 'Finalizar compra' }).click();
  await page.getByLabel('Número do cartão').fill('4111111111111111');
  await page.getByRole('button', { name: 'Pagar' }).click();
  await expect(page.getByText('Pedido confirmado')).toBeVisible();
});
```

## Trecho 3

```typescript
test('CartService.addItem salva no banco e retorna total atualizado', async () => {
  const db = await getTestDatabase(); // banco real de teste, não mockado
  const cartService = new CartService(db);
  await cartService.addItem({ productId: 42, qty: 2 });
  const total = await cartService.getTotal();
  expect(total).toBe(159.80);
});
```

## Trecho 4

```typescript
test('ProductCard renderiza nome, preço e botão de comprar', () => {
  render(<ProductCard product={{ name: 'Tênis', price: 199.9 }} />);
  expect(screen.getByText('Tênis')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /comprar/i })).toBeInTheDocument();
});
```

## Trecho 5

```typescript
test('API /api/cart retorna 401 sem token de auth', async () => {
  const response = await request(app).get('/api/cart');
  expect(response.status).toBe(401);
});
```

## Trecho 6

```typescript
test('busca por "tênis" mostra resultados filtrados e mantém filtro após reload', async ({ page }) => {
  await page.goto('/busca?q=tenis');
  await expect(page.getByTestId('resultado')).toHaveCount(12);
  await page.reload();
  await expect(page.getByTestId('resultado')).toHaveCount(12);
});
```

---

## Depois de classificar

- Contem quantos ficaram em cada categoria. Que formato (Pirâmide Cohn, Trophy, Honeycomb) essa proporção mais parece?
- O Trecho 3 é o mais controverso da lista — ele bate num banco real, não mocka nada. Isso é Unit ou Integration? Defendam os dois lados.
