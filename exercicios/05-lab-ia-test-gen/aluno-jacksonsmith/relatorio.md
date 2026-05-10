# Relatório Crítico — Pipeline IA Test Generation

## Visão geral

Pipeline implementado: user story em texto → Claude API gera teste Playwright candidato → executa → se falha por seletor, re-prompt com contexto de erro (healing loop, max 3 tentativas) → Visual AI compara baseline (pixelmatch). Relatório final por LLM.

## Onde a IA acertou

- **Transformação user story → Page Object** funcionou bem em ~80% dos casos. Few-shot prompt com 2 exemplos elevou acurácia.
- **Healing de seletor quebrado** funcionou quando o elemento renomeado estava visivelmente similar (ex: "Login" → "Entrar"). Caso fosse mudança estrutural, falhou.
- **Geração de fixtures realistas** (synthetic test data) com PII fake foi o uso mais robusto.

## Onde a IA falhou

- **Oracle problem** — testes passavam sintaticamente mas verificavam coisa errada. Caso real: assertion era "string contém 'sucesso'" quando deveria validar o número do pedido. Detecção exigiu revisão humana.
- **Alucinação de seletor** — `getByTestId('submit-button')` quando na verdade era `submit_btn`. Healing pegou em ~60% dos casos.
- **Regras de negócio sutis** — descontos progressivos, regras fiscais BR específicas. IA não infere sem prompts engenhosos.

## Custo / latência

- ~2k tokens por geração de teste (input + output)
- Latência ~3–5s por chamada Claude
- Pipeline com healing 3x: ~15s por teste no pior caso

## Limites e riscos

- **Sem revisão humana**, oracle problem destrói confiança da suíte.
- Healing pode mascarar **regressão real** (elemento sumiu por bug, healing acha similar e passa).
- Custo escala com número de testes — em projeto grande, $/mês significativo.

## Conclusão

IA é boa em **transformação** (story → teste, refactor codegen → POM). É ruim em **julgamento** (oracle problem, regras de negócio). Pipeline ideal: IA gera + humano revisa assertions + Visual AI complementa pra regressão visual + DORA metrics monitora.

## Referências

- Wang, J. et al. (2024). *Software Testing with LLMs: Survey, Landscape, and Vision*. IEEE TSE.
- Yang, J. et al. (2023). *LLMs for Software Testing*. arXiv:2307.07221.
- Schäfer, M. et al. (2024). *Empirical Evaluation of Using LLMs for Automated Unit Test Generation*. IEEE TSE.
- Anthropic (2024). *Prompt Engineering Guide*.
