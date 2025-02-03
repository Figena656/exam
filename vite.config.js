import { defineConfig } from 'vite';

const port = 8080;

export default defineConfig({
  server: {
    host: true,
    port,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  cacheDir: '/var/tmp/.vite',
  plugins: [],
});
