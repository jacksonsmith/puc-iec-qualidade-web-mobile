# RESPOSTAS — Lab Playwright PWA

> Preencha **depois** de fazer os desafios (≈ 10 min). Respostas **curtas e suas** (3 a 6 linhas cada).
> Não precisa de texto bonito — precisa mostrar que você **entendeu o porquê**, não só o como.
> Vale 1 ponto (correção manual, no Canvas).

**Nome:** Giovane Rocha
**Login do GitHub:** rochagio
**Usei IA?** ( ) não · (X) sim — qual ferramenta e pra quê: ChatGPT, sem agentes ou ferramentas similares. Para avaliar o código escrito, sempre sugerindo melhoras e o porquê delas (para aprender duas vezes)

---

### 1. Por que `await expect(locator).toHaveCount(12)` é melhor que `expect(await locator.count()).toBe(12)`?
*(Dica: o que cada um faz se a lista ainda estiver carregando? Pense no Bloco B e no F.)*

A principal diferença é que await expect(locator).toHaveCount(12) utiliza uma asserção com espera automática e novas tentativas (auto-retry). Se a lista ainda estiver carregando, o Playwright continuará verificando a quantidade de elementos até encontrar os 12 esperados ou atingir o tempo limite configurado.
Já expect(await locator.count()).toBe(12) consulta a quantidade de elementos apenas uma vez. Se a lista ainda estiver carregando e houver menos de 12 elementos naquele instante, o teste falhará, mesmo que os elementos apareçam logo depois.
Por isso, no Bloco F, substituí as verificações com .count() por toHaveCount(), eliminando uma fonte de instabilidade e tornando os testes mais confiáveis.

### 2. Por que o Bloco C desliga o Service Worker (`serviceWorkers: 'block'`) e o Bloco E mantém ligado?
*(Dica: o que o SW faz com o `fetch` do catálogo? E o que o teste offline precisa do SW?)*

No Bloco C, o Service Worker é desativado com serviceWorkers: 'block' para que ele não interfira nos mocks de rede. Como o Service Worker pode interceptar requisições fetch e responder com dados armazenados no cache, o teste poderia receber uma resposta em cache em vez da resposta simulada pelo Playwright. Desativá-lo torna os testes de interceptação e simulação de respostas mais previsíveis.
No Bloco E, o Service Worker precisa permanecer ligado porque o objetivo é validar o comportamento real da PWA. Ele pode armazenar os recursos necessários no Cache Storage e disponibilizar a aplicação quando não há conexão com a internet.
Portanto, o Bloco C isola os testes de rede, enquanto o Bloco E verifica os recursos offline da aplicação, incluindo o controle da página pelo Service Worker.

### 3. No D3 você semeou favoritos pelo `localStorage` em vez de clicar nos corações. Qual o ganho? Qual o risco? Cite **um caso em que você NÃO semearia**.
*(Dica: o que o clique prova que a semente não prova?)*

A principal vantagem de semear os favoritos diretamente no localStorage é preparar rapidamente o estado inicial necessário para o teste, sem depender da interação com a interface. Isso torna o teste mais rápido e permite concentrar a validação na exibição dos favoritos, em vez de testar novamente o processo de favoritar.
O risco é que a semente pode contornar defeitos na funcionalidade real, como um botão que não responde ao clique, uma atualização incorreta do estado ou uma falha na persistência dos dados.
Eu não semearia os favoritos em um teste cuja finalidade fosse validar o fluxo completo de favoritar um filme. Nesse caso, clicaria no coração e verificaria se o estado visual muda e se o favorito aparece na tela correspondente. Assim, o teste comprova o funcionamento da interação real, e não apenas a leitura dos dados previamente preparados.

### 4. Bloco F: quais eram os defeitos dos testes instáveis (F1a, F1b e F1d) e como você **provou** que ficaram estáveis?
*(Cite os comandos que rodou e o resultado.)*

No Bloco F, identifiquei três problemas principais:
- F1a: utilizava .count() para verificar imediatamente a quantidade de resultados da busca. Como os resultados poderiam ainda estar carregando, o teste poderia falhar prematuramente. Substituí a verificação por await expect(resultados).toHaveCount(1), que aguarda a condição esperada.
- F1b: utilizava waitForTimeout(300), dependendo de um intervalo fixo que poderia ser insuficiente ou desnecessário, além de consultar a quantidade de filmes apenas uma vez. Removi a espera fixa e passei a utilizar await expect(page.getByRole('article')).toHaveCount(24).
- F1d: dependia implicitamente do F1c ter sido executado antes para que Matrix já estivesse favoritado. Corrigi o teste para que ele próprio favorite Matrix antes de abrir a tela de favoritos, garantindo sua independência.
Para comprovar a estabilidade, executei os comandos:
npx playwright test 06-flaky --repeat-each=10
npx playwright test 06-flaky -g "F1d"

### 5. Seus mocks do Bloco C (C1–C4) dão confiança em quê — e **que bug real passaria batido** mesmo com todos eles verdes?
*(Dica: o que muda quando o backend é de verdade? Pense em contrato, formato, lentidão.)*

Os mocks do Bloco C dão confiança de que a aplicação reage corretamente às respostas de rede simuladas nos cenários definidos pelos testes, como a apresentação de dados específicos e o tratamento dos comportamentos previstos. Eles também permitem testar situações controladas sem depender da disponibilidade do backend real.
Entretanto, mesmo que todos os testes passem, ainda pode existir um defeito na integração com o backend verdadeiro. Por exemplo, o backend pode retornar um campo com nome diferente, um formato de JSON incompatível, um código HTTP inesperado ou uma resposta muito lenta. Como o mock controla a resposta recebida pelo frontend, esses problemas podem não ser identificados.
Um exemplo concreto seria o mock retornar um objeto com o campo title, enquanto o backend real passa a retornar name. O teste pode continuar verde se o mock mantiver o formato antigo, mas a aplicação real pode deixar de exibir os títulos dos filmes.
Por isso, os mocks devem ser complementados por testes de integração ou de contrato com o backend real, além de testes que validem os formatos das respostas, os códigos HTTP e os comportamentos em condições de lentidão ou falha.

### 6. Missão livre: por que você escolheu **esse** fluxo? Que risco do produto ele cobre? O que ficou **sem** teste e por quê?

Escolhi esse fluxo porque favoritar e consultar filmes não garante que o usuário consiga desfazer uma ação corretamente. A remoção precisa atualizar a interface e persistir o novo estado, inclusive após recarregar a página.

O risco coberto é a inconsistência entre o estado exibido e os dados armazenados: um filme removido pode continuar aparecendo na lista, o contador pode não ser atualizado ou o favorito pode reaparecer após uma recarga. Os testes verificam o caminho normal, o comportamento com a lista vazia e a persistência da remoção.
