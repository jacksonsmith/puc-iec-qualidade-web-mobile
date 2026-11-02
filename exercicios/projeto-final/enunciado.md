# Seminário Técnico em Grupo — Projeto Final (50 pts)

**Disciplina:** Qualidade em Aplicações Web e Mobile
**Modalidade:** grupo de 3 a 4 alunos
**Apresentação:** ver Canvas (~20 min, com perguntas no final)
**Entrega (slides + relatório):** ver Canvas

---

## O que é

Seminário técnico: cada grupo escolhe **um tema de testes atual**, estuda **boas fontes** e **apresenta** o que descobriu. Não é um artigo científico, mas a qualidade das fontes limita a qualidade do trabalho.

**Regras de ouro**

- **Escopo pequeno.** É uma semana de trabalho: recorte o tema até caber.
- **Fontes confiáveis.** Veja a seção *Fontes* abaixo.
- **IA é permitida, declarando:** o relatório diz qual ferramenta usou e como. Cópia sem entendimento = zero.
- **Custo zero:** nada de serviço pago ou cartão de crédito.

## Escolha do tema

O tema é **livre**, web ou mobile. **Comece por um problema**, não por uma ferramenta, e daí chegue aos artigos e casos reais.

> Exemplo de problema: "como grandes empresas resolvem *flakiness*?" · "como times estão usando LLM para gerar testes?"

| Trilha | Exemplos de tema (2026) |
|---|---|
| 🤖 Agentes de IA | Playwright Agents (planner / generator / healer) · Maestro MCP com agente de código · crítica da geração de testes por LLM (*oracle problem*, taxa de acerto) · agentes autônomos de qualidade |
| 🔭 Shift-right | observabilidade como superfície de teste · feature flags e *canary release* · falha em produção virando teste de regressão |
| 🧠 Testar app com LLM | *evals* (avaliações) e red-teaming de aplicações conversacionais ou APIs com LLM |
| 🌐 Web / PWA | regressão visual · Lighthouse CI com budget · Service Worker e offline |
| 📱 Mobile | Maestro avançado e Page Object · testes visuais · medir e reduzir *flakiness* |
| 🏗️ Pipeline | CI/CD com sharding e quality gate · *mutation testing* (Stryker) |
| ♿ Acessibilidade / ⚡ Perf / 🔒 Segurança | auditoria WCAG 2.2 · Flashlight/Reassure · OWASP MASVS |

Tema próprio é bem-vindo. Se tiver dúvida de escopo, fale com o professor **antes** de começar.

**Escopo bom × ruim**

- ✅ "Como gerar testes de usabilidade com LLMs no Playwright para dispositivos Android"
- ❌ "LLMs em testes" (amplo demais para uma semana)

## Fontes

| ✅ Boa fonte | ❌ Fonte fraca |
|---|---|
| blog de engenharia de empresa com o caso real (Netflix Tech Blog, Anthropic, Google, Airbnb…) | wiki aberta sem autoria verificável |
| autor de referência (ex.: Martin Fowler) | post sem autor, sem data ou sem link |
| paper (IEEE, ACM, USENIX) com autor, venue e ano | resumo de IA sem a fonte original |
| documentação oficial da ferramenta | |

Cite cada fonte com **autor, título, link e data de acesso**. Artigo científico é bem-vindo, mas não é obrigatório.

## O que entregar

| # | Entregável | O que é | Obrigatório? |
|---|---|---|---|
| 1 | **Apresentação** | ~20 min: problema → fontes e solução → achados e trade-offs → limites. Perguntas no final. **O grupo decide** quem fala | ✅ |
| 2 | **Relatório** | 2 páginas, com o modelo abaixo (ou o seu, com o mínimo pedido) | ✅ |
| 3 | **Artefato técnico** | link de repositório, demo ou experimento que o grupo fez | ⭐ **bônus** |

- **Demo é opcional.** Se der tempo, melhor; se não der, tudo bem.
- **Modelos:** [`template-apresentacao.md`](https://github.com/jacksonsmith/puc-iec-qualidade-web-mobile/blob/main/exercicios/projeto-final/template-apresentacao.md) · [`template-relatorio.md`](https://github.com/jacksonsmith/puc-iec-qualidade-web-mobile/blob/main/exercicios/projeto-final/template-relatorio.md). Usar o modelo é opcional; o **mínimo** do relatório é: contexto, problema, por que ele importa, quem é afetado e as fontes.
- **Prioridade:** se faltar tempo, priorize a **apresentação**; o relatório sai depois.

**Como entregar (Canvas):** **uma** pessoa do grupo entrega os slides e o relatório, **com o nome de todos os integrantes**. Se duas pessoas entregarem, não tem problema: o professor reconhece que são do mesmo grupo.

**Ordem de apresentação:** sorteio no início da última aula.

## Critérios de avaliação (50 pts)

| Critério | Pontos |
|---|---|
| Apresentação (clareza, domínio do tema, uso das fontes) | 20 |
| Relatório (contexto, problema, evidência, limites, fontes) | 18 |
| Domínio conceitual nas perguntas | 7 |
| Originalidade e profundidade | 5 |
| ⭐ Artefato técnico (bônus) | recupera pontos perdidos nos critérios acima; o PF **não passa de 50** |

- **Todos trabalham:** o grupo se organiza para que cada pessoa contribua. Quanto melhor o trabalho, mais pontos para todos.
- **Contribuição individual:** quem não contribuiu (relatório, perguntas) pode ter nota diferente dentro do grupo.
- **Originalidade:** resumo copiado de uma única fonte não vale.

## Roteiro sugerido da apresentação (~20 min)

1. **Problema** — que risco ou dor de qualidade o grupo estudou (3 min)
2. **Fontes e solução** — o que boas fontes dizem, por que esta abordagem e não outra (6 min)
3. **Achados e trade-offs** — o que funciona, o que custa, o que não funcionou (6 min)
4. **Limites e próximos passos** (2 min)
5. **Perguntas** (3 min)

## Leituras de apoio

- Maestro Docs — *Selectors* e *Best practices*; receita *Page Object Model*
- Playwright Docs — *Visual comparisons* e *Best practices*
- W3C WCAG 2.2 — Quick Reference
- Wang et al. (2023) e Lam et al. (2019, iDFlakies) — causas de testes flaky
