# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?
O fluxo ficou mais simples de ler porque o login foi substituído por uma chamada reutilizável. Se o processo de login mudar, basta atualizar o fragmento, evitando corrigir o mesmo trecho em vários testes.


2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?
O fragmento login.yaml reúne ações de teste, como preencher os campos e entrar no sistema. Já elements/login.js centraliza os seletores dos elementos da tela. Uso o fragmento para reutilizar comportamentos e o POM para facilitar a manutenção dos seletores.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?
Reutilizar buscar.yaml com termos diferentes evita duplicação e facilita a manutenção. Se a lógica da busca mudar, a alteração será feita em um único arquivo, mantendo os testes consistentes.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.
Essa arquitetura pode ser excessiva em testes muito simples, com poucas ações e sem repetição. Criar vários fragmentos e arquivos de seletores para um único passo pode aumentar a complexidade sem trazer benefício proporcional.
