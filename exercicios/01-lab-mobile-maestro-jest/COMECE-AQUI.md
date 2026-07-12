# COMECE AQUI — Lab Mobile 🎬📱

Sequência mínima:

## 1. Clone e entre na pasta certa

```bash
git clone https://github.com/<SEU-USUARIO>/puc-iec-qualidade-web-mobile.git
cd puc-iec-qualidade-web-mobile/exercicios/01-lab-mobile-maestro-jest/pratica

ls flows __tests__    # prova de que está no lugar certo
```

> **Windows:** troque `ls` por `dir` e `/` por `\`.

## 2. Jest primeiro (sem emulador, feedback em segundos)

```bash
npm install
npm test
```

Verde? Os scaffolds passam **vazios** — abra `__tests__/unit/02-authStore.test.ts`
e complete os TODOs. Modelo resolvido: `01-favoritesStore.test.ts`.

## 3. Rode o app e explore

```bash
npm start             # Expo — abra no emulador Android (a) ou iOS (i)
```

Login: `aluno@puc.br` / `1234`. **É esse app que você testa.**

## 4. Maestro

```bash
curl -Ls get.maestro.mobile.dev | bash    # guia por SO: docs/INSTALACAO_MAESTRO.md
maestro test flows/01-launch.yaml          # modelo resolvido
```

Depois complete `flows/02-search.yaml` → `05-js-dynamic.yaml` (TODOs marcados).

## 5. Assista o screencast

O screencast da unidade mostra o professor fazendo o primeiro exercício de cada
frente. Pause, rode, compare.

## Travou?

- Jest: extensão **Orta.vscode-jest** mostra ✓/✗ inline (recomendada em `.vscode/`)
- Maestro: `maestro studio` inspeciona os testIDs ao vivo
- Office hours semanal — link no Canvas
