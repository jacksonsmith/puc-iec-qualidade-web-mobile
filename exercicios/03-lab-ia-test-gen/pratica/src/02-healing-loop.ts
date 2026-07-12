// src/02-healing-loop.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — healing loop: teste falhou → re-prompt com o erro → retry
//
//   npm run heal -- generated/favoritar.spec.ts stories/favoritar.story.md
//
// A rubrica pede: re-prompt em falha de seletor, MÁXIMO 3 tentativas.
// ⚠️ Cuidado com o anti-pattern da aula: healing que "conserta" enfraquecendo
// a asserção mascara regressão real — o prompt heal.md já proíbe, mas VOCÊ
// audita o diff de cada tentativa (o script imprime o código novo).
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { ask, extractCode } from './lib/claude.js';

const specPath = process.argv[2] ?? 'generated/favoritar.spec.ts';
const storyPath = process.argv[3] ?? 'stories/favoritar.story.md';

const story = readFileSync(storyPath, 'utf8');
const healSystem = readFileSync('prompts/heal.md', 'utf8');

const MAX_ATTEMPTS = 3;

/** Roda o spec; devolve null se passou, ou o output de erro se falhou. */
function runSpec(): string | null {
  try {
    execSync(`npx playwright test ${specPath}`, { stdio: 'pipe' });
    return null;
  } catch (err: any) {
    return [err.stdout?.toString(), err.stderr?.toString()].filter(Boolean).join('\n');
  }
}

// TODO 1: rode o spec uma vez (runSpec). Se passou (null), imprima
//         "✅ nada a curar" e encerre (process.exit(0)).

// TODO 2: loop de healing — for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++)
//   a. monte a mensagem pro Claude com:
//      - o código atual do spec: readFileSync(specPath, 'utf8')
//      - o erro da última execução
//      - a story original (os seletores válidos)
//      Dica de formato:
//        `## Código atual\n\`\`\`typescript\n${code}\`\`\`\n\n## Erro\n${error}\n\n## Story\n${story}`
//   b. const answer = await ask(healSystem, mensagem)
//   c. const fixed = extractCode(answer)
//   d. imprima o código corrigido (auditoria!) e grave: writeFileSync(specPath, fixed)
//   e. rode de novo (runSpec). Passou? imprima em qual tentativa curou e encerre.
//      Falhou? guarde o novo erro e continue o loop.

// TODO 3: esgotou MAX_ATTEMPTS sem curar → imprima o erro final e
//         process.exitCode = 1. (Healing não é mágica — às vezes o bug é do app!)

console.log('Complete os TODOs deste arquivo — veja o screencast da aula.');
