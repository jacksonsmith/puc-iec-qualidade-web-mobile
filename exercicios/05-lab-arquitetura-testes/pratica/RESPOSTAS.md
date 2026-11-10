A# Respostas — Lab Maestro Avançado (Arquitetura de Testes)

1. **Por que extrair fluxos repetitivos (como o login) em fragmentos (`_fragments/`) traz ganho de manutenibilidade?**
   Porque centraliza a lógica de autenticação em um único ponto. Caso haja qualquer alteração nos seletores ou no fluxo de login da aplicação no futuro, precisamos alterar o código em apenas um lugar (`_fragments/login.yaml`), evitando refatorações manuais em dezenas de arquivos de teste.

2. **Qual é a principal vantagem de usar variáveis de ambiente (`env`) em fragmentos do Maestro?**
   Permite reutilizar o mesmo fragmento de código para diferentes cenários de testes parametrizados (como buscar diferentes termos ou preencher diferentes dados), mantendo o código limpo, modular e aderente ao princípio DRY (Don't Repeat Yourself).

3. **Como o Page Object Pattern (POM) aplicado via arquivos `.js` ajuda a separar a lógica de teste dos seletores da interface?**
   O POM isola os seletores e `testIDs` em arquivos estruturados de mapeamento. Dessa forma, os arquivos YAML dos flows focam exclusivamente nas regras de negócio e passos do usuário, blindando os testes contra mudanças visuais e de seletores.

4. **Qual é o impacto prático de garantir que os flows passem 3 vezes seguidas sem falhas (eliminando *flakiness*)?**
   Garante a confiabilidade da suíte de testes na pipeline de Integração Contínua (CI). Testes instáveis (*flaky*) geram falsos alarmes, perda de confiança na automação e atrasos desnecessários nos deploys da equipe.