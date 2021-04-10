import { Command } from '@oclif/command';
import chalk from 'chalk';
import { runPrettier } from '../lib/prettier';
import { runEslint } from '../lib/eslint';

export default class Lint extends Command {
  static description = 'Check code for formatting errors and best practices';

  static args = [{ name: 'file' }];

  // Allows a variable amount of arguments
  static strict = false;

  async run() {
    const { argv } = this.parse(Lint);
    console.log(chalk.blue('Linting...'));
    await runPrettier({ paths: argv });
    await runEslint({ paths: argv });
    console.log(chalk.blue('Linting complete'));
  }
}
