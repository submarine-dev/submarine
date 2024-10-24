import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import visualizerFn from './plugins/visualizerFn';
import writeBuiltTimePlugin from './plugins/writeBuiltTimePlugin';

const buildDir = 'dist';

export default defineConfig(() => {
  const script = process.env.npm_lifecycle_event ?? '';
  const isEnableAnalyze = script.includes('analyze');

  return {
    build: {
      outDir: buildDir,
    },
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
    plugins: [
      react({ jsxImportSource: '@emotion/react' }),
      writeBuiltTimePlugin(buildDir),
      visualizerFn(isEnableAnalyze),
    ],
  };
});
