import { Command } from 'commander';

import build from './commands/build';
import format from './commands/format';
import lint from './commands/lint';
import setup from './commands/setup';
import test from './commands/test';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleErrors = (func: () => Promise<any>) => () =>
  func().catch((err) => {
    console.error(err);
    process.exit(1);
  });

const program = new Command();

program.command('build').description('Build source files').action(build);

program
  .command('format')
  .description('Automatically reformat code')
  .action(handleErrors(format));

program
  .command('lint')
  .description('Check code for formatting errors and best practices')
  .action(handleErrors(lint));

program
  .command('setup')
  .description('Generate and update config files')
  .action(handleErrors(setup));

program.command('test').description('').action(handleErrors(test));

program.parse(process.argv);
