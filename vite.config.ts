import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
import content from './scripts/vite-plugin-content.js';

export default defineConfig({
  // GitHub Pages serves the app from /<repo-name>/; the deploy workflow sets BASE_PATH.
  base: process.env.BASE_PATH ?? '/',
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
  build: { chunkSizeWarningLimit: 40 * 1024 },
  plugins: [
    preact(),
    content(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Research Review',
        short_name: 'Review',
        description: 'Flashcards, quizzes and short articles for retaining what I learn during research.',
        theme_color: '#3346d3',
        background_color: '#f7f7f5',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        scope: '.',
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // KaTeX ships woff/ttf fallbacks too; modern browsers only need woff2.
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        // All notes ship inside the JS bundle (~80 KB per note before gzip, mostly KaTeX markup).
        maximumFileSizeToCacheInBytes: 40 * 1024 * 1024,
      },
    }),
  ],
});
