# Qualidade em Aplicações Web e Mobile

> **Curso:** Pós-Graduação em Engenharia de Qualidade e Testes de Software — PUC Minas IEC
> **Disciplina:** 09 — Qualidade em Aplicações Web e Mobile
> **Modalidade:** Online EAD (assíncrono) · 24h · 1º/2026
> **Professor:** Jackson Smith Moisés Matias

Repositório público com **labs, apps de prática e slides** da disciplina.
Um produto atravessa o curso inteiro: o **CineFav** — app de filmes com login,
busca e favoritos — nas versões **mobile** (React Native) e **web** (React + PWA).
Você não escreve UI em nenhum lab: **os apps vêm prontos, você escreve os testes.**

## Estrutura do curso

| Unidade | Tema | Aulas |
|---------|------|-------|
| U1 | Fundamentos de qualidade web e mobile | 1.1–1.6 |
| U2 | Automação mobile (Jest, RNTL, Maestro) | 2.1–2.7 |
| U3 | Web moderna (Playwright, SPA, PWA, Lighthouse) + IA em testes | 3.1–3.6 |

## Avaliação (100 pts)

| Item | Unidade | Pontos |
|------|---------|--------|
| [Lab Mobile — Maestro + Jest](./exercicios/01-lab-mobile-maestro-jest/) | U2 | 20 |
| [Lab Web + PWA — Playwright + Lighthouse](./exercicios/02-lab-web-pwa-playwright/) | U3 | 20 |
| [Lab IA — Pipeline Test Generation](./exercicios/03-lab-ia-test-gen/) | U3 | 20 |
| [Projeto Final](./exercicios/projeto-final/) (eliminatório) | — | 30 |
| Prova objetiva final (Canvas) | — | 10 |

## Como entregar

1. **Fork** deste repositório.
2. Trabalhe na pasta `pratica/` do lab (edite os scaffolds in-place).
3. Abra um **Pull Request** — o bot corretor (J.A.R.V.I.S.) comenta a nota
   parcial automática a cada push.
4. Critérios manuais (vídeos, relatórios, CI verde) entram na nota final no Canvas.

Comece por: [`exercicios/README.md`](./exercicios/README.md)

## Stack didática

- **Mobile:** Jest + React Native Testing Library + Maestro (mobile.dev)
- **Web/SPA/PWA:** Playwright + Lighthouse CI
- **IA:** Claude API (test gen + healing loop) + pixelmatch (visual diff)
- **CI/CD:** GitHub Actions (sharding, blob reports)

## Slides

PDFs das videoaulas em [`slides/`](./slides/).
