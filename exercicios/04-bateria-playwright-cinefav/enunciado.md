# Bateria Playwright — CineFav (15 pts)

**Disciplina:** Qualidade em Aplicações Web e Mobile
**Tempo estimado:** ≈ 3 horas (pode terminar em casa)
**Entrega:** fork + Pull Request no repositório da disciplina — prazo: **ver Canvas**
**Valor:** 15 pontos

---

> ### 🧭 Exercício 1 × Exercício 2 — qual é qual?
>
> | | **Exercício 1** | **Exercício 2 — Bateria (este)** |
> |---|---|---|
> | Pasta | `exercicios/01-lab-web-pwa-playwright/` | `exercicios/04-bateria-playwright-cinefav/` |
> | O que é | aquecimento: **4 testes** do spec 02 (busca + mock) | bateria de ~3h: **20 desafios** + missão livre |
> | Valor | sem nota (Canvas: "Atividade 2 — Playwright…") | **15 pts** (Canvas: "Bateria Playwright — CineFav") |
> | Porta do app | `4173` | `4174` |
>
> **Faça o Exercício 1 antes.** Esta Bateria assume que você já sabe `await expect(...)` e mock com `page.route`.

---

## O que é este exercício

Uma **bateria de 20 desafios + 1 missão livre** sobre o **CineFav Web** (o mesmo app das Aulas 2 e 3), do básico ao intermediário. Cada desafio ensina **uma coisa** e os temas se repetem em dificuldade crescente:

| Bloco | Tema | Desafios | Do fácil ao difícil |
|---|---|---|---|
| **A** | Locators | A1 · A2 · A3 | 🟢 → 🟡 → 🔴 |
| **B** | Expect e espera (auto-wait) | B1 · B2 · B3 | 🟢 → 🟡 → 🔴 |
| **C** | Mock de rede | C1 · C2 · C3 · C4 | 🟢 → 🟡 → 🟡 → 🔴 |
| **D** | Conta, Page Object e fixtures | D1 · D2 · D3 | 🟡 → 🟡 → 🔴 |
| **E** | SPA, PWA e offline | E1 · E2 · E3 · E4 | 🟢 → 🟡 → 🔴 → 🔴 |
| **F** | Caçada ao teste instável (flaky) | F1 (a, b, d) | conserto |
| **Livre** | Você decide o que testar | 3 testes + respostas | 🔴 aberto |

🟢 **fácil** = o cenário vem pronto, você escreve o `expect` · 🟡 **médio** = você monta a sequência, com passo a passo · 🔴 **difícil** = você escreve o teste inteiro.

> **Regra de ouro da disciplina:** o app vem pronto; **você escreve só os testes.** Você não altera nada dentro de `src/`.

## Como isto se conecta com as aulas

| O que vimos | Onde você usa |
|---|---|
| **Aula 2** — recorder (`codegen`), `getByTestId`/`getByRole`, `storageState`, `page.route` (mock) | A, C, D1 |
| **Aula 3** — SPA e hidratação (`data-app-ready`, esperar por sinal e não por tempo) | B, E1 |
| **Aula 3** — Service Worker (registrado ≠ ativo ≠ controlando), instalação, "site × PWA" | E2, E3 |
| **Aula 3** — "2 gavetas" (Cache Storage + IndexedDB) e fila offline | E4 |
| **Aula 3** — "o recorder grava cliques, mas não confere nada" | D1 (refazer o cadastro gravado em aula, limpo e com `expect`) |

O que é **novo** (você não viu em aula) está marcado com **NOVO** dentro de cada desafio, sempre com link de estudo em [`MATERIAIS.md`](MATERIAIS.md): `getByLabel`, `filter({ hasText })`, `expect.poll`, `expect.soft`, `route.fetch()`, `page.on('request')`, Page Object, `test.extend`, `--repeat-each`.

## Comece por aqui

➡️ **[`COMECE-AQUI.md`](COMECE-AQUI.md)** — instalação, como rodar, como validar, o que fazer se algo quebrar.
➡️ **[`MATERIAIS.md`](MATERIAIS.md)** — links de estudo para cada tema (todos gratuitos).

## Como cada desafio é apresentado

Abra os arquivos em `pratica/tests/bateria/` **na ordem (01 → 06)**. Em cada desafio você encontra, em comentários:

- 🎯 **o objetivo** do bloco e 📚 **o que você aprende** ali
- 🧩 **como fazer** (passo a passo; nos 🔴 só o objetivo e os critérios)
- 🆘 **dicas** (abra só se travar)
- ✅ **como saber que acertou**

A linha `falta('…')` é o **"vermelho de propósito"**: enquanto ela existir o teste falha, e o placar mostra ⬜. Quando você escrever o teste de verdade, **apague a linha**.

## Como você valida que está certo (3 camadas)

1. **Um desafio por vez:** `npx playwright test 01-locators` (ou o arquivo do bloco) → tem que ficar **verde**.
2. **Placar geral:** `npm run check` → mostra ✓ / ⬜ / ✗ / 🐛 de cada desafio e avisa de teste **sem `expect`** (que não conta).
3. **Automático no seu PR:** o bot **J.A.R.V.I.S.** comenta a cada `push` a **nota mínima automática** e o que falta. A nota final sai no Canvas.

## O que entregar

1. Os 20 desafios feitos (sem nenhum `falta(...)` sobrando).
2. **Missão livre:** `pratica/tests/livre/missao-livre.spec.ts` com 3 testes (`feliz:`, `negativo:`, `borda:`).
3. **`pratica/RESPOSTAS.md`** preenchido (6 perguntas curtas).
4. A suíte **verde 3 vezes seguidas** (`npm run test:e2e`, 3×).

## Critérios de avaliação (15 pts)

| # | Critério | Pontos | Como é avaliado |
|---|---|---|---|
| 1 | **Locators** (A1–A3) | 2 | 🤖 automático (piso) |
| 2 | **Expect e espera** (B1–B3) | 2 | 🤖 automático |
| 3 | **Mock de rede** (C1–C4) | 3 | 🤖 automático |
| 4 | **Conta, Page Object e fixtures** (D1–D3) | 2 | 🤖 automático |
| 5 | **SPA, PWA e offline** (E1–E4) | 2 | 🤖 automático |
| 6 | **Teste instável consertado** (F1) | 1 | 🤖 automático |
| 7 | **Missão livre** — escolha do fluxo, 3 testes de qualidade, risco coberto | 2 | 📝 manual (Canvas) |
| 8 | **RESPOSTAS.md** — entendeu o porquê, não só o como | 1 | 📝 manual (Canvas) |

> O bot comenta só o **piso** (critérios 1–6, estrutural). Os critérios 📝 entram na nota final no Canvas — por isso o número do bot nunca passa da sua nota real.

**Critério eliminatório:** a suíte precisa passar **100% em 3 execuções seguidas**. Teste instável é bug do teste, não azar.

## Como entregar (sem conflito de git)

O passo a passo completo (com comandos para Mac/Linux e Windows) está em **[`COMECE-AQUI.md`](COMECE-AQUI.md)**. Resumo:

1. **Clone o repositório do professor numa pasta nova** e crie a branch `bateria` — **não** sincronize nem reuse o fork antigo (é aí que nasce conflito).
2. Trabalhe **só** em `exercicios/04-bateria-playwright-cinefav/pratica/` (arquivos de `tests/` e `RESPOSTAS.md`).
3. Ligue ao seu fork (`git remote add meu …`), `git push -u meu bateria` e abra o **Pull Request** da sua branch `bateria` para o `main` do professor.
4. A cada `push` o bot reavalia sozinho.

> O material deste exercício **não será alterado depois de publicado**, então não existe nada para "atualizar". ⚠️ **Deu `CONFLICT`/`MERGING`?** Não resolva à mão — veja [`COMECE-AQUI.md` → "Deu conflito?"](COMECE-AQUI.md#deu-conflito-não-resolva-faça-isso).

## Regras

- **IA é permitida, esconder não é.** Declare no `RESPOSTAS.md` se usou. Cópia que você não consegue explicar = zero (as perguntas do `RESPOSTAS.md` existem pra isso).
- **Originalidade:** os testes e as respostas são seus.
- **Não use** `waitForTimeout` (sleep fixo) nem altere `src/`.
- **Custo zero:** tudo roda local, sem token, sem conta, sem serviço pago.
