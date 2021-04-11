import chalk from 'chalk';
import esbuild from 'esbuild';
import fs from 'fs-extra';
import globby from 'globby';

import { TYPESCRIPT_BUILD_CONFIG_FILE_PATH } from '../config/typescript';
import { resolveInCwd } from '../lib/cwd';
import { runTypeScript } from '../lib/typescript';

export default async () => {
  console.log(chalk.blue('Building...'));

  // Clear the destination dir
  await fs.remove(resolveInCwd('dist'));
  console.log(chalk.green('Removed dist directory'));

  // Generate type declarations with TypeScript
  await runTypeScript({ configPath: TYPESCRIPT_BUILD_CONFIG_FILE_PATH });
  console.log(chalk.green('Generated TypeScript declarations'));

  const files = await globby('src/**/*.{js,ts}');
  await esbuild.build({
    entryPoints: files,
    format: 'cjs',
    target: 'es2015',
    outdir: 'dist',
  });
  console.log(chalk.green('Transpiled source files with esbuild'));

  console.log(chalk.blue('Building completed'));
};
