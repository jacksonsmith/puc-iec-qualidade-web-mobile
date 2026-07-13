// src/01-gen-test.ts
// ─────────────────────────────────────────────────────────────────────────────
// 📘 MODELO (resolvido) — user story → LLM gera teste Playwright → executa
//
//   npm run gen -- stories/favoritar.story.md
//
// Fluxo: lê a story → monta prompt → o LLM gera o spec → grava em generated/
// → roda o Playwright. É o passo 1 do pipeline (o healing loop é o passo 2).
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename } from 'node:path';
import { execSync } from 'node:child_process';
import { ask, extractCode } from './lib/llm.js';

const storyPath = process.argv[2] ?? 'stories/favoritar.story.md';
const story = readFileSync(storyPath, 'utf8');
const system = readFileSync('prompts/gen-test.md', 'utf8');

console.log(`1) Gerando teste a partir de ${storyPath}…`);
const answer = await ask(system, story);
const code = extractCode(answer);

mkdirSync('generated', { recursive: true });
const specPath = `generated/${basename(storyPath).replace('.story.md', '')}.spec.ts`;
writeFileSync(specPath, code);
console.log(`2) Spec gravado em ${specPath}`);

console.log('3) Executando o teste gerado…');
try {
  execSync(`npx playwright test ${specPath}`, { stdio: 'inherit' });
  console.log('✅ Teste gerado PASSOU de primeira.');
} catch {
  console.log('❌ Teste gerado FALHOU. Próximo passo: healing loop (npm run heal).');
  process.exitCode = 1;
}
