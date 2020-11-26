import { Command } from '@oclif/command';
import chalk from 'chalk';
import { runEslint } from '../lib/eslint';
import { runPrettier } from '../lib/prettier';

export default class Format extends Command {
  static description = 'Fix problems with code';

  static args = [{ name: 'file' }];

  // Allows a variable amount of arguments
  static strict = false;

  async run() {
    const { argv } = this.parse(Format);
    console.log(chalk.blue('Formatting...'));
    await runPrettier({ fix: true, paths: argv });
    await runEslint({ fix: true, paths: argv });
    console.log(chalk.blue('Formatting completed'));
  }
}
