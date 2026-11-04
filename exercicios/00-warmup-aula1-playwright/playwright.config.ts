import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Snapshot estável do arngren.net via Wayback Machine — o site real
    // cai com frequência (aconteceu ao vivo na Aula 1, 24/09). Mesmo
    // HTML, sem depender do site estar no ar durante a aula.
    baseURL: 'http://web.archive.org/web/20260826200139if_/http://www.arngren.net/',
    trace: 'retain-on-failure',
  },
});
