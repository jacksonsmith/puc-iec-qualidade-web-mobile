# Lab IA Test Generation (M5 — flagship) — 15 pts

> **Auto-grade:** ✅ (parcial — execução completa requer ANTHROPIC_API_KEY no fork do aluno)

## Objetivo

Pipeline IA: user story em texto → Claude API gera testes → execução + healing loop quando falha → Visual AI baseline → relatório crítico.

## Pré-requisito

Configure secret `ANTHROPIC_API_KEY` no **seu fork** (Settings → Secrets and variables → Actions). Custo de tokens é seu.

## Estrutura

```
exercicios/05-lab-ia-test-gen/aluno-<github-username>/
├── package.json                # com @anthropic-ai/sdk
├── src/
│   ├── pipeline.ts             # Claude API + healing loop
│   ├── visual-ai.ts            # Applitools/Percy/pixelmatch
│   └── ...
├── relatorio.md                # ≥ 800 chars análise crítica
└── README.md
```

## Critérios (15 pts)

| # | Critério | Peso |
|---|----------|------|
| 1 | package.json com @anthropic-ai/sdk | 2 |
| 2 | Script chama Claude API (messages.create) | 4 |
| 3 | Healing loop (re-prompt em failure) | 3 |
| 4 | Visual AI integrado | 2 |
| 5 | Relatório crítico (≥ 800 chars) | 3 |
| 6 | README explicando arquitetura | 1 |

## Vídeo

Pipeline rodando: user story → testes gerados → execução + relatório.
