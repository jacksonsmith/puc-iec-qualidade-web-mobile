# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?

Antes o flow era uma lista de toques e ids e era difícil ver o que estava sendo testado. Agora dá pra ler como uma história: entra, favorita dois filmes e confere os favoritos. Se o login mudar (um campo novo, um id renomeado), eu arrumo só o `login.yaml` e todos os flows que usam ele continuam funcionando, em vez de caçar o mesmo trecho copiado em vários arquivos.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?

O fragmento guarda uma sequência de passos (o "como fazer" o login). O Page Object guarda só os seletores da tela (o "onde está" cada elemento), e o flow decide o que fazer com eles. Uso fragmento quando a mesma ação se repete igual em vários testes, e POM quando preciso montar passos diferentes na mesma tela mas quero os ids num lugar só.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?

Porque a lógica da busca fica escrita uma vez só e o que muda é só o dado. Se a tela de busca mudar, arrumo um arquivo. E fica fácil testar mais termos, é só mais um runFlow com outro TERM, sem duplicar passos.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.

Quando o teste é pequeno ou roda uma vez só, criar fragmento e Page Object é mais trabalho do que ajuda, e quem lê precisa abrir três arquivos pra entender um flow de cinco linhas. Também atrapalha quando alguém cria um fragmento genérico demais, cheio de parâmetros, que tenta servir pra tudo. Aí ele fica mais difícil de entender do que o flow copiado.

---

Uso de IA: usei o Claude Code pra escrever os flows e me ajudar com um rascunho destas respostas, que depois revisei.
