# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?

   Antes eram ~20 linhas de infraestrutura (ids, `inputText`, cliques repetidos). Agora o flow lê como uma história: faz login, favorita dois filmes, abre favoritos e confere o contador. Se o login mudar, edito só o `_fragments/login.yaml` e todos os flows que o chamam continuam funcionando, em vez de corrigir cópia por cópia.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?

   O fragmento é uma **ação** reaproveitável (a sequência de passos do login). O Page Object guarda **identificadores** (os testIDs de email, senha e botão). Uso fragmento quando repito uma sequência de passos, e POM quando o mesmo `id` aparece em vários flows e quero trocá-lo em um lugar só se o dev renomear o testID.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?

   O teste é o mesmo e só muda o dado (Matrix, Avatar). Com `env` a lógica da busca fica em um arquivo, então um ajuste vale para os dois casos e adicionar um terceiro termo é só mais uma chamada. Copiar o flow duplicaria o código e as cópias acabariam divergindo.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.

   Em um app pequeno ou num teste simples e descartável, fragmentos e POM só espalham a lógica por vários arquivos e dificultam a leitura: para entender um flow é preciso abrir fragmento, POM e flow. Também não ajudam contra flakiness de ambiente (emulador lento, API instável): um fragmento bem organizado continua falhando, e aí o que resolve é `extendedWaitUntil` ou `retry`.
