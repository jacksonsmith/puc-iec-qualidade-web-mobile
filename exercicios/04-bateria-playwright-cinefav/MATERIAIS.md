# Materiais de estudo — Bateria Playwright

> Tudo **gratuito e aberto**. Nenhum precisa de conta. ⏱ = tempo de leitura sugerido.
> **NOVO** = tema que **não** foi visto em aula. O resto é revisão do que vimos nas Aulas 2 e 3.
> Regra prática: **leia só a seção do bloco em que está travado** — não precisa ler tudo.

## Bloco A — Locators
- **[Locators](https://playwright.dev/docs/locators)** (doc oficial) ⏱ 15 min — foque em `getByRole`, `getByLabel`, `filter` e "chaining/escopo". **NOVO:** `getByLabel`, `filter({ hasText })`.
- [Other locators (CSS/XPath)](https://playwright.dev/docs/other-locators) ⏱ 5 min — o seletor `[data-testid^="…"]` (começa com) vem daqui. **NOVO**
- [Best practices](https://playwright.dev/docs/best-practices) ⏱ 10 min — por que "locator pelo que o usuário vê" é mais estável que pelo CSS.

## Bloco B — Expect e espera
- **[Assertions](https://playwright.dev/docs/test-assertions)** ⏱ 15 min — `toHaveCount`, `toHaveValue`, `toBeHidden`, e as seções **Soft assertions** e **Polling** (`expect.poll`). **NOVO:** `expect.poll`, `expect.soft`.
- [Auto-waiting (actionability)](https://playwright.dev/docs/actionability) ⏱ 8 min — o que o Playwright espera **antes** de clicar. É o motivo de não precisar de sleep.

## Bloco C — Mock de rede
- **[Mock APIs](https://playwright.dev/docs/mock)** ⏱ 12 min — `route.fulfill`, **`route.fetch()` + alterar a resposta** (C3), `unroute`. **NOVO:** `route.fetch()`.
- [Network](https://playwright.dev/docs/network) ⏱ 10 min — eventos `request`/`response` (C4: contar requisições). **NOVO:** `page.on('request')`.
- [Service Workers](https://playwright.dev/docs/service-workers) ⏱ 5 min — por que o SW atrapalha o mock e como bloquear (`serviceWorkers: 'block'`). Revisão da Aula 3.

## Bloco D — Conta, Page Object e fixtures
- [Authentication](https://playwright.dev/docs/auth) ⏱ 10 min — `storageState` (revisão da Aula 2) e como começar **sem** sessão.
- [Codegen (recorder)](https://playwright.dev/docs/codegen-intro) ⏱ 5 min — gravar e salvar com `-o`. Revisão.
- **[Page Object Models](https://playwright.dev/docs/pom)** ⏱ 8 min — a classe do D2. **NOVO**
- **[Fixtures](https://playwright.dev/docs/test-fixtures)** ⏱ 15 min — `test.extend` (D3). Leia "Creating a fixture" e "Fixtures with parameters"/`use`. **NOVO**

## Bloco E — SPA, PWA e offline
- **[Learn PWA (web.dev)](https://web.dev/learn/pwa)** ⏱ escolha 1 capítulo (Service Workers ou Caching) — revisão do que vimos em aula, com outra explicação.
- [Service Worker API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) — ciclo de vida: installing → installed → activating → **activated** → controlling.
- [IndexedDB (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) e [CacheStorage (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage) — as "2 gavetas" da aula.
- [`BrowserContext.setOffline`](https://playwright.dev/docs/api/class-browsercontext) — procure por `setOffline` na página (E3, E4).

## Bloco F — Teste instável (flaky)
- **[Retries e testes flaky](https://playwright.dev/docs/test-retries)** ⏱ 8 min — `--repeat-each` e o que é um teste flaky no Playwright. **NOVO**
- [Trace Viewer](https://playwright.dev/docs/trace-viewer-intro) ⏱ 8 min — ver o "filme" do teste, passo a passo. **NOVO**
- [Debugging](https://playwright.dev/docs/debug) ⏱ 5 min — modo UI, `--headed`, `--debug`.
- Leitura de fundo (opcional, ótimas): [Flaky Tests at Google](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html) · [Eradicating Non-Determinism in Tests — Martin Fowler](https://martinfowler.com/articles/nonDeterminism.html).

## Missão livre
- [Test annotations](https://playwright.dev/docs/test-annotations) ⏱ 6 min — `test.step`, `test.fixme`, `test.fail` (bônus exploratório). **NOVO**
- [Parametrizar testes](https://playwright.dev/docs/test-parameterize) ⏱ 5 min — se o seu fluxo tem vários casos parecidos.
