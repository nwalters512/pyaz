import { Command } from '@oclif/command';
import chalk from 'chalk';
import fs from 'fs-extra';
import { resolveInCwd } from '../lib/cwd';

import { runTypescript } from '../lib/typescript';

export default class Build extends Command {
  static description = 'Compiles input files';

  async run() {
    console.log(chalk.blue('Building...'));

    // Clear the destination dir
    await fs.remove(resolveInCwd('dist'));

    // Compile files with TypeScript
    await runTypescript();

    console.log(chalk.blue('Building completed'));
  }
}
