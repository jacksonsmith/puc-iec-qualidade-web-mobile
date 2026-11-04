# RESPOSTAS — Lab Arquitetura de Testes

Responda com suas palavras (2–4 linhas cada). Vale 1 ponto, avaliado manualmente.

1. **Fragmento:** o que mudou na leitura do `00-refatorar.yaml` depois da refatoração? Que problema real isso resolve quando o fluxo de login muda?

Depois da refatoração, o fluxo fica focado na história do usuário e não nos detalhes de implementação. Quando o login muda, eu preciso ajustar apenas o fragmento `_fragments/login.yaml`, em vez de repetir a correção em vários flows.

2. **Fragmento × POM:** qual a diferença entre `_fragments/login.yaml` e `elements/login.js`? Quando você usaria cada um?

O fragmento é um passo reutilizável de navegação e ação do Maestro, mais útil para cenários de fluxo. O POM centraliza os seletores e evita IDs espalhados no YAML; ele vale quando a tela tem muitos elementos ou quando a manutenção precisa ser mais robusta.

3. **Fragmento parametrizado:** por que chamar o mesmo `buscar.yaml` duas vezes com `TERM` diferente é melhor que copiar o flow?

Porque o comportamento é o mesmo e só o dado muda. Isso reduz duplicação, torna a manutenção simples e evita inconsistência entre buscas parecidas.

4. **Um limite:** onde essa arquitetura NÃO ajuda (ou piora)? Dê um exemplo.

Ela não resolve bem quando o fluxo depende de lógica muito específica de negócio ou de estados que mudam de forma imprevisível. Em casos de validações complexas ou cenários altamente dinâmicos, o YAML pode ficar menos legível do que um teste mais explícito e direcionado.
