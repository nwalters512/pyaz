import chalk from 'chalk';
import fs from 'fs-extra';

import { TYPESCRIPT_BUILD_CONFIG_FILE_PATH } from '../config/typescript';
import { resolveInCwd } from '../lib/cwd';
import { runTypeScript } from '../lib/typescript';

export default async () => {
  console.log(chalk.blue('Building...'));

  // Clear the destination dir
  await fs.remove(resolveInCwd('dist'));

  // Compile files with TypeScript
  await runTypeScript({ configPath: TYPESCRIPT_BUILD_CONFIG_FILE_PATH });

  console.log(chalk.blue('Building completed'));
};
