import { Command } from 'commander';

import build from './commands/build';
import format from './commands/format';
import lint from './commands/lint';
import setup from './commands/setup';
import test from './commands/test';

const program = new Command();

program.command('build').description('Build source files').action(build);

program
  .command('format')
  .description('Automatically reformat code')
  .action(format);

program
  .command('lint')
  .description('Check code for formatting errors and best practices')
  .action(lint);

program
  .command('setup')
  .description('Generate and update config files')
  .action(setup);

program.command('test').description('').action(test);

program.parse(process.argv);
