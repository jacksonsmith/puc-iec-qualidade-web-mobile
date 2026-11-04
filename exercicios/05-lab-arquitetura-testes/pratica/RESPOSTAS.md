# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?
Depois da refatoração, o 00-refatorar.yaml ficou mais simples e fácil de entender, pois passou a chamar um fragmento para realizar o login. Se o fluxo de login mudar, basta atualizar o arquivo _fragments/login.yaml, evitando repetir a mesma alteração em vários testes.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?
O _fragments/login.yaml reúne as ações necessárias para realizar o login, como preencher os campos e clicar no botão. Já o elements/login.js centraliza os seletores dos elementos da tela. Usaria o fragmento para reutilizar um fluxo de ações e o POM para manter os seletores organizados.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?
Chamar o mesmo buscar.yaml com valores diferentes de TERM evita duplicação de código e facilita a manutenção. Se a lógica da pesquisa mudar, preciso alterar apenas um fragmento, mantendo os testes consistentes para diferentes termos.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.
Essa arquitetura pode piorar a leitura quando um teste é muito simples e utiliza vários fragmentos pequenos sem necessidade. Por exemplo, um teste que verifica apenas a abertura da tela inicial pode ficar mais difícil de entender se depender de diversas chamadas indiretas.