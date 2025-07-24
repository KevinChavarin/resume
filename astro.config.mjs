// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
  },
  integrations: [react()],
  output: 'static',
  server: {
    host: '0.0.0.0', // Permite conexiones externas
    port: Number(process.env.PORT) || 4321,
  },
});