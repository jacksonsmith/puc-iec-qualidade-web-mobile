/**
 * Validator — M5 Lab IA Test Generation (QA EAD).
 *
 * Critérios (15 pts total):
 *   1. package.json com @anthropic-ai/sdk                            — 2pts
 *   2. Script TS/JS que chama Claude API (messages.create)           — 4pts
 *   3. Healing loop (re-prompt em failure de seletor)                — 3pts
 *   4. Visual AI integrado (applitools/percy/pixelmatch)             — 2pts
 *   5. Relatório crítico (markdown ≥ 3 pgs ou ≥ 800 chars)           — 3pts
 *   6. README explicando arquitetura                                  — 1pt
 */

import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  type GradeCriterion,
  type GradeResult,
  buildBreakdowns,
  computeScore,
  passThreshold,
} from '../compute-score.js';
import { parseArgs, findFiles, fileMatchesAny, findReadme, readFileSafe, readJsonSafe } from '../utils.js';

async function main() {
  const args = parseArgs();
  const criteria: GradeCriterion[] = [];

  // Critério 1: package.json com SDK Anthropic
  const pkgPath = join(args.entrega, 'package.json');
  const pkg = readJsonSafe<any>(pkgPath);
  const allDeps = pkg ? { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) } : {};
  const hasAnthropic = '@anthropic-ai/sdk' in allDeps;
  criteria.push({
    id: 'anthropic-sdk',
    description: 'package.json com @anthropic-ai/sdk',
    weight: 2,
    earned: hasAnthropic ? 2 : 0,
    publicNote: hasAnthropic ? 'SDK detectado' : 'Esperado @anthropic-ai/sdk em deps',
  });

  // Critério 2: Claude API call (requer combinação de evidências)
  const codeFiles = findFiles(args.entrega, ['.ts', '.js', '.mts', '.mjs', '.tsx']);
  const hasImport = fileMatchesAny(codeFiles, [/from\s+['"]@anthropic-ai\/sdk['"]/]);
  const hasInstance = fileMatchesAny(codeFiles, [/new\s+Anthropic\s*\(/]);
  const hasMessagesCreate = fileMatchesAny(codeFiles, [/\.messages\.create\s*\(/]);
  const claudeEvidenceCount = [hasImport, hasInstance, hasMessagesCreate].filter(Boolean).length;
  criteria.push({
    id: 'claude-call',
    description: 'Script chama Claude API (import + new Anthropic + messages.create)',
    weight: 4,
    earned: claudeEvidenceCount === 3 ? 4 : claudeEvidenceCount === 2 ? 2 : claudeEvidenceCount === 1 ? 1 : 0,
    publicNote: `${claudeEvidenceCount}/3 evidências (import, instância, messages.create)`,
  });

  // Critério 3: healing loop
  const hasHealing = fileMatchesAny(codeFiles, [
    /heal/i,
    /retry.*selector/i,
    /while.*attempt|for.*attempt/i,
  ]);
  criteria.push({
    id: 'healing-loop',
    description: 'Healing loop (re-prompt em failure)',
    weight: 3,
    earned: hasHealing ? 3 : 0,
    publicNote: hasHealing ? 'Padrão de healing detectado' : 'Não encontrei loop de healing',
  });

  // Critério 4: Visual AI
  const hasVisual = fileMatchesAny(codeFiles, [
    /from\s+['"]@applitools/,
    /from\s+['"]@percy/,
    /from\s+['"]pixelmatch['"]/,
    /from\s+['"]jest-image-snapshot['"]/,
    /Eyes\.|toMatchImageSnapshot/,
  ]);
  criteria.push({
    id: 'visual-ai',
    description: 'Visual AI integrado (Applitools, Percy ou pixelmatch)',
    weight: 2,
    earned: hasVisual ? 2 : 0,
    publicNote: hasVisual ? 'Lib visual detectada' : 'Nenhuma lib de visual diff encontrada',
  });

  // Critério 5: relatório crítico
  const mdFiles = findFiles(args.entrega, ['.md']);
  const reportFiles = mdFiles.filter((f) => /relatorio|report|critico|analise/i.test(f));
  const reportLengths = reportFiles
    .map((f) => readFileSafe(f) ?? '')
    .map((c) => c.length);
  const longestReport = reportLengths.length > 0 ? Math.max(...reportLengths) : 0;
  const reportOk = longestReport >= 800;
  criteria.push({
    id: 'critical-report',
    description: 'Relatório crítico (≥ 800 chars / ~3pgs)',
    weight: 3,
    earned: reportOk ? 3 : reportFiles.length > 0 ? 1 : 0,
    publicNote: reportOk
      ? `Relatório com ${longestReport} chars`
      : reportFiles.length > 0
        ? `Relatório encontrado mas curto (${longestReport} chars)`
        : 'Relatório não encontrado (esperado *relatorio*.md ou *report*.md)',
  });

  // Critério 6: README
  const readme = findReadme(args.entrega);
  criteria.push({
    id: 'readme',
    description: 'README explicando arquitetura do pipeline',
    weight: 1,
    earned: readme ? 1 : 0,
    publicNote: readme ? 'README encontrado' : 'README ausente',
  });

  const { total, score } = computeScore(criteria);
  const minimo = passThreshold(total, 60);
  const { publicBreakdown, privateBreakdown } = buildBreakdowns(criteria);

  const result: GradeResult = {
    atividade: 'QA-M5-IA-Pipeline',
    total,
    score: +score.toFixed(2),
    minimo,
    pass: score >= minimo,
    criteria,
    publicBreakdown,
    privateBreakdown,
    metadata: {
      studentLogin: args.studentLogin,
      entregaPath: args.entrega,
      timestamp: new Date().toISOString(),
      commitSha: args.commitSha,
    },
  };

  writeFileSync(args.output, JSON.stringify(result, null, 2));
  console.log(`Grade: ${result.score}/${result.total} (min ${result.minimo}) — ${result.pass ? 'PASS' : 'FAIL'}`);
  process.exit(result.pass ? 0 : 1);
}

main().catch((e) => {
  console.error('Validator error:', e);
  process.exit(2);
});
