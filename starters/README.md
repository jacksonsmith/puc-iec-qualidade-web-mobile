# Starters — Qualidade Web e Mobile (EAD)

Templates iniciais para cada módulo (auto-paced).

## Recursos por módulo

| Módulo | Tema | Setup recomendado |
|--------|------|-------------------|
| M1 | Fundamentos | `npm init playwright@latest` |
| M2 | Playwright avançado | base M1 + storageState + `--shard` config |
| M3 | SPA + PWA testing | base M2 + Lighthouse CI (`@lhci/cli`) |
| M4 | Maestro mobile | `curl -Ls "https://get.maestro.mobile.dev" \| bash` |
| M5 | IA flagship | base M2 + `@anthropic-ai/sdk` + Applitools/pixelmatch |
| M6 | CI/CD + projeto | base + Stryker + SonarQube + DORA dashboard |

## Recursos compartilhados

- [`../BIBLIOGRAFIA.md`](../BIBLIOGRAFIA.md) — bibliografia
- [`../exercicios/`](../exercicios/) — labs com auto-grading

## Pré-requisitos

```bash
node --version           # v22+
docker --version         # MobSF, Selenium Grid, etc.
```
