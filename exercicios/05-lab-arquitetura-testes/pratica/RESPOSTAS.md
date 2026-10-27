# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?
O 00-refatorar.yaml ficou muito mais limpo e legível, focando apenas no objetivo do teste, pois as etapas repetitivas de autenticação foram isoladas no fragmento. Isso resolve o problema de manutenção: se a tela ou a regra de login mudar, ajusta-se apenas o arquivo do fragmento em um único lugar, evitando quebrar dezenas de testes espalhados pelo projeto.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?
O _fragments/login.yaml encapsula uma sequência reutilizável de ações e passos (fluxo de navegação), enquanto o elements/login.js armazena apenas o mapeamento de seletores/IDs da interface (Page Object Model). Usamos o fragmento para reaproveitar fluxos inteiros (ex: fazer login antes de testar algo) e o POM para abstrair os IDs da tela, garantindo que mudanças de layout não quebrem os scripts YAML.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?
Chamar o mesmo fragmento com parâmetros diferentes (env) evita duplicação de código e facilita a manutenção: se a lógica de busca mudar, atualiza-se apenas o arquivo uma vez. Além disso, melhora a legibilidade, pois fica claro que ambos os testes executam a mesma ação fundamental, variando apenas o insumo, o que é ideal paracenários de validação com dados distintos.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.
Essa arquitetura piora quando o teste precisa interagir com a interface de forma não linear ou com estados inesperados. Por exemplo, se um fluxo exigir múltiplos caminhos de navegação dependendo de mensagens ou pop-ups que mudam frequentemente, tentar encapsular tudo em fragmentos ou POMs fixos pode gerar scripts complexos, pouco flexíveis ou difíceis de manter, dificultando a execução do teste.
