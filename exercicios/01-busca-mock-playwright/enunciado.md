# Exercício 1 — Playwright: busca + network mocking

**Disciplina:** Qualidade em Aplicações Web e Mobile · **Aula 2** · ≈ 45 min
**Valor e prazo:** ver Canvas ("Atividade 2 — Playwright: busca + network mocking")

## O que fazer
O CineFav Web já está pronto — você escreve só **testes**. Em `pratica/tests/busca-mock.spec.ts`, complete **4 testes**, trocando a linha `falta('…')` por um `await expect(…)`:

| # | Teste | Você aprende | |
|---|---|---|---|
| 1 | abrir a tela de busca | `expect` + "está visível" | 🟢 |
| 2 | o título "Buscar" aparece | achar elemento por **texto** | 🟢 |
| 3 | buscar "Matrix" mostra o resultado | digitar e esperar o resultado | 🟢 |
| 4 | **mock**: o "backend" devolve um filme inventado | `page.route` + `route.fulfill` | 🟡 |

## Como saber que está certo
- `npx playwright test` → os **4 ficam verdes** (e nenhum `falta(…)` sobra).
- `npm run lint` → **sem avisos**. Aviso "Test has no assertions" = teste sem `expect` (verde de mentira).
- No Pull Request, o bot **J.A.R.V.I.S.** comenta quantos dos 4 estão completos.

## O que entregar
1. O `busca-mock.spec.ts` com os 4 testes completos.
2. Um **print** dos 4 testes verdes.
3. **Pull Request** (preferencial) ou `.zip` da pasta `pratica/` (sem `node_modules`) no Canvas.

➡️ Instalação, comandos e entrega passo a passo: **[`COMECE-AQUI.md`](COMECE-AQUI.md)**.

> ⚠️ `expect` sobre locator/página **precisa de `await`**. Sem ele o teste termina antes de conferir e fica verde "de mentira".
>
> **Exercício 2 (Bateria Playwright):** é outro exercício, da aula seguinte, em `exercicios/04-bateria-playwright-cinefav/`. Recomendo fazer este antes.

