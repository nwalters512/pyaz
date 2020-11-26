import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import ensureGitignore from 'ensure-gitignore';
import { resolveInCwd } from '../lib/cwd';

export default class Setup extends Command {
  static description = 'Generate and update config files';

  async run() {
    console.log(chalk.blue('Setting things up...'));

    // Write `.gitignore`
    await ensureGitignore({
      patterns: [],
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.gitignore'),
    });

    const lintingIgnorePatterns = ['/lib', '/dist', '/node_modules'];

    // Write `.eslintignore`
    await ensureGitignore({
      patterns: lintingIgnorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.eslintignore'),
    });

    // Write `.prettierignore`
    await ensureGitignore({
      patterns: lintingIgnorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.prettierignore'),
    });

    console.log(chalk.blue('Setup completed'));
  }
}
