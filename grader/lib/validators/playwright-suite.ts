/**
 * Validator — M2 Lab Playwright SPA (QA EAD).
 *
 * Critérios (15 pts total):
 *   1. playwright.config.{ts,js} presente                            — 2pts
 *   2. Mín 5 arquivos *.spec.{ts,js} ou *.test.{ts,js}               — 4pts
 *   3. Locators recomendados (getByRole/getByText/getByTestId)       — 3pts
 *   4. storageState configurado (auth reuse)                          — 2pts
 *   5. Visual regression (toHaveScreenshot)                           — 2pts
 *   6. CI workflow (.github/workflows/*.yml com playwright)           — 2pts
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
  const configCandidates = ['playwright.config.ts', 'playwright.config.js', 'playwright.config.mjs'];
  const configPath = configCandidates.map((c) => join(args.entrega, c)).find(existsSync);
  criteria.push({
    id: 'playwright-config',
    description: 'playwright.config.{ts,js} presente',
    weight: 2,
    earned: configPath ? 2 : 0,
    publicNote: configPath ? 'Config encontrada' : 'playwright.config não encontrado',
  });

  // Critério 2: testes
  const testFiles = findFiles(args.entrega, ['.spec.ts', '.spec.js', '.test.ts', '.test.js']);
  const minTests = 5;
  criteria.push({
    id: 'min-tests',
    description: `Mín ${minTests} arquivos de teste *.spec/test.{ts,js}`,
    weight: 4,
    earned: testFiles.length >= minTests ? 4 : +(testFiles.length / minTests * 4).toFixed(2),
    publicNote: `${testFiles.length}/${minTests} arquivos de teste encontrados`,
  });

  // Critério 3: locators recomendados
  const allCode = [...testFiles, ...(configPath ? [configPath] : [])];
  const usesRecommended = fileMatchesAny(allCode, [
    /getByRole\s*\(/,
    /getByText\s*\(/,
    /getByTestId\s*\(/,
    /getByLabel\s*\(/,
    /getByPlaceholder\s*\(/,
  ]);
  criteria.push({
    id: 'locators',
    description: 'Locators recomendados (role/text/test-id)',
    weight: 3,
    earned: usesRecommended ? 3 : 0,
    publicNote: usesRecommended ? 'Locators recomendados detectados' : 'Use getByRole/getByText/getByTestId em vez de seletores CSS',
  });

  // Critério 4: storageState
  const usesStorageState = fileMatchesAny(allCode, [
    /storageState\s*:/,
    /storageState\s*\(/,
  ]);
  criteria.push({
    id: 'storage-state',
    description: 'storageState configurado (auth state reuse)',
    weight: 2,
    earned: usesStorageState ? 2 : 0,
    publicNote: usesStorageState ? 'storageState detectado' : 'Não encontrei storageState',
  });

  // Critério 5: visual regression
  const usesVisualRegression = fileMatchesAny(allCode, [
    /toHaveScreenshot\s*\(/,
    /\.snapshot\(/,
  ]);
  criteria.push({
    id: 'visual-regression',
    description: 'Visual regression nativo (toHaveScreenshot)',
    weight: 2,
    earned: usesVisualRegression ? 2 : 0,
    publicNote: usesVisualRegression ? 'toHaveScreenshot detectado' : 'Não encontrei visual regression',
  });

  // Critério 6: CI workflow com Playwright (não basta existir pasta .github)
  const ciFiles = findFiles(join(args.entrega, '.github'), ['.yml', '.yaml']);
  const ciHasPlaywright = fileMatchesAny(ciFiles, [/playwright|@playwright/i]);
  criteria.push({
    id: 'ci-workflow',
    description: 'CI workflow GitHub Actions executando Playwright',
    weight: 2,
    earned: ciHasPlaywright ? 2 : 0,
    publicNote: ciHasPlaywright ? 'Workflow Playwright detectado' : 'Workflow GitHub Actions com Playwright não encontrado',
  });

  const { total, score } = computeScore(criteria);
  const minimo = passThreshold(total, 60);
  const { publicBreakdown, privateBreakdown } = buildBreakdowns(criteria);

  const result: GradeResult = {
    atividade: 'QA-M2-Playwright-SPA',
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
