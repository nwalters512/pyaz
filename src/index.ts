import { Command } from 'commander';

import lint from './commands/lint';

const program = new Command();

program
  .command('lint')
  .description('Check code for formatting errors and best practices')
  .action(lint);

program.parse(process.argv);
