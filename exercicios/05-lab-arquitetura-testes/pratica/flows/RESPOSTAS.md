. Fragmento: o que mudou na leitura do 00-refatorar.yaml depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?
A leitura ficou muito mais limpa e declarativa, pois os passos repetitivos do fluxo foram abstraídos por chamadas como runFlow. Se a tela de login mudar, ajustamos apenas o arquivo centralizado no fragmento uma única vez, sem a necessidade de alterar dezenas de testes que dependem do login.

2. Fragmento × POM: qual a diferença entre _fragments/login.yaml e elements/login.js? Quando você usaria cada um?
O _fragments/login.yaml encapsula ações sequenciais reusáveis (ex: abrir tela, preencher e clicar). Já o elements/login.js (Page Object) guarda apenas mapeamentos de seletores/elementos. Usamos o POM quando queremos centralizar os IDs de uma tela e o Fragmento quando precisamos reutilizar um fluxo inteiro de passos.

3. Fragmento parametrizado: por que chamar o mesmo buscar.yaml duas vezes com TERM diferente é melhor que copiar o flow?
Evita a duplicação de código (princípio DRY). Manter apenas um fragmento parametrizado reduz drasticamente a manutenção do projeto, pois qualquer correção na lógica de busca afeta todas as variações de termos testadas automaticamente.

4. Um limite: onde essa arquitetura NÃO ajuda (or piora)? Dê um exemplo.
Ela piora em cenários de teste altamente específicos ou de exceção pontual, onde criar um fragmento exclusivo para usar em apenas um lugar adiciona complexidade e arquivos desnecessários à estrutura do projeto (over-engineering), dificultando o rastreio do teste.