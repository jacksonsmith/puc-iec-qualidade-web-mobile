# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Wagner Renan de Alencar Teixeira
**Login do GitHub:** wagner-alencar-qa
**Usei IA?** ( ) não · (x) sim — Copilot: apoio na implementação e validação dos testes Playwright. _(usar é permitido; esconder não)_

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?

_(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)_

`toHaveCount` é uma asserção que reavalia o locator até a lista chegar a quantidade esperada ou o timeout acabar.

Já `count()` lê a quantidade naquele instante, durante o carregamento pode retornar um valor intermediário e falhar, ou o teste pode seguir antes de a interface estar pronta. A asserção automática deixa o teste sincronizado com o estado real da tela sem precisar de espera fixa.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?

_(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)_

No Bloco C, os mocks precisam interceptar o `fetch` de catálogo para controlar respostas e erros. O Service Worker poderia responder do cache antes que `page.route` veja a requisição. Por isso ele é bloqueado. No Bloco E o objetivo é justamente validar a PWA: o Service Worker precisa instalar, controlar a página e servir o app e o catálogo em modo offline. Bloqueá-lo faria o teste deixar de cobrir esse comportamento.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.

_(Dica: o que o clique prova que a semente não prova?)_

Semear pelo `localStorage` prepara os dados rapidamente e deixa o D3 focado na renderização da tela de favoritos, sem depender do fluxo de clique nem da ordem dos filmes. O risco é não testar se o botão de favoritar realmente grava os dados corretamente. Eu não semearia em um teste de ponta a ponta cujo objetivo fosse validar o clique, a atualização do coração e a persistência do favorito, nesse caso, a interação do usuário é parte do que precisa ser provado.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?

_(Cite os comandos que rodou e o resultado.)_

F1a lia `.count()` uma vez antes de a busca com debounce terminar. Troquei por `toHaveCount(1)`. F1b usava `waitForTimeout` e também contava instantaneamente; removi o sleep e usei `toHaveCount(24)`. F1d supunha que o favorito criado por F1c ainda existia, embora cada teste tenha contexto isolado; agora semeia Matrix antes de abrir favoritos. Validação: `npx playwright test 06-flaky --repeat-each=10` passou com 41/41 testes; `npx playwright test 06-flaky -g "F1d"` passou com 2/2 (inclui o setup).

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?

_(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)_

Os mocks verificam como a interface reage a um catálogo controlado: dados inventados, erro HTTP, recuperação e transformação de uma resposta real; C4 também confere o número de requisições após o debounce. Eles não provam que o backend de produção está disponível nem que mantém o mesmo contrato. Um backend real poderia mudar o formato dos campos, responder lentamente ou retornar dados inconsistentes, e esses problemas passariam com todos os mocks verdes.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

Escolhi a remoção de favoritos porque é uma ação destrutiva que precisa atualizar a contagem, a lista e o estado vazio,
além de continuar correta depois de recarregar. Os testes cobrem remover o último favorito, a tela inicialmente vazia
e remover apenas um de dois favoritos. Ficaram fora dos testes falhas de armazenamento e sincronização entre abas, pois o app usa armazenamento local e a missão se limita ao comportamento principal dessa tela.
