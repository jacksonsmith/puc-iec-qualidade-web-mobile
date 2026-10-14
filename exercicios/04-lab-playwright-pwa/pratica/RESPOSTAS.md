# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Damião Barbosa Timóteo
**Login do GitHub:** cosmethejack
**Usei IA?** ( ) não · ( X ) sim — qual ferramenta: Microsoft Copilot para revisão de código; pra que: troubleshooting de testes Playwright e esclarecimento de conceitos.

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*
toHaveCount() espera automaticamente até que a quantidade correta apareça na tela. Já await locator.count() captura o valor naquele instante, podendo falhar se a página ainda estiver carregando. Por isso o primeiro formato gera testes mais estáveis e menos sujeitos a problemas de sincronização.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*
No Bloco C precisamos interceptar as requisições do catálogo com mocks. Se o Service Worker estiver ativo, ele pode responder do cache e impedir a interceptação. No Bloco E o objetivo é justamente validar comportamento offline, cache e funcionamento da PWA, então o Service Worker precisa permanecer ligado.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*
O ganho é velocidade e estabilidade, porque o teste começa com o estado pronto e não depende de várias interações na interface. 
O risco é não validar o fluxo real de favoritar pela interface, pois a semente altera diretamente o estado da aplicação.
Eu não semearia quando o objetivo fosse testar a experiência do usuário ao clicar nos botões de favorito.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*
O F1a usava .count() de forma frágil. O F1b usava waitForTimeout(), que depende de tempo fixo. O F1d dependia do estado deixado por outro teste, quebrando o isolamento. Corrigi usando toHaveCount(), removendo esperas fixas e preparando o estado dentro do próprio teste. 
Validei executando:
npx playwright test tests/desafios/06-flaky-cacada.spec.ts -g "F1d"
e depois:
npm run check
Obtive 3/3 testes verdes no Bloco F e 20/20 desafios concluídos.

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*
Os mocks dão confiança de que a interface reage corretamente a respostas esperadas, erros e alterações de dados. Porém um problema real no backend, como mudança de contrato, lentidão excessiva, dados inconsistentes ou campos ausentes, pode passar despercebido porque os testes usam respostas controladas.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?
Escolhi o fluxo de busca porque ele representa uma funcionalidade central do CineFav. O risco coberto é a impossibilidade de o usuário acessar a tela de busca e encontrar filmes. Os testes validam a navegação correta para a busca, garantem que a aplicação saia da tela inicial após a ação do usuário e verificam o comportamento de retorno utilizando o histórico do navegador.Não testei cenários relacionados ao conteúdo retornado pela busca, como diferentes termos de pesquisa, qualidade dos resultados e ordenação. O foco da missão foi validar a navegação para a busca e a disponibilidade da funcionalidade.
