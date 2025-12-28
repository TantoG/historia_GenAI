import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Tokens_didacticos_INICIAL/',
  server: {
    port: 3000,
    host: true,
  },
});
