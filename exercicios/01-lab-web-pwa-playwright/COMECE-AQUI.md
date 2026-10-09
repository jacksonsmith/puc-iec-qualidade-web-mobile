# Comece aqui — Exercício 1 (spec 02: busca + network mocking)

> Este guia é **só do Exercício 1**: completar os **testes 1 a 4** de `02-busca-mock.spec.ts`. Tempo: ≈ 45 min.
> Procurando a **Bateria de 3h** (Exercício 2)? Ela está em `exercicios/04-bateria-playwright-cinefav/COMECE-AQUI.md`.
> Outros specs desta pasta (03, 04, 05, bônus, Firebase…) → [`EXTRAS.md`](EXTRAS.md) (opcional, depois).

## 1. Baixe e entre na pasta certa

```bash
git clone https://github.com/<SEU-USUARIO>/puc-iec-qualidade-web-mobile.git
cd puc-iec-qualidade-web-mobile/exercicios/01-lab-web-pwa-playwright/pratica

ls tests/e2e        # prova de que está no lugar certo → deve listar 02-busca-mock.spec.ts
```

> **Windows:** troque `ls` por `dir` e `/` por `\`.
> **Já tem o repositório baixado?** Não precisa baixar de novo — **não use "Sync fork"** se aparecer qualquer aviso de conflito (veja "Deu conflito?" abaixo).

## 2. Instale

```bash
npm install
npx playwright install chromium
```

Abra **esta pasta** (`pratica/`) no VS Code (`code .`) — senão o editor não acha o projeto.

## 3. Rode — está tudo "verde vazio"

```bash
npx playwright test 02-busca-mock
```

Os testes passam **sem verificar nada** (os `TODO` ainda não viraram código). **Seu trabalho é transformar cada `TODO` em um `await expect(...)`.**

## 4. Faça os testes 1 a 4

Abra `tests/e2e/02-busca-mock.spec.ts`. Para cada teste, leia o comentário `// TODO` e escreva a linha:

| Teste | Dica do que escrever |
|---|---|
| **1** abrir a tela de busca | `await expect(page.getByTestId('search-screen')).toBeVisible();` |
| **2** título "Buscar" aparece | `await expect(page.getByText('Buscar'))....` |
| **3** buscar "Matrix" | `await expect(page.getByTestId('search-result-603'))....` |
| **4** mock com `route.fulfill` | o mock já está escrito — falta conferir `search-result-999` e o título do filme inventado |

> Os testids estão todos em `src/utils/testIDs.ts`.

**Como conferir cada um:**
```bash
npx playwright test 02-busca-mock -g "1\."      # só o teste 1 (troque o número)
npm run test:e2e:ui                              # modo UI: mostra antes/depois de cada linha (recomendado)
npm run lint                                     # avisa teste sem expect ("Test has no assertions")
```

💡 **Travou?** `npx playwright codegen http://localhost:4173/qa` abre o app e **escreve o código** enquanto você clica. Copie o trecho útil.

## 5. Entregue

1. `npx playwright test 02-busca-mock` → testes **1, 2, 3 e 4 verdes**, e `npm run lint` sem "no assertions" neles.
2. Tire um **print** com os 4 verdes.
3. Entregue **como a Atividade no Canvas pede** (Pull Request preferencial, ou .zip da pasta `pratica/` sem `node_modules`).
4. No PR, o bot comenta **quantos dos 4 testes** estão completos; corrija e dê `push` para ele reavaliar.

## Deu conflito? Não resolva — faça isso

Se aparecer `CONFLICT`, `MERGING` ou `<<<<<<<`: **pare**, não resolva à mão.
1. Copie `pratica/tests/e2e/02-busca-mock.spec.ts` (o seu) para fora do repositório.
2. Baixe o repositório **de novo numa pasta nova** (`git clone … outra-pasta`).
3. Cole o seu arquivo por cima do mesmo caminho e continue.

## Travou?

- `npm run test:e2e:ui` — modo UI do Playwright
- Office hours semanal — link no Canvas
