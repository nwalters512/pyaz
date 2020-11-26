import { Command } from '@oclif/command';
import chalk from 'chalk';
import ensureGitignore from 'ensure-gitignore';
import { resolveInCwd } from '../lib/cwd';

export default class Setup extends Command {
  static description = 'Generate and update config files';

  async run() {
    console.log(chalk.blue('Setting things up...'));

    const ignorePatterns = ['/lib', '/dist', '/node_modules'];

    // Write `.gitignore`
    await ensureGitignore({
      patterns: ignorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.gitignore'),
    });

    // Write `.eslintignore`
    await ensureGitignore({
      patterns: ignorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.eslintignore'),
    });

    // Write `.prettierignore`
    await ensureGitignore({
      patterns: ignorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.prettierignore'),
    });

    console.log(chalk.blue('Setup completed'));
  }
}
