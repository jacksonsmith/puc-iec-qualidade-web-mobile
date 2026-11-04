# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

**Nome:** Richard Schmitz Riedo

**GitHub:** Sommellier

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?

   O flow passou a contar a história do usuário — entrar, favoritar dois filmes e conferir os
   favoritos — sem expor os detalhes do login. Se a tela de autenticação mudar, basta ajustar
   `login.yaml`; todos os flows que o reutilizam recebem a correção.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?

   O fragmento descreve uma sequência reutilizável de ações e asserções; o Page Object
   centraliza apenas os seletores da tela. Eu usaria o fragmento para repetir um comportamento
   completo e o POM quando diferentes flows precisam localizar os mesmos elementos.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?

   A parametrização elimina passos duplicados e garante que as duas buscas sigam exatamente o
   mesmo comportamento. Uma mudança no campo ou na asserção é feita uma vez, enquanto os termos
   continuam explícitos no flow que descreve o cenário.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.

   Em um fluxo curto, usado uma única vez e com seletores estáveis, muitas camadas podem esconder
   mais do que explicar. Criar fragmento, parâmetro e POM para um único toque aumenta a navegação
   entre arquivos e torna a falha mais demorada de diagnosticar.
