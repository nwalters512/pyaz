import { Command } from '@oclif/command';

import { runJest } from '../lib/jest';

export default class Test extends Command {
  static description = 'Run unit and integration tests';

  static args = [{ name: 'file' }];

  // Allows a variable amount of arguments
  static strict = false;

  async run() {
    const { argv } = this.parse(Test);

    await runJest(argv);
  }
}
