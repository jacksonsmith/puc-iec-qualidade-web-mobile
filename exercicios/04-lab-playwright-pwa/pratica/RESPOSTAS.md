# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Jamille Rocha
**Login do GitHub:** jamillerocha
**Usei IA?** ( ) não · (x) sim — qual ferramenta e pra quê: usei o Claude Code pra escrever os testes dos desafios e da missão livre e pra me ajudar com um rascunho destas respostas, que depois revisei.  *(usar é permitido; esconder não)*

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*

O count() pega o número de elementos naquele exato momento. Se a lista ainda não carregou ou a busca ainda está esperando o debounce, ele vem 0 e o teste quebra, ou passa só quando a máquina está rápida. O toHaveCount fica tentando até chegar no número esperado (ou dar timeout), então não depende de sorte. Foi o problema do F1a e do F1b.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*

No bloco C a ideia é interceptar o /api/movies.json com page.route. Com o SW ligado ele responde do cache e a requisição nem chega no route, então o mock não funciona. No bloco E é justamente o SW que está sendo testado, porque é ele que segura o app quando fica offline. Sem ele controlando a página, o reload offline dá erro de conexão.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*

O ganho é que o teste fica mais rápido e testa só a tela de favoritos, sem depender do catálogo. O risco é que semear só mostra que a tela lê o localStorage, mas não que o clique no coração salva certo. Se mudarem a chave ou o formato, o teste pode continuar passando com um estado que o app nunca geraria. Eu não semearia num teste que é sobre favoritar em si, tipo o A3 ou o F1c.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*

No F1a o count() rodava logo depois de digitar, antes do debounce, e troquei por toHaveCount(1). No F1b tinha um waitForTimeout(300) e um count(); agora ele espera os 12 cards, clica e espera 24 com toHaveCount. O F1d dependia do F1c ter favoritado o Matrix antes, mas cada teste começa com o navegador limpo, então coloquei ele pra favoritar sozinho. Rodei `npx playwright test 06-flaky --repeat-each=10` (41 passed), `npx playwright test 06-flaky -g "F1d"` (passou sozinho) e `npm run test:e2e` três vezes seguidas (25 passed nas três).

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*

Eles mostram que o front se comporta bem: mostra o que vier, trata o erro 500, volta no "Tentar de novo" e o debounce não faz requisição a mais. Mas o mock é o backend que eu inventei. Se o backend de verdade mudar o formato (trocar title por name, por exemplo), ficar muito lento ou der erro de CORS ou de autenticação, todos esses testes continuariam verdes. Pra pegar isso precisaria de um teste de contrato ou de algum teste contra a API real.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

Escolhi remover favorito porque os blocos só testavam adicionar, e remover é a outra metade da mesma funcionalidade. O risco que eu quis cobrir é a remoção ser só visual (some da tela mas volta quando recarrega) ou o catálogo continuar com o coração marcado. Fiz o caso normal (tirar 1 de 2), a lista vazia e o caso de remover o último, recarregar e voltar pela navegação. Não testei remover estando offline nem com duas abas abertas, porque dá mais trabalho de montar e achei menos arriscado pra esse app.
