import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import { runPrettier } from '../lib/prettier';

export default class Format extends Command {
  static description = 'Fix problems with code';

  async run() {
    console.log(chalk.cyan('Formatting'));
    await runPrettier({ fix: true });
    console.log(chalk.cyan('Formatting completed'));
  }
}
