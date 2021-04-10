import chalk from 'chalk';

import { runEslint } from '../lib/eslint';
import { runPrettier } from '../lib/prettier';

export default async () => {
  console.log(chalk.blue('Formatting...'));
  await runPrettier({ fix: true });
  await runEslint({ fix: true });
  console.log(chalk.blue('Formatting completed'));
};
