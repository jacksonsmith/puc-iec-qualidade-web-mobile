cd lab-pwa# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Alessandro Ruijun Li
**Login do GitHub:** AleRLi
**Usei IA?** ( ) não · (x) sim — qual ferramenta e pra quê: Utilizei o Agente de IA integrado do visual code (Copilot), principalmente para facilitar na criação dos testes

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
Porque o `expect` do Playwright espera o estado real da tela, então ele aguarda a lista chegar ao tamanho correto em vez de medir imediatamente. O `await count()` só faz uma foto do momento atual e falha quando os dados ainda estão carregando; isso é exatamente o que o bloco B e o bloco F ensinam.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
No bloco C o objetivo é testar a interceptação de rede do `fetch` da API sem que o SW cacheie ou substitua a requisição. Já no bloco E, o SW precisa estar ativo para que o app funcione offline e para que o `reload` continue servindo o conteúdo do cache.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
O ganho é velocidade e isolamento do teste: ele evita depender da UI e deixa o dado pronto antes da página abrir. O risco é não provar a interação real do clique, da renderização e do estado do botão. Eu não semearia quando o fluxo a testar fosse a própria experiência de favoritar, por exemplo a atualização da aridade/label ou a persistência junto ao evento do usuário.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
F1a usava `count()` sem `expect` de UI; F1b usava `waitForTimeout` e contagem fora do expect; F1d assumia que o estado anterior já existia. Provei com `npx playwright test 06-flaky --repeat-each=10` e `npx playwright test 06-flaky -g "F1d"`, ambos passando.

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
Eles validam o comportamento do cliente frente a diferentes respostas da API: erro 500, catálogo reduzido e debounce de busca. O bug que poderia passar é um problema real de contrato/integração com backend, como campo faltando, ordenação diferente, latência alta ou resposta bem-formada mas não compatível com o app em produção.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?
Escolhi o fluxo de favoritos e proteção de rota porque ele junta persistência, autenticação e UX crítica: se um usuário deslogar ou tentar acessar favoritos sem sessão, o app deve bloquear acesso sem quebrar a navegação. O que ficou sem teste foi um cenário mais rico de múltiplos favoritos e gerência de cache, mas o fluxo escolhido já cobre o risco principal com baixa complexidade.

