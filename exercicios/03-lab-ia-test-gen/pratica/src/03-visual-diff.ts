// src/03-visual-diff.ts
// ─────────────────────────────────────────────────────────────────────────────
// ✅ AVALIATIVO — visual diff com pixelmatch (a base "clássica" do Visual AI)
//
//   npm run visual-diff -- baseline.png atual.png
//
// Compara dois screenshots pixel a pixel e reporta o drift. É o que ferramentas
// de Visual AI fazem ANTES da camada de ML — entender o pixel diff puro é
// entender por que ele acende falso positivo com anti-aliasing.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const baselinePath = process.argv[2] ?? 'screenshots/baseline.png';
const currentPath = process.argv[3] ?? 'screenshots/atual.png';

const baseline = PNG.sync.read(readFileSync(baselinePath));
const current = PNG.sync.read(readFileSync(currentPath));

// TODO 1: valide que as dimensões batem (width/height) — se não batem,
//         imprima as duas e encerre com erro (comparar tamanhos diferentes
//         é o 1º falso positivo clássico).

// TODO 2: crie o PNG de diff e rode o pixelmatch:
//   const diff = new PNG({ width: baseline.width, height: baseline.height });
//   const changed = pixelmatch(baseline.data, current.data, diff.data,
//     baseline.width, baseline.height, { threshold: 0.1 });
//   (threshold 0.1 = tolerância perceptual por pixel — experimente 0 e veja
//    o anti-aliasing acender!)

// TODO 3: calcule o drift percentual: changed / (width * height) * 100
//         e imprima com 2 casas. Grave o diff: writeFileSync('diff.png', PNG.sync.write(diff))

// TODO 4: política de gate — drift > 1% → process.exitCode = 1 (falha o CI).
//         Abaixo disso, passa. Justifique o 1% no seu relatório: por que não 0?

console.log('Complete os TODOs deste arquivo — veja o screencast da aula.');
