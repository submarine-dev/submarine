import { exec } from 'child_process';
import { log } from 'console';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { Plugin } from 'vite';

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
