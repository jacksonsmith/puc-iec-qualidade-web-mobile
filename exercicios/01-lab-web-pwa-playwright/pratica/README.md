# CineFav Web — prática de Playwright, SPA e PWA

App de filmes **já implementado** (React + Vite + PWA). Você **não escreve UI** —
escreve os **testes**: os specs em `tests/e2e/` têm TODOs marcando o que falta.

É o mesmo produto do CineFav mobile (Lab Maestro): mesmas telas, mesmos
`data-testid`, mesmo dataset mockado — roda **offline, sem token, determinístico**.

## Setup

```bash
cd exercicios/02-lab-web-pwa-playwright/pratica

# confirme que está no lugar certo:
ls tests/e2e
# → deve mostrar: auth.setup.ts  01-login.spec.ts  02-busca-mock.spec.ts ...
```

> **Windows:** `cd exercicios\02-lab-web-pwa-playwright\pratica` e `dir tests\e2e`

```bash
npm install
npx playwright install chromium

# rodar o app (dev):
npm run dev          # http://localhost:5173  (login: aluno@puc.br / 1234)

# rodar a suíte E2E (builda e testa contra o preview — o SW só existe no build):
npm run test:e2e
```

> **Abra ESTA pasta no editor** (`code .` dentro de `pratica/`) — senão o TS e a
> extensão do Playwright não acham o projeto.

## Ordem dos specs (faça na ordem)

| Spec | Tema | Aula |
|------|------|------|
| `auth.setup.ts` | 📘 storageState (resolvido) | Playwright Avançado |
| `01-login.spec.ts` | 📘 locators + web-first assertions (resolvido) | Playwright Avançado |
| `02-busca-mock.spec.ts` | ✅ network mocking com `route()` | Playwright Avançado |
| `03-visual.spec.ts` | ✅ visual regression, 3 viewports | Visual Regression + CI |
| `04-spa.spec.ts` | ✅ app-ready, navegação client-side, lazy chunk | Testando SPAs |
| `05-pwa-offline.spec.ts` | ✅ SW ativo, manifest, `setOffline` | Testando PWAs |

📘 = modelo resolvido · ✅ = avaliativo (todo `it()` conta)

## Visual regression

```bash
npm run test:visual:update   # 1ª vez: gera os baselines na SUA máquina
npm run test:visual          # depois: compara contra o baseline
```

## Lighthouse CI

```bash
npm run build
npm run lighthouse           # roda 3x contra ./dist com budgets do lighthouserc.json
```

## CI (GitHub Actions)

`.github/workflows/playwright.yml` — suíte com **sharding 2-way + blob reports
mesclados**. Habilite o Actions no seu fork pra rodar.
