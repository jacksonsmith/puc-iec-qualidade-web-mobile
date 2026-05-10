# Lab M5 IA Test Generation — aluno: jacksonsmith (teste)

Pipeline:
- Claude API (`@anthropic-ai/sdk`) gera testes
- Healing loop (max 3 retries com re-prompt em failure)
- Visual AI via pixelmatch
- Relatório crítico (relatorio.md)

## Como rodar

```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm install
npx tsx src/pipeline.ts
```

> Configure ANTHROPIC_API_KEY como secret no fork pra CI rodar.
