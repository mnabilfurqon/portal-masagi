import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  ssr: {
    external: ['react', 'react-dom'],
  },
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      // '@common': '/home/masagi/internal-attendance-frontend/src/components/common',
      '@common': '/src/components/common',
    },
  },
});
