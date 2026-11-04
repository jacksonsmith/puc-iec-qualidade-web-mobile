# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?

   Antes o flow era uma lista de toques e ids. Agora ele lê como a história do usuário:

   1. faz login
   2. favorita o 603
   3. favorita o 27205
   4. abre favoritos e confere

   Se o login mudar (um campo novo, um id renomeado), corrigimos só o `_fragments/login.yaml` e todos os flows que o usam voltam a passar, em vez de caçarmos o login copiado em cada arquivo.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?

   O fragmento guarda **o que fazer** (uma sequência de passos reaproveitável: preencher, tocar, conferir). O Page Object guarda **como achar** os elementos (só o mapa nome → testID, sem ação nenhuma). Usamos fragmento quando vários testes repetem a mesma ação inteira (login, abrir a busca); usamos POM quando os testes fazem coisas diferentes na mesma tela e só queremos centralizar os seletores.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?

   A lógica da busca existe em um lugar só: se o campo de busca mudar, consertamos uma vez. E adicionar um novo caso de teste vira uma linha de `env` (o dado), não um bloco copiado de passos — fica claro que o que varia é só o termo, não o comportamento.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.

   Em flows curtos ou únicos ela só adiciona indireção: para entender o `05-favoritos-composto.yaml` precisamos abrir o fragmento de login e o `movielist.js` para saber qual id está sendo tocado. Também piora quando o fragmento cresce com muitos parâmetros e `if`s para servir todo mundo (ex.: um `login.yaml` com `env` para usuário inválido, senha errada, lembrar-me...) — aí vira um mini-programa difícil de depurar, e seria melhor escrever o caso negativo direto no flow.
