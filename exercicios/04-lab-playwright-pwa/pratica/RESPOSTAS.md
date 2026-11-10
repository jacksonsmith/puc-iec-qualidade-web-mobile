# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Jamille Rocha
**Login do GitHub:** jamillerocha
**Usei IA?** ( ) não · (x) sim — qual ferramenta e pra quê: Claude (Claude Code, da Anthropic). Ele escreveu o código dos desafios A–F e da missão livre e um rascunho destas respostas; eu acompanhei a execução, revisei e ajustei o texto.  *(usar é permitido; esconder não)*

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*

O `count()` tira uma "foto" do DOM no instante em que roda: se a lista ainda está carregando (ou a busca ainda está no debounce), ele lê 0 e o teste falha — ou passa por sorte quando a máquina está rápida. O `toHaveCount` é uma asserção web-first: fica tentando de novo até o número bater ou estourar o timeout. Foi exatamente o defeito do F1a e do F1b. Ele também dá uma mensagem de erro melhor (esperado × recebido no tempo).

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*

No C o objetivo é interceptar o `GET /api/movies.json` com `page.route`. Com o SW ativo, ele responde do cache antes de a requisição chegar no `page.route`, e o mock simplesmente não é usado. No E é o contrário: o que está sendo testado é justamente o SW — é ele que serve o app quando o navegador fica offline. Sem SW controlando a página, o reload offline dá `ERR_INTERNET_DISCONNECTED`.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*

Ganho: o teste fica mais rápido e foca no que interessa (a tela de favoritos), sem depender de outra tela funcionar. Risco: a semente prova só que a tela LÊ o localStorage — não prova que o clique no coração GRAVA. Se a chave ou o formato mudarem, a semente pode montar um estado que o app real nunca produziria. Eu não semearia num teste cujo objetivo é o próprio ato de favoritar (como o A3 e o F1c), nem no fluxo ponta a ponta mais importante.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*

F1a: lia `count()` logo depois de digitar, antes do debounce de 250ms → trocado por `toHaveCount(1)`. F1b: `waitForTimeout(300)` + `count()` → espera os 12 cards, clica e `toHaveCount(24)`, sem sleep. F1d: supunha que o F1c já tinha favoritado o Matrix, mas cada teste nasce com navegador zerado → agora ele mesmo favorita antes de abrir /favorites. Provas: `npx playwright test 06-flaky --repeat-each=10` → 41 passed; `npx playwright test 06-flaky -g "F1d"` → passed sozinho; `npm run test:e2e` 3× seguidas → 25 passed em todas.

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*

Dão confiança no FRONT: a tela renderiza o que vier, mostra o erro no 500, se recupera no "Tentar de novo" e o debounce evita requisições a mais. Mas o mock é o "backend que eu imagino". Passaria batido: o backend real mudar o contrato (ex.: renomear `title` para `name`, mandar `vote_average` como texto ou paginar de outro jeito), ficar lento a ponto de estourar timeout, ou responder com erro de CORS/autenticação. Para isso é preciso um teste de contrato ou pelo menos um teste contra o backend real (o C3 com `route.fetch` chega perto).

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

Escolhi remover favorito pela tela /favorites porque os blocos A–F só testam ADICIONAR — remover é a outra metade do mesmo recurso e ninguém tinha coberto. O risco: a remoção ser só visual (some da tela, mas volta no reload) ou deixar o catálogo dessincronizado (coração ainda marcado). Os 3 testes cobrem o caminho normal (remover 1 de 2), o estado vazio e o limite (remover o último, recarregar e voltar no histórico). Ficou sem teste: remover offline e a sincronia entre duas abas abertas — mais caros de montar e de risco menor para este app.
