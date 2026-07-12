# Pipeline IA de geração de testes — prática

Pipeline **user story → Claude gera teste Playwright → executa → healing loop**,
rodando contra o CineFav Web (lab 02). Você completa os TODOs de
`src/02-healing-loop.ts` e `src/03-visual-diff.ts`; o gerador (`src/01-gen-test.ts`)
já vem resolvido.

## Setup

```bash
cd exercicios/03-lab-ia-test-gen/pratica

# confirme que está no lugar certo:
ls src
# → 01-gen-test.ts  02-healing-loop.ts  03-visual-diff.ts  lib

npm install
cp .env.example .env    # edite: coloque sua ANTHROPIC_API_KEY
```

> **Pré-requisito:** o lab 02 instalado e buildado (o app alvo dos testes gerados):
> `cd ../../02-lab-web-pwa-playwright/pratica && npm install && npm run build`

> **Chave da API:** crie em <https://console.anthropic.com>. O pipeline imprime o
> custo em tokens de cada chamada — uma execução completa custa centavos. Pra
> iterar mais barato, troque `CLAUDE_MODEL` no `.env` por `claude-haiku-4-5`.

## Os 3 passos

```bash
# 1. 📘 resolvido — gera o teste a partir da user story e roda:
npm run gen -- stories/favoritar.story.md

# 2. ✅ você completa — healing loop (re-prompt em falha, máx 3 tentativas):
npm run heal -- generated/favoritar.spec.ts stories/favoritar.story.md

# 3. ✅ você completa — visual diff com pixelmatch:
npm run visual-diff -- screenshots/baseline.png screenshots/atual.png
```

## Pra provocar o healing (exercício da aula)

O teste gerado da story de exemplo tende a passar de primeira. Pra ver o healing
trabalhar: edite `generated/favoritar.spec.ts` e sabote um seletor
(ex.: `movie-card-heart-603` → `movie-card-like-603`), depois rode o `heal`.
**Audite o diff**: o modelo corrigiu o seletor ou enfraqueceu a asserção?

## Entrega (ver enunciado.md)

- `src/02-healing-loop.ts` e `src/03-visual-diff.ts` completos
- Uma story **sua** em `stories/` + o spec gerado commitado em `generated/`
- Relatório crítico (3 pgs) — limites reais: oracle problem, custo, falsos positivos
