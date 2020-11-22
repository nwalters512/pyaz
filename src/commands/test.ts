import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import * as jest from 'jest';

import jestConfig from '../../config/jest';
import { ensureConfigFile } from '../lib/jest';

export default class Test extends Command {
  static description = 'Run unit and integration tests';

  static args = [{ name: 'file' }];

  // Allows a variable amount of arguments
  static strict = false;

  async run() {
    const { argv } = this.parse(Test);

    // Ensure `jest.config.js` file is up-to-date
    await ensureConfigFile();

    // Now execute Jest
    const args = ['--config', JSON.stringify(jestConfig), ...argv];
    console.log(args);
    jest.run(args);
  }
}
