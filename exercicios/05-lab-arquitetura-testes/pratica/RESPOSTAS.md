Aqui tens uma proposta de respostas claras, diretas e estruturadas para o teu ficheiro **`RESPOSTAS.md`**, cumprindo o limite de 2 a 4 linhas por questão e prontas para a avaliação manual do professor no Canvas:

---

### 1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?

A leitura do fluxo principal tornou-se muito mais limpa e declarativa, substituindo passos repetitivos por uma única chamada ao fragmento. Isso resolve o problema da manutenção duplicada: se o fluxo de login mudar (como a adição de um novo campo ou alteração de ecrã), basta atualizar o fragmento centralizado uma única vez, em vez de alterar dezenas de ficheiros de teste.

### 2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?

O fragmento (`_fragments/login.yaml`) encapsula passos e ações executáveis no ecrã (como clicar e preencher), enquanto o Page Object (`elements/login.js`) centraliza apenas os mapeamentos de seletores e IDs dos elementos de forma desacoplada. Usamos fragmentos para reutilizar sequências de ações de negócio e Page Objects quando precisamos gerir seletores de forma dinâmica nos scripts de teste.

### 3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?

Evita a duplicação de código (princípio DRY - *Don't Repeat Yourself*), facilitando a manutenção e garantindo consistência na execução. Se a lógica de busca precisar de alteração no futuro, ajustamos apenas um ficheiro, além de permitir testar múltiplos cenários e dados de entrada de forma escalável.

### 4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.

Esta arquitetura torna-se excessiva e pode piorar a agilidade em projetos altamente dinâmicos com protótipos em constante mudança visual. Por exemplo, em aplicações de e-commerce numa fase inicial de *startup*, onde os IDs e componentes mudam radicalmente a cada *sprint*, a sobrecarga de manter Page Objects rígidos e múltiplos fragmentos gera um custo de manutenção superior ao valor entregue pelos testes automatizados.