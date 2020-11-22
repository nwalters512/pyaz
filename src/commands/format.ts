import { Command, flags } from '@oclif/command';
import { runPrettier } from '../lib/prettier';

export default class Format extends Command {
  static description = 'Fix problems with code';

  async run() {
    await runPrettier({ fix: true });
  }
}
