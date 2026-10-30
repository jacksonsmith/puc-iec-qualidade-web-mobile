# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?

   **Resposta:** Antes, o arquivo mostrava cada passo do login e ficava mais comprido. Depois da refatoração, dá para entender melhor a sequência: entrar, favoritar os filmes e conferir a lista. Se o login mudar, ajusto o fragmento uma vez, em vez de procurar e corrigir os passos em vários flows.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?

   **Resposta:** O `_fragments/login.yaml` guarda as ações do login, como preencher e-mail e senha e tocar no botão. Já o `elements/login.js` guarda os IDs dos elementos em um lugar só. Uso o fragmento para reaproveitar um fluxo de ações e o POM para não espalhar seletores pelos testes.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?

   **Resposta:** Assim, a lógica da busca fica escrita em um lugar só e posso testar termos diferentes, como “Matrix” e “Avatar”. Se precisar mudar os passos da busca, faço a alteração uma vez, sem manter cópias que podem acabar ficando diferentes.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.

   **Resposta:** Para um teste muito curto, que só será usado uma vez, criar vários fragmentos e arquivos de seletores pode deixar tudo mais difícil de acompanhar do que manter os passos juntos. Eu usaria essa organização principalmente quando há ações ou seletores que serão reaproveitados.
