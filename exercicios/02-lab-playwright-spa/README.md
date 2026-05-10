# Lab Playwright SPA (M2) — 15 pts

> **Disciplina:** Qualidade Web e Mobile (EAD) — PUC IEC 2026
> **Auto-grade:** ✅

## Objetivo

Suíte E2E Playwright com locators recomendados, storageState (auth reuse), visual regression e CI.

## Estrutura

```
exercicios/02-lab-playwright-spa/aluno-<github-username>/
├── playwright.config.ts
├── tests/                        # ≥ 5 *.spec.ts
├── .github/workflows/playwright.yml
└── README.md
```

## Critérios (15 pts)

| # | Critério | Peso |
|---|----------|------|
| 1 | playwright.config presente | 2 |
| 2 | Mín 5 testes (*.spec/*.test) | 4 |
| 3 | Locators recomendados (getByRole/getByText/getByTestId) | 3 |
| 4 | storageState configurado | 2 |
| 5 | Visual regression (toHaveScreenshot) | 2 |
| 6 | CI workflow Playwright | 2 |

## Vídeo

`npx playwright test` rodando + relatório HTML.
