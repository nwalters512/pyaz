import chalk from 'chalk';
import { runPrettier } from '../lib/prettier';
import { runEslint } from '../lib/eslint';

export default async (args: string[]) => {
  console.log(chalk.blue('Linting...'));
  // TODO: support specific paths?
  await runPrettier({});
  await runEslint({});
  console.log(chalk.blue('Linting complete'));
};
