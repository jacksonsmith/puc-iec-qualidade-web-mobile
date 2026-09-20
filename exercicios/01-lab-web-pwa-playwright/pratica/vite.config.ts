import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  resolve: {
    // espelha o paths do tsconfig — @/ = src/
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'CineFav — filmes favoritos',
        short_name: 'CineFav',
        description: 'Catálogo de filmes com favoritos — funciona offline',
        theme_color: '#003366',
        background_color: '#0b1220',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        // O catálogo vem de /api/movies.json (arquivo estático servido junto com o app).
        // NetworkFirst: online busca a versão fresca; offline cai no cache.
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*\.json/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'cinefav-api',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
        ],
      },
    }),
  ],
});
