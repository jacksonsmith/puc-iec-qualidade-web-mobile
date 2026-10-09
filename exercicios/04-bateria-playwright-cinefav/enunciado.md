# Exercício 2 — Bateria Playwright (CineFav) · 15 pts

**Disciplina:** Qualidade em Aplicações Web e Mobile · **Aula de 15/10** · ≈ 3h a 4h (a missão livre e as respostas podem terminar em casa)
**Entrega:** Pull Request — prazo: **ver Canvas**

> **Exercício 1 × Exercício 2:** o Exercício 1 (`exercicios/01-busca-mock-playwright/`, 4 testes de busca + mock, aula passada) é **outra atividade**. Recomendo fazê-lo antes: a Bateria usa `await expect(...)` e `page.route`.

## O que é
**20 desafios + 1 missão livre** no CineFav Web, do básico ao intermediário. O app já está pronto — **você escreve só testes** (não mexa em `src/`; pode **ler** `src/utils/testIDs.ts`, que lista todos os testids).

| Bloco | Tema | Desafios | Nível |
|---|---|---|---|
| A | Locators | A1 A2 A3 | 🟢 🟡 🔴 |
| B | Expect e espera | B1 B2 B3 | 🟢 🟡 🔴 |
| C | Mock de rede | C1 C2 C3 C4 | 🟢 🟡 🟡 🔴 |
| D | Conta, Page Object, fixtures | D1 D2 D3 | 🟡 🟡 🔴 |
| E | SPA, PWA, offline | E1 E2 E3 E4 | 🟢 🟡 🔴 🔴 |
| F | Caçada ao teste instável | F1a F1b F1d | conserto |
| Livre | você escolhe o fluxo | 3 testes | 🔴 |

🟢 só falta o `expect` · 🟡 você monta a sequência (passo a passo no arquivo) · 🔴 você escreve o teste inteiro.
**Cada desafio traz, em comentário: o que você aprende, como fazer, dica e link de estudo.** A linha `falta('…')` é o "vermelho de propósito": apague-a quando escrever o teste.

**Conexão com as aulas:** Aula 2 (`getByTestId`/`getByRole`, `storageState`, `page.route`) → blocos A, C, D · Aula 3 (SPA e esperar por sinal, Service Worker, "2 gavetas", fila offline, recorder sem `expect`) → B, E, D1.

## Como saber que está certo
1. `npx playwright test 01-locators` (arquivo do bloco) → **verde** · 2. `npm run check` → placar ✓/⬜/✗/🐛 · 3. o bot **J.A.R.V.I.S.** comenta no PR a nota automática (piso).

## O que entregar
Os 20 desafios + `pratica/tests/livre/missao-livre.spec.ts` (3 testes: `feliz:`, `negativo:`, `borda:`) + `pratica/RESPOSTAS.md` preenchido, com a suíte **verde 3 vezes seguidas**.

## Critérios (15 pts)
| Critério | Pts | Como |
|---|---|---|
| A Locators · B Expect · D Conta/PO/fixtures · E SPA/PWA | 2 cada | 🤖 automático (piso) |
| C Mock de rede | 3 | 🤖 |
| F Teste instável consertado | 1 | 🤖 |
| Missão livre (fluxo, 3 testes, risco coberto) | 2 | 📝 manual (Canvas) |
| `RESPOSTAS.md` (entendeu o porquê) | 1 | 📝 manual |

Eliminatório: a suíte passar **100% em 3 execuções seguidas**. O bot comenta só o piso; a nota final sai no Canvas.

## Regras
IA é permitida, **esconder não é**: declare no `RESPOSTAS.md`. Não use `waitForTimeout`. Tudo roda local, sem token nem serviço pago.

➡️ **[`COMECE-AQUI.md`](COMECE-AQUI.md)** — instalar, rodar, entregar.
