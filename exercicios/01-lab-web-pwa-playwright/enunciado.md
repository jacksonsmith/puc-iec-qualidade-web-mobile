# Exercício 1 — Playwright: busca + network mocking (spec 02)

**Disciplina:** Qualidade em Aplicações Web e Mobile
**Aula:** 2 — Playwright Avançado
**Tempo estimado:** ≈ 45 min
**Entrega:** Pull Request (ou .zip no Canvas) — prazo e valor: **ver Canvas** (Atividade 2 — Playwright: busca + network mocking)

---

> ### 🧭 Exercício 1 × Exercício 2 — qual é qual?
>
> | | **Exercício 1** (este) | **Exercício 2 — Bateria Playwright** |
> |---|---|---|
> | Pasta | `exercicios/01-lab-web-pwa-playwright/` | `exercicios/04-bateria-playwright-cinefav/` |
> | O que é | **exercício da aula passada (Aula 2)**: 4 testes de **um** arquivo (`02-busca-mock.spec.ts`) | **exercício da aula dessa quinta**: bateria de ~3h, 20 desafios em 6 blocos + missão livre |
> | O que você entrega | os **testes 1, 2, 3 e 4** do spec 02, verdes, **com `expect`** | os 20 desafios + missão livre + `RESPOSTAS.md` |
> | Porta do app | `4173` | `4174` |
> | Canvas | "Atividade 2 — Playwright: busca + network mocking" | "Bateria Playwright — CineFav" |
>
> São **dois exercícios independentes**. Recomendo fazer o Exercício 1 primeiro: ele ensina a base (`await expect`, mock com `page.route`) que a Bateria usa.
> Os outros specs desta pasta (03, 04, 05, bônus) são **extras de estudo** — ficam em [`EXTRAS.md`](EXTRAS.md) e **não fazem parte** deste exercício.

---

## O que você vai fazer

No CineFav Web (o app **já está pronto** — você escreve só **testes**), complete os **4 primeiros testes** do arquivo `pratica/tests/e2e/02-busca-mock.spec.ts`:

| # | Teste | O que você aprende | Dificuldade |
|---|---|---|---|
| 1 | abrir a tela de busca | `expect(...).toBeVisible()` | 🟢 fácil |
| 2 | o título "Buscar" aparece | achar elemento por **texto** | 🟢 fácil |
| 3 | buscar "Matrix" mostra o resultado | digitar + esperar resultado | 🟢 fácil |
| 4 | **mock**: o "backend" devolve um filme inventado | `page.route` + `route.fulfill` | 🟡 médio |

Os testes 5, 6 e 7 do mesmo arquivo são treino opcional (não fazem parte da entrega).

Em cada teste há um `// TODO` com a **dica**. Você troca o `TODO` por uma linha `await expect(...)...`.

## Como começar

➡️ **[`COMECE-AQUI.md`](COMECE-AQUI.md)** — instalar, rodar e entregar, passo a passo.

## Como saber que está certo

1. `npx playwright test 02-busca-mock` → os testes 1–4 ficam **verdes**.
2. **Verde não basta:** teste sem `expect` também fica verde, mas não prova nada. Rode `npm run lint` — ele avisa "Test has no assertions".
3. O bot **J.A.R.V.I.S.** comenta no seu PR quantos dos 4 testes estão completos.

## O que entregar

1. Os **testes 1, 2, 3 e 4** de `02-busca-mock.spec.ts` completos, **todos** com `await expect(...)` + matcher (`.toBeVisible()`, `.toHaveText(...)`…).
2. **Print** com os 4 testes verdes (modo UI ou terminal).
3. Entrega: **Pull Request** (preferencial) ou **.zip da pasta `pratica/`** (sem `node_modules`) no Canvas.

> ⚠️ **Pegadinha da aula:** `expect` sobre locator/página **precisa de `await`**. Sem ele o teste termina antes da verificação e fica verde "de mentira".
