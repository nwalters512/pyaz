import chalk from 'chalk';
import { runPrettier } from '../lib/prettier';
import { runEslint } from '../lib/eslint';
import { runTypeScript } from '../lib/typescript';

export default async () => {
  console.log(chalk.blue('Linting...'));

  // TODO: support specific paths?
  await runPrettier();
  await runEslint();
  await runTypeScript({ noEmit: true });

  console.log(chalk.blue('Linting complete'));
};
