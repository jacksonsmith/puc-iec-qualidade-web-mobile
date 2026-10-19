# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** <seu nome>
**Login do GitHub:** <seu login>
**Usei IA?** ( ) não · ( ) sim — qual ferramenta e pra quê: <…>  *(usar é permitido; esconder não)*

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*

<O `count()` lê o número uma única vez, na hora. Se a lista ainda estiver carregando, ele devolve 0 ou um valor parcial e o teste falha, mesmo sem bug. O `toHaveCount` fica tentando até a contagem bater ou o timeout estourar, então espera a tela sozinho>

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*

<No Bloco C eu quero interceptar o `fetch` do catálogo com `page.route`. Se o SW estiver ativo, ele pode atender a requisição pelo cache e o mock nunca é visto pelo teste. Por isso é bloqueado, já no Bloco E o SW é justamente o que está sendo testado.>

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*

<Ganho: o teste fica mais rápido e mais estável, e só depende do que ele quer verificar. Risco: a semente pode não ser igual ao que o app grava de verdade, assim deixaria de provar que o clique funciona. Eu não semearia no teste que verifica o próprio ato de favoritar (como o A3 ou o B3), porque ali o clique é o que está sendo testado.>

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*

<F1a: usava `count()` logo após digitar, antes do debounce disparar, então podia contar 0. Troquei por `toHaveCount(1)`.
F1b: tinha `waitForTimeout(300)` (espera fixa) e `count()`. Troquei por `toHaveCount(24)`, que espera sozinho.
F1d: dependia do F1c ter favoritado o Matrix, mas cada teste começa com navegador zerado. Agora ele favorita o Matrix e confirma o `aria-pressed` antes de ir para `/favorites`>

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*

<Os mocks dão confiança de que a tela reage bem a respostas controladas: lista com 1 filme, erro 500 com opção de tentar de novo, título em maiúsculas, uma única requisição por busca. Caso o backend real mude o formato do JSON (por exemplo, trocar um campo de nome ou devolver `{ results: [] }` em vez de um array), ficaria lento ou teria timeout>

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

<Escolhi o fluxo de remover favorito pela tela /favorites porque favoritar é a função central do CineFav e os blocos A–F só testaram o lado de adicionar. Ele cobre o risco de dado desatualizado: o usuário remover um filme e ele continuar na lista, apagar o filme errado ou voltar depois de recarregar a página. Ficaram sem teste o estado vazio da tela (sem favoritos) e a remoção pela página de detalhes do filme, porque o tempo era curto e o risco é menor do que o do fluxo principal.>
