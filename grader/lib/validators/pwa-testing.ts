/**
 * Validator — M3 Lab PWA Testing (QA EAD).
 *
 * Critérios (10 pts total):
 *   1. playwright.config presente                                 — 1pt
 *   2. Testes que usam context.setOffline (offline mode)          — 3pts
 *   3. Testes de Service Worker (intercept fetch ou cache check)  — 3pts
 *   4. Lighthouse CI configurado (lighthouserc.{js,json,yml})     — 3pts
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
import { parseArgs, findFiles, fileMatchesAny } from '../utils.js';

async function main() {
  const args = parseArgs();
  const criteria: GradeCriterion[] = [];

  // Critério 1: playwright.config
  const configCandidates = ['playwright.config.ts', 'playwright.config.js'];
  const configPath = configCandidates.map((c) => join(args.entrega, c)).find(existsSync);
  criteria.push({
    id: 'playwright-config',
    description: 'playwright.config.{ts,js} presente',
    weight: 1,
    earned: configPath ? 1 : 0,
    publicNote: configPath ? 'Config encontrada' : 'Não encontrada',
  });

  const testFiles = findFiles(args.entrega, ['.spec.ts', '.spec.js', '.test.ts', '.test.js']);

  // Critério 2: offline mode
  const usesOffline = fileMatchesAny(testFiles, [
    /setOffline\s*\(\s*true\s*\)/,
    /context\.setOffline/,
  ]);
  criteria.push({
    id: 'offline-mode',
    description: 'Testes de offline mode (context.setOffline)',
    weight: 3,
    earned: usesOffline ? 3 : 0,
    publicNote: usesOffline ? 'setOffline detectado' : 'Não encontrei setOffline em testes',
  });

  // Critério 3: SW testing
  const swTestPatterns = [
    /serviceWorker\.ready/,
    /serviceWorker\.register/,
    /caches\.open/,
    /caches\.match/,
    /['"]install['"].*sw|['"]activate['"].*sw/i,
  ];
  const testsServiceWorker = fileMatchesAny(testFiles, swTestPatterns);
  criteria.push({
    id: 'sw-testing',
    description: 'Testes de Service Worker (lifecycle ou cache)',
    weight: 3,
    earned: testsServiceWorker ? 3 : 0,
    publicNote: testsServiceWorker ? 'Testes de SW detectados' : 'Não encontrei testes de SW',
  });

  // Critério 4: Lighthouse CI
  const lhciCandidates = [
    'lighthouserc.js',
    'lighthouserc.json',
    'lighthouserc.cjs',
    'lighthouserc.yml',
    'lighthouserc.yaml',
    '.lighthouserc.js',
    '.lighthouserc.json',
    '.lighthouserc.yml',
    '.lighthouserc.yaml',
  ];
  const lhciPath = lhciCandidates.map((c) => join(args.entrega, c)).find(existsSync);
  criteria.push({
    id: 'lighthouse-ci',
    description: 'Lighthouse CI configurado',
    weight: 3,
    earned: lhciPath ? 3 : 0,
    publicNote: lhciPath ? 'Lighthouse CI config encontrada' : 'lighthouserc.{js,json,yml} não encontrado',
  });

  const { total, score } = computeScore(criteria);
  const minimo = passThreshold(total, 60);
  const { publicBreakdown, privateBreakdown } = buildBreakdowns(criteria);

  const result: GradeResult = {
    atividade: 'QA-M3-PWA-Testing',
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
