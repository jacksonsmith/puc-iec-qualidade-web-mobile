# Extras — o que existe nesta pasta além do Exercício 1

> ⚠️ **Nada aqui faz parte do Exercício 1.** Faça o Exercício 1 primeiro ([`COMECE-AQUI.md`](COMECE-AQUI.md)).
> Este arquivo reúne o material que foi sendo acrescentado ao CineFav Web: é **estudo opcional** e treino para o **Exercício 2 (Bateria)**.

## A. Specs 03, 04 e 05 (a "trilha" 🟢🟡🔴)

Além do spec 02, a pasta `pratica/tests/e2e/` tem mais 3 specs com `TODO`. São **treino** (não valem nota por si só):

| Degrau | Specs | O que treina |
|---|---|---|
| 🟢 fácil (1 linha) | `03` #1 login · `04` #1 app pronto · `05` #1 SW ativo | screenshot, `data-app-ready`, Service Worker `activated` |
| 🟡 médio | `03` #2 3 telas · `04` #2 estado do JS · `02` #4 mock | viewports, SPA sem reload |
| 🔴 mais difícil | `02` #7 rede cai e volta · `05` #3 offline | retry, `setOffline` |

📘 Guia detalhado, exercício por exercício: [`pratica/PASSO-A-PASSO.md`](pratica/PASSO-A-PASSO.md) · 📘 `01-login.spec.ts` e `auth.setup.ts` são modelos resolvidos.

- **Placar:** `npm run check` · **Lint:** `npm run lint`
- **Visual (spec 03) falha na 1ª vez:** `npm run test:visual:update` gera os baselines.
- **Câmera lenta:** `SLOWMO=800 npx playwright test --headed --workers=1`

## B. Lighthouse
`npm run build && npm run lighthouse` (config em `pratica/lighthouserc.json`, 3 budgets). Tire um print do resultado.

## C. Demo Firebase Remote Config (opcional)
Na Aula 3 o professor mostra um banner controlado pelo Firebase (grátis, plano Spark). Para ver no seu app: copie `.env.example` para `.env` e preencha `VITE_FIREBASE_*` (o professor passa em aula). Sem as variáveis o app roda normal. O bônus `tests/e2e-bonus/08-*` mostra como **mockar** isso.

## D. Criar conta no CineFav
Na tela de login há **"Criar conta"** (fica no seu navegador; senha guardada só como *hash*). A conta `aluno@puc.br` / `1234` **continua valendo** — os testes usam ela. Bônus `tests/e2e-bonus/11-cadastro-login.spec.ts` mostra como testar o cadastro.

## E. Explorar a PWA ("Raio-X")
```bash
npm run build && npm run preview     # http://localhost:4173 (o SW só existe no build)
```
Entre e abra **`/pwa`**: HTTPS, manifest, Service Worker, cache, banco local e rede ao vivo. No Chrome: ícone **Instalar**, DevTools → Network → **Offline**, comente com a rede desligada (⏳ na fila) e religue. Teste automatizado: `npm run test:bonus` (specs `09-pwa-painel`, `10-banco-offline`).

## F. Bônus com TMDB real (`/` e `tests/e2e-bonus/`)
A tela principal `/` usa TMDB de verdade (opcional: `cp .env.example .env.local` e preencha `VITE_TMDB_TOKEN`). Os exercícios usam `/qa` (offline, determinístico). `npm run test:bonus` roda os bônus (loader com rede throttled, etc.).

## G. Próximo passo
Depois do Exercício 1, vá para o **Exercício 2 — Bateria Playwright** (`exercicios/04-bateria-playwright-cinefav/COMECE-AQUI.md`).
