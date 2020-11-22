import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import { runPrettier } from '../lib/prettier';

export default class Format extends Command {
  static description = 'Fix problems with code';

  static args = [{ name: 'file' }];

  // Allows a variable amount of arguments
  static strict = false;

  async run() {
    const { argv } = this.parse(Format);
    console.log(chalk.cyan('Formatting'));
    await runPrettier({ fix: true, paths: argv });
    console.log(chalk.cyan('Formatting completed'));
  }
}
