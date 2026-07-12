import { defineConfig, devices } from '@playwright/test';

// Os testes GERADOS pelo pipeline rodam contra o CineFav Web (lab 02).
// Pré-requisito: ter instalado e buildado o lab 02 antes
//   cd ../../02-lab-web-pwa-playwright/pratica && npm install && npm run build
export default defineConfig({
  testDir: './generated',
  timeout: 30_000,
  reporter: [['json', { outputFile: 'results.json' }], ['list']],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm --prefix ../../02-lab-web-pwa-playwright/pratica run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
