# CineFav Web — Exercício 1 (Playwright: busca + network mocking)

App de filmes **já pronto** (React + Vite + PWA). Você **não escreve o app** — só **testes**.

## Qual exercício é este?

| | **Exercício 1** (esta pasta) | **Exercício 2 — Bateria Playwright** |
|---|---|---|
| Onde | `exercicios/01-lab-web-pwa-playwright/` | `exercicios/04-bateria-playwright-cinefav/` |
| O que é | aquecimento da Aula 2: **4 testes** de `02-busca-mock.spec.ts` | bateria de ~3h: 20 desafios + missão livre |
| Porta do app | `4173` | `4174` |

👉 **Comece pelo [`../COMECE-AQUI.md`](../COMECE-AQUI.md).** O enunciado está em [`../enunciado.md`](../enunciado.md).
Specs 03–05, Lighthouse, Firebase, bônus: [`../EXTRAS.md`](../EXTRAS.md) (opcional, **depois** do Exercício 1).

```bash
cd exercicios/01-lab-web-pwa-playwright/pratica
ls tests/e2e        # Windows: dir tests\e2e   → deve listar 02-busca-mock.spec.ts
```
Abra **esta pasta** no editor (`code .`).

## Os 4 testes do Exercício 1

Arquivo: `tests/e2e/02-busca-mock.spec.ts` — troque cada `// TODO` por um `await expect(...)`.

| # | Teste | Dificuldade |
|---|---|---|
| 1 | abrir a tela de busca (`search-screen` visível) | 🟢 fácil |
| 2 | o título "Buscar" aparece | 🟢 fácil |
| 3 | buscar "Matrix" mostra o resultado | 🟢 fácil |
| 4 | mock: `route.fulfill` injeta um filme inventado | 🟡 médio |

Os testes 5, 6 e 7 do arquivo são treino opcional.

## O que entregar
1. Testes **1, 2, 3 e 4** completos (cada um com `await expect(...)` + matcher).
2. Print dos 4 verdes.
3. Pull Request (preferencial) ou .zip da pasta `pratica/` sem `node_modules` — como a Atividade no Canvas pedir.

## Comandos úteis
| Para quê | Comando |
|---|---|
| Rodar o Exercício 1 | `npx playwright test 02-busca-mock` |
| Ver cada passo na tela | `npm run test:e2e:ui` |
| Rodar só um teste | `npx playwright test 02-busca-mock -g "4\."` |
| Gravar o código clicando | `npx playwright codegen http://localhost:4173/qa` |
| Avisar `await`/`expect` faltando | `npm run lint` |

> ⚠️ `expect` sobre locator/página **precisa de `await`**. Sem ele o teste passa "de mentira".

