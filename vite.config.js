import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ['all']
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT) || 4321,
    allowedHosts: ['all']
  }
});