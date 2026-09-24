# Roteiro guiado — Lab Aula 1 (90min, ao vivo, não avaliativo)

> **Não vale nota.** É esquenta — testado e rodando antes da aula, sem risco de setup quebrar (instala em ~10s, não precisa de browser, emulador nem simulador).
>
> Reaproveitado do curso de Testes de Aplicações Mobile (`02-suite-jest-rntl`) — mesma `favoritesStore` (Zustand) do CineFav, usada em Arquitetura e Testes. Hoje é a estreia dela em Qualidade.

---

## A ideia (antes de abrir o terminal)

**Mobile first, depois web.** Vamos escrever a lógica de favoritar pensando primeiro no app mobile (`FavoriteButton.native.tsx`), e só depois olhar a versão web (`FavoriteButton.web.tsx`) — pra mostrar na prática que **a lógica de negócio não deveria saber em qual plataforma está rodando**.

Abram os 2 componentes lado a lado (`src/FavoriteButton.native.tsx` e `src/FavoriteButton.web.tsx`) — reparem: a única diferença é a "casca" de UI (`Pressable`/`Text` vs `button`). A lógica (`useFavoritesStore`) é **idêntica, char por char**.

> É por isso que hoje testamos a **store**, não o componente — 1 suíte de teste cobre os dois mundos ao mesmo tempo.

---

## Passo 0 — Setup (10min)

```bash
cd exercicios/00-warmup-aula1-unit-testing
npm install
npm test
```

**Esperado:** 1 suíte falha (`favoritesStore.test.ts`) com 4 vermelhos + 2 "todo" — é assim que deve começar. Se der erro de instalação, ninguém trava a aula: acompanhe pela tela.

---

## Passo 1 — Os "fáceis" (FÁCIL 1-4, ~30min)

Abram `__tests__/favoritesStore.test.ts`. Os itens 1-4 já têm Arrange+Act prontos — só falta completar o `expect`.

Façam juntos os itens **1 e 2** (🧑‍🏫), depois cada um tenta sozinho os itens **3 e 4** (🧑‍💻) antes de revelar a resposta.

```bash
npm test -- --watch
```

(deixa rodando em watch mode — cada `expect` preenchido já mostra vermelho→verde na hora)

**Discussão a cada item resolvido:** por que `beforeEach` reseta o estado? O que aconteceria se um teste "vazasse" pro próximo?

---

## Passo 2 — Os desafios (DESAFIO 5-6, ~25min)

Itens 5 e 6 estão como `it.todo` — sem Arrange nem Act, só a dica em comentário. Tentem escrever do zero.

- Item 5: `add` chamado 2× com o mesmo id não pode duplicar.
- Item 6: `toggle` alterna — primeira chamada favorita, segunda desfavorita.

Se travar depois de 10min tentando, olhem `gabarito/favoritesStore.answer.test.ts` juntos e comparem com o que vocês escreveram (não é "colar", é comparar abordagem).

---

## Passo 3 — Voltando pros componentes (~15min)

Com a store 100% testada e verde, voltem pra `FavoriteButton.native.tsx` e `FavoriteButton.web.tsx`.

**Discussão:** se eu quisesse testar o *componente* (não só a store), o que mudaria entre testar a versão mobile (React Native Testing Library) e a versão web (React Testing Library)? O que continuaria igual?

> Não vamos escrever esse teste hoje — ele volta na Aula 2 (Playwright, web) e na Aula 4 (Maestro/RNTL, mobile). Hoje é só a base da pirâmide: **unit**.

---

## Passo 4 — Fechamento (~10min)

Voltem pro slide da Pirâmide/Trophy/Honeycomb: o que vocês escreveram hoje é qual fatia de qual pirâmide? Isso conecta com a Aula 2 e a Aula 4 — vocês vão subir a pirâmide ao longo do semestre, não só ficar no unit.

---

## Não usado hoje (fica pra depois)

- `exercicios/00-warmup-aula1-playwright/` — roteiro alternativo (E2E com Playwright + TodoMVC) que a gente cogitou e guardou pra Aula 2 ou bônus.
