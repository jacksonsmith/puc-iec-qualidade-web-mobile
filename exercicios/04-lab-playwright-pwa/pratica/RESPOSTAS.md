# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Richard Schmitz Riedo
**Login do GitHub:** Sommellier
**Usei IA?** ( ) não · (x) sim — usei o Codex para apoiar a implementação, revisar os seletores, executar os testes e explicar as falhas encontradas.  *(usar é permitido; esconder não)*

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*

`toHaveCount(12)` consulta novamente o locator durante o tempo de espera do Playwright,
até a lista realmente chegar a 12 itens. `locator.count()` devolve apenas uma fotografia
daquele instante; se o carregamento ainda estiver acontecendo, o teste falha mesmo com o
produto correto. A primeira forma sincroniza a asserção com o comportamento da tela.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*

No Bloco C o objetivo é interceptar a requisição com `page.route`. Se o Service Worker
responder pelo cache, a requisição pode nem chegar ao mock e o teste deixa de controlar o
backend. No Bloco E o próprio Service Worker é o objeto do teste: ele precisa instalar,
controlar a página e servir os arquivos e o catálogo quando a rede fica offline.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*

Semear pelo `localStorage` prepara o cenário mais rápido e reduz cliques que não fazem
parte do comportamento testado no D3. O risco é criar um estado que a interface ou a store
real talvez nunca produzissem. Eu não semearia num teste cujo objetivo fosse provar que o
botão de coração salva corretamente o favorito e atualiza a interface.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*

O F1a lia a contagem cedo demais, o F1b usava tempo fixo e outra leitura instantânea,
e o F1d dependia do estado criado pelo F1c. Troquei as contagens por `toHaveCount`, removi
o sleep e fiz o F1d criar seu próprio favorito. Validei com `06-flaky --repeat-each=10`,
com `-g "F1d"` isolado e com a suíte completa em três execuções consecutivas.

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*

Os mocks provam que a interface trata dados controlados, erro HTTP, recuperação e o
debounce sem depender de um serviço externo. Ainda poderia passar despercebida uma mudança
real de contrato, autenticação, CORS ou latência do servidor, porque o teste inventa uma
resposta conhecida e não valida toda a integração com o backend de produção.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

Escolhi a remoção de favoritos porque perder o item errado ou não persistir a exclusão
é um risco direto para a confiança do usuário. Cobri o caminho normal, a preservação dos
outros favoritos e o caso limite de remover o último item e recarregar. Não cobri
sincronização entre abas ou dispositivos, pois o produto usa armazenamento local.
