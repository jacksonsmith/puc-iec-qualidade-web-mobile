#!/usr/bin/env node
// Liga/desliga uma regressão de performance SINTÉTICA E DIDÁTICA no startup do app Android.
//
// Isso NÃO é um achado real (diferente do `allowBackup` do lab de security, que é um bug de
// verdade no app). É uma demo controlada — insere um delay artificial no boot pra vocês
// sentirem, com número real medido, o que uma regressão de cold start parece na prática.
//
// Uso:
//   node scripts/toggle-perf-regression.js        # liga (ou desliga, se já estiver ligada)
//   node scripts/toggle-perf-regression.js status  # só mostra se está ligada ou não, sem mexer

const fs = require('fs');
const path = require('path');

const FILE = path.join(
  __dirname,
  '..',
  'android/app/src/main/java/com/puciec/cinefav/MainApplication.kt'
);

const MARKER_START = '    // PERF-DEMO-START — regressão sintética didática, NÃO é achado real';
const MARKER_END = '    // PERF-DEMO-END';
const INJECTED = `${MARKER_START}\n    Thread.sleep(1500)\n${MARKER_END}`;
const ANCHOR = '    super.onCreate()';

function main() {
  const mode = process.argv[2];
  const content = fs.readFileSync(FILE, 'utf8');
  const isActive = content.includes('PERF-DEMO-START');

  if (mode === 'status') {
    console.log(isActive ? '🔴 Regressão ATIVA (delay de 1500ms no onCreate)' : '🟢 App normal (sem regressão)');
    return;
  }

  if (isActive) {
    const lines = content.split('\n');
    const startIdx = lines.findIndex((l) => l.includes('PERF-DEMO-START'));
    const endIdx = lines.findIndex((l) => l.includes('PERF-DEMO-END'));
    if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
      console.error('Não consegui achar os marcadores direito — edite o arquivo na mão e remova as linhas PERF-DEMO-*.');
      process.exit(1);
    }
    lines.splice(startIdx, endIdx - startIdx + 1);
    fs.writeFileSync(FILE, lines.join('\n'));
    console.log('🟢 Regressão REMOVIDA. Rebuild (./gradlew assembleDebug) + reinstale pra medir o startup normal de novo.');
  } else {
    if (!content.includes(ANCHOR)) {
      console.error(`Não achei "${ANCHOR.trim()}" no arquivo — pode ter mudado de nome. Edite manualmente.`);
      process.exit(1);
    }
    const patched = content.replace(ANCHOR, `${ANCHOR}\n${INJECTED}`);
    fs.writeFileSync(FILE, patched);
    console.log('🔴 Regressão APLICADA (delay de 1500ms no onCreate). Rebuild + reinstale pra medir o cold start piorado.');
  }
}

main();
