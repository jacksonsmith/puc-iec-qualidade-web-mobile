# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Rodrigo Cardoso
**Login do GitHub:** rcardoso91
**Usei IA?** ( ) não · (x) sim — qual ferramenta e pra quê: ChatGPT / Claude. Usei apenas para auxílio na consulta à documentação e para me ajudar a subir o ambiente. *(usar é permitido; esconder não)*

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*

`toHaveCount` é uma asserção com retry: o Playwright re-lê o locator até chegar em 12 ou estourar o timeout, então ele espera a lista terminar de carregar. Já `await locator.count()` lê UMA vez, na hora, e devolve o número que existir naquele instante (0, por exemplo, se a lista ainda carrega); depois o `expect(...).toBe(12)` compara esse número congelado e falha sem tentar de novo. Por isso o F1a e o F1b eram instáveis: passavam ou falhavam conforme a velocidade da máquina.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*

O SW intercepta cada `fetch` e responde do cache, então a requisição do catálogo nunca chega no `page.route` e o mock não é aplicado (os testes C falhariam "de um jeito misterioso"). Por isso o Bloco C bloqueia o SW: quero que a rede passe pelo meu mock. No Bloco E é o contrário: o que eu quero provar é justamente o SW servindo o app do cache sem internet, então ele precisa estar ligado e controlando a página (`navigator.serviceWorker.controller !== null`), senão o `reload` offline falha.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*

Ganho: o teste fica mais rápido e menos frágil, porque não depende da interface de favoritar (se o coração mudar, este teste não quebra) e já começa no estado que eu quero. Risco: a semente grava direto no formato interno (chave `cinefav-favorites` e JSON de ids); se o app mudar a chave ou o formato, o teste passa a semear algo que o app ignora, e eu não percebo que a funcionalidade real quebrou. Não semearia no teste que verifica o próprio ato de favoritar (A3, B3): ali o clique é exatamente o que está sob teste, e a semente pularia o que eu preciso provar.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*

F1a lia `count()` logo depois de digitar, antes do debounce de 250 ms, então podia ler 0; troquei por `await expect(...).toHaveCount(1)`. F1b tinha `waitForTimeout(300)` (sleep fixo) e `expect(await count())`; troquei por `await expect(page.getByRole('article')).toHaveCount(24)`. F1d supunha que o F1c já tinha favoritado o Matrix, mas cada teste recebe um navegador zerado; agora ele mesmo semeia `[603]` no localStorage antes de abrir `/favorites`. Provei com `npx playwright test 06-flaky --repeat-each=10` (41 passed, 0 falhas, contando o setup) e `npx playwright test 06-flaky -g "F1d"` (passou rodando sozinho), além de `npm run test:e2e` 3 vezes seguidas com 25 passed em cada.

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*

Os mocks me dão confiança de que a tela reage corretamente a respostas que eu controlo: lista com 1 filme (C1), erro 500 e recuperação com "Tentar de novo" (C2), resposta real alterada (C3) e que o debounce faz UMA requisição (C4). O que passaria batido é qualquer divergência entre o mock e o backend de verdade: um campo renomeado ou com tipo diferente em `/api/movies.json`, paginação diferente, um 500 que na vida real vem com outro corpo, ou lentidão real (timeouts, loader aparecendo por tempo demais). O mock sempre responde rápido e no formato que eu escrevi, então não detecta quebra de contrato.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

Escolhi a tela de Favoritos porque é o único dado que o usuário constrói no app e que precisa sobreviver ao reload, e os blocos A–F só adicionam favoritos e leem o contador: ninguém testou remover, o estado vazio nem a proteção da rota. Os 3 testes cobrem o risco de perder ou corromper os favoritos: o feliz remove um e mantém o outro, o negativo prova que, deslogado, `/favorites` manda para o login sem renderizar a tela, e a borda remove o último favorito (estado vazio, plural "0 filmes favoritos", localStorage atualizado). Ficou sem teste favoritar/remover pelo botão da tela de detalhe (`detail-favorite-button`) e o comportamento com várias abas abertas, por falta de tempo e para manter o fluxo focado: são o próximo passo natural.