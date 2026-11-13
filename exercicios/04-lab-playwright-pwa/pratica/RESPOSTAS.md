# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Luiz Angelo Heinzen e Alice de Fátima Moraes Souza (dupla)
**Login do GitHub:** laheinzen
**Usei IA?** ( ) não · (x) sim — qual ferramenta e pra quê: Claude Code (Claude Opus 5.5, da Anthropic). Cluade ajudou a escrever os testes dos blocos A–F e da missão livre a partir dos enunciados.
Depois revisamos cada desafio junto com ele, um por um, tirando as dúvidas; Claude rascunhou as respostas, e ajustou a formatação.
Nós as revisamos e ajustamos. 

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?

O `.count()` conta **uma vez só, na hora**: se a lista ainda estiver carregando, ele pega o número errado (ex.: 12 em vez de 24 logo depois do "Carregar mais", no B1) e o teste falha — às vezes sim, às vezes não, conforme a velocidade da máquina. 
O `toHaveCount` **fica conferindo de novo** até bater o número (ou desiste em 5s com uma mensagem clara de "esperava X, recebeu Y"), então passa assim que a tela fica pronta. Na busca do B2 isso é ainda mais claro: o resultado só aparece 250ms (debounce) + o tempo da busca depois da última tecla, e não precisamos de nenhum `sleep`. 
A mesma ideia vale para `toHaveURL` × `page.url()` (A1) e, para o que não é tela, como o `localStorage`, existe o `expect.poll` (B3). No F1a original era exatamente esse o defeito: o `.count()` logo depois de digitar pegava 0, porque o debounce ainda não tinha disparado.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?

O Service Worker fica **entre o app e a rede**: quando ele controla a página, o `fetch` do catálogo passa por ele, que responde do cache ou busca por conta própria — e esse pedido não passa pelo `page.route`. No Bloco C isso faria o mock ser ignorado (o C1 mostraria os 12 filmes reais em vez do "Filme do Mock"), por isso o SW é bloqueado. No Bloco E é o contrário: o que está sendo testado **é** o SW. Offline, só ele consegue entregar o HTML, o JS e o catálogo guardados no cache; sem ele, o `reload` offline dá `net::ERR_INTERNET_DISCONNECTED`. E não basta estar registrado: precisa estar **controlando** a página (`waitForSwControl`) antes de cortar a rede.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.

**Ganho:** o teste fica rápido e foca só no que ele quer provar: a tela de favoritos lê e mostra o que está salvo. Se o botão do coração quebrar, o D3 não fica vermelho por um motivo que não é dele. 
**Risco:** a semente escreve no `localStorage` do jeito que *nós achamos* que o app grava (chave `cinefav-favorites`, lista de ids). Se o app mudar a chave ou o formato, a semente continua gravando o formato antigo e o teste deixa de representar o uso real. O clique prova o caminho inteiro (botão → app → `localStorage`); a semente pula essa parte. 
**Não semearíamos** quando o objetivo do teste é justamente o ato de favoritar — como no A3 e no B3, que precisam provar que o clique no coração funciona e grava. 

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?

- **F1a:** contava os resultados com `.count()` logo depois de digitar — o debounce de 250ms ainda não tinha disparado, então pegava 0. Trocamos por `await expect(...).toHaveCount(1)`, que espera.
- **F1b:** usava `waitForTimeout(300)` (um "chute" de tempo) e depois `.count()`. Numa máquina lenta 300ms não bastam; numa rápida, é desperdício. Tiramos o sleep e usamos `toHaveCount(24)`.
- **F1d:** abria `/favorites` *supondo* que o F1c já tinha favoritado o Matrix. Mas cada teste nasce com um navegador zerado, então rodando sozinho (ou em outra ordem/worker) ele via 0 favoritos. Agora ele cria o próprio estado: vai em `/qa`, clica no coração do Matrix, confere `aria-pressed="true"` e só então abre `/favorites`.

**Prova:** `npx playwright test 06-flaky --repeat-each=10` → **41 passed** (os 4 testes × 10, mais o setup de login), e `npx playwright test 06-flaky -g "F1d"` → **2 passed** (setup + F1d sozinho). Depois rodamos a suíte inteira (`npx playwright test`) 3 vezes seguidas: **25 passed, 1 skipped** nas três (o skipped é o bônus em `fixme` da missão livre).

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?

Eles dão confiança de que **o front reage certo ao que recebe**: mostra os dados que vieram (C1), mostra erro e se recupera quando o servidor volta (C2), aguenta um caso extremo em cima do dado real (C3) e não inunda a rede com uma requisição por tecla (C4). Mas o mock só prova o lado do app **contra o formato que nós escrevemos**. 
Se o backend de verdade mudar o contrato — por exemplo, renomear `title` para `name`, ou passar a devolver `{ results: [...] }` em vez de uma lista, o C1 continua verde (ele manda o formato antigo) e o app quebra em produção. 
Também passariam batido: **lentidão** (o mock responde na hora; não testamos o "Carregando…" com um servidor que demora 10s), outros erros além do 500 (timeout, 404, JSON malformado) e problemas com o Service Worker, que desligamos de propósito neste bloco.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

Escolhemos **remover favoritos na tela `/favorites`** porque favoritos é o coração do CineFav e os blocos A–F só testam *adicionar* — ninguém testava a outra metade. O risco coberto é o usuário perder a confiança na lista: remover e o filme "voltar", a tela de favoritos e o catálogo discordarem, o contador/estado vazio errarem no limite (1 → "0 filmes favoritos") e um `localStorage` corrompido derrubar a tela. 
Os 3 testes: **feliz** (remove 1 de 2 e confere lista, `localStorage` e coração no catálogo, usando `test.step`), **negativo** (dado salvo inválido não quebra a tela e o app volta a gravar certo) e **borda** (remover o último mostra o vazio e continua vazio após `reload`). 
No exploratório achamos um bug, documentado com `test.fixme`: se o catálogo falha (500), a tela diz "Nada por aqui ainda" mesmo com favoritos salvos. 
**Ficou sem teste:** remover pelo botão da tela de detalhe, remover estando offline e duas abas abertas ao mesmo tempo — por tempo, e porque cada um seria um fluxo próprio.
