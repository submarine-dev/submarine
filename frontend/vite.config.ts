import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    strictPort: true,
    port: 3000,
  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    global: 'window',
  },
  plugins: [react()],
});
