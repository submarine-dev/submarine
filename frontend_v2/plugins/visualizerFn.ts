import { exec } from 'node:child_process';
import { log } from 'node:console';
import { resolve } from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';

const fileName = 'stats.html';

/**
 * バンドルサイズを示したstats.htmlを生成するプラグインのラッパー
 */
const visualizerFn = (isEnableAnalyze: boolean): [] | Plugin => {
  if (!isEnableAnalyze) return [];
  const barStr = '-'.repeat(32);
  log(`\n${barStr}\n[BundleSizeVisualizePlugin]\nWrite to status.html✅\n${barStr}\n`);

  const rootPath = process.cwd();
  exec(`open ${resolve(rootPath, fileName)}`);

  return visualizer();
};

export default visualizerFn;
