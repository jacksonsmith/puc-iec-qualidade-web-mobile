# Comece aqui — Bateria Playwright (CineFav)

> **Este é o Exercício 2 (a Bateria, 15 pts).** O Exercício 1 (4 testes do spec 02, aquecimento) fica em `exercicios/01-lab-web-pwa-playwright/COMECE-AQUI.md` — faça ele antes.
> Leia este arquivo **inteiro uma vez** (5 min). Ele evita 90% dos problemas de instalação.
> Depois vá para os desafios em `pratica/tests/bateria/` (ordem 01 → 06).

## 0. Antes de tudo (uma vez só)

- **Node LTS recente** (`node -v` ≥ 20.19 ou ≥ 22.13). Mais antigo? Instale o **Node LTS** em nodejs.org. (Um aviso `EBADENGINE` no `npm ci` não impede nada, mas é sinal de Node velho.)
- **VS Code** com a extensão **Playwright Test for VS Code** (`ms-playwright.playwright`). Ao abrir a pasta `pratica/` o VS Code já sugere instalar — aceite. Ela mostra ✓/✗ ao lado de cada teste e tem o botão **Record**.
- Abra **a pasta `pratica/` direto** no VS Code (`code .` de dentro dela), **não o repositório inteiro** — senão a extensão não encontra o projeto.

## 1. Baixar o material — **sempre por clone novo** (sem merge, sem sincronizar fork)

> Por quê assim: o seu fork antigo **não tem** a pasta deste exercício, e sincronizar fork é exatamente o que gera conflito. Clonar o repositório do professor numa pasta nova **não tem como dar conflito**.

**Mac / Linux / Git Bash:**
```bash
git clone https://github.com/jacksonsmith/puc-iec-qualidade-web-mobile.git bateria
cd bateria
git switch -c bateria                     # sua branch de trabalho
cd exercicios/04-bateria-playwright-cinefav/pratica
ls tests/bateria                          # → 01-locators.spec.ts  02-expect-espera.spec.ts  ...
npm ci
npx playwright install chromium
```

**Windows (PowerShell):**
```powershell
git clone https://github.com/jacksonsmith/puc-iec-qualidade-web-mobile.git bateria
cd bateria
git switch -c bateria
cd exercicios\04-bateria-playwright-cinefav\pratica
dir tests\bateria                         # → 01-locators.spec.ts  02-expect-espera.spec.ts  ...
npm ci
npx playwright install chromium
```

**Ligue a pasta ao SEU fork** (uma vez; se você ainda não tem fork, clique em **Fork** na página do repositório no GitHub — se já tem, **não precisa atualizar nada**):

```bash
git remote add meu https://github.com/<seu-login>/puc-iec-qualidade-web-mobile.git
```

> Se o `ls`/`dir` não mostrar esses arquivos, você **não está na pasta certa** — é o erro mais comum ("comando falha do nada"). Refaça o `cd`.
> Clone numa pasta **simples e sem acento** (ex.: `C:\dev\bateria`), longe de pastas antigas da disciplina.

## 2. Primeira execução (tudo vermelho de propósito)

```bash
npm run check
```

Você vai ver ⬜ nos desafios: significa **"ainda não fiz"**, não que algo quebrou. O objetivo é transformar cada ⬜ em ✓.

> O Playwright **sobe o app sozinho** (`npm run build` + `npm run preview`, porta **4174**). Não precisa abrir outro terminal.

## 3. Como rodar (decore estes 5)

| Quero… | Comando |
|---|---|
| Rodar **um bloco** | `npx playwright test 01-locators` |
| Rodar **um desafio** | `npx playwright test -g "A1"` |
| **Ver** o navegador | `npx playwright test 01-locators --headed` |
| **Modo UI** (melhor debugger: mostra antes/depois de cada linha) | `npx playwright test 01-locators --ui` |
| **Placar** de tudo | `npm run check` |

Também dá pra clicar no ▶ ao lado do teste no VS Code (extensão Playwright).

## 4. Gravando um teste com o recorder (Aula 2 e 3)

O recorder **escreve o código enquanto você clica** — ótimo pra descobrir o seletor, **péssimo** como teste final (ele não confere nada!).

1. Em um terminal: `npm run build && npm run preview` (deixe rodando — é o app na porta 4174)
2. Em outro: `npx playwright codegen http://localhost:4174/login`
3. Clique no fluxo. O código aparece na janela **Playwright Inspector** (pode abrir *atrás* do VS Code — use `Cmd+Tab`/`Alt+Tab`).
4. Botão de **copiar** (dois quadradinhos) → cole no seu teste → **limpe** (clique repetido, `Tab` sobrando) → **acrescente `expect`**.
5. Quer salvar direto num arquivo? `npx playwright codegen -o tests/livre/gravado.spec.ts http://localhost:4174/login`

> Fechou o navegador do recorder sem copiar? O código se perdeu. Nada é salvo sozinho.

## 5. Quando um teste falha — como investigar

1. Leia a **mensagem de erro** inteira (ela diz qual `expect` e o que esperava × recebeu).
2. Rode só ele com a UI: `npx playwright test -g "B2" --ui` e clique nos passos.
3. Rode com `--headed` e devagar: `SLOWMO=800 npx playwright test -g "B2" --headed` (Windows: `$env:SLOWMO=800; npx playwright test -g "B2" --headed`).
4. Veja o trace: `npx playwright test -g "B2" --trace on` e depois `npx playwright show-report`.

## 6. Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| `webServer was not able to start` | o build do app falhou (o Playwright esconde o erro real) | rode **`npm run build`** sozinho — o erro de verdade aparece lá. Falta `npm ci`? Node antigo? |
| `Executable doesn't exist` / navegador não encontrado | faltou instalar o Chromium | `npx playwright install chromium` |
| `Port 4174 is already in use` | outro preview aberto | feche o terminal antigo ou `npx kill-port 4174` |
| Teste passa sozinho mas falha na suíte | um teste depende de outro | cada teste nasce com navegador **zerado** — deixe-o independente (Bloco F) |
| `Test has no assertions` no lint | teste sem `expect` (passa "vazio") | acrescente a asserção |
| Pasta com acento/espaço (`Pós_Graduação`) e erros estranhos | caminho problemático em algumas máquinas | clone numa pasta simples (`C:\dev\…`) |

## Deu conflito? Não resolva — faça isso

Conflito de Git **não faz parte deste exercício**. Se aparecer `CONFLICT`, `MERGING` ou `<<<<<<<` em algum arquivo, **pare** — não tente resolver, você vai perder tempo de aula.

1. **Guarde o que você escreveu:** copie `pratica/tests/` e `pratica/RESPOSTAS.md` para uma pasta fora do repositório (ex.: Área de Trabalho).
2. **Abandone a pasta com problema** (não precisa consertar) e repita o **passo 1 deste guia numa pasta nova** (`git clone … bateria2`). É o clone do repositório do **professor** — não do seu fork antigo.
3. **Cole de volta** os seus arquivos por cima, na mesma pasta `pratica/`, rode `npm ci` e `npm run check`.
4. Continue normalmente (`git switch -c bateria`, `git remote add meu …`).

Pediu ajuda? Mande `git status` e o erro — a gente resolve em 2 minutos.

## 7. Entrega

1. `npm run check` → tudo ✓ · `npm run lint` → sem **erros**
2. `npm run test:e2e` **3 vezes seguidas**, sempre 100% verde
3. `RESPOSTAS.md` preenchido
4. Na raiz do clone (`cd` até a pasta `bateria`):
   ```bash
   git add exercicios/04-bateria-playwright-cinefav/pratica/tests exercicios/04-bateria-playwright-cinefav/pratica/RESPOSTAS.md
   git commit -m "bateria playwright: <seu nome>"
   git push -u meu bateria
   ```
5. No GitHub, abra o **Pull Request** da branch `bateria` do **seu fork** para o `main` do repositório do professor (o GitHub mostra o botão "Compare & pull request").
6. Espere o comentário do bot (1–2 min) e confira o detalhamento. A cada novo `git push meu bateria` o bot reavalia sozinho.
