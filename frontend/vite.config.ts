import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['src/scss'],
      },
    },
  },
  server: {
    proxy: {
      // Проксируем API на NestJS-бэкенд
      '/api/afisha': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // Проксируем статику с афишей
      '/content/afisha': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

