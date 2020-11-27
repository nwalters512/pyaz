import { Command } from '@oclif/command';
import chalk from 'chalk';
import ensureGitignore from 'ensure-gitignore';
import { ensureEslintConfig, ESLINT_CONFIG_FILE_PATH } from '../config/eslint';
import { ensureJestConfig, JEST_CONFIG_FILE_PATH } from '../config/jest';
import {
  ensurePrettierConfig,
  PRETTIER_CONFIG_FILE_PATH,
} from '../config/prettier';
import { resolveInCwd } from '../lib/cwd';

export default class Setup extends Command {
  static description = 'Generate and update config files';

  async run() {
    console.log(chalk.blue('Setting things up...'));

    const lintIgnorePatterns = ['/lib', '/dist', '/node_modules'];
    const gitIgnorePatterns = [...lintIgnorePatterns];

    // Write ESLint config
    await ensureEslintConfig();
    gitIgnorePatterns.push(ESLINT_CONFIG_FILE_PATH);

    // Write `.eslintignore`
    await ensureGitignore({
      patterns: lintIgnorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.eslintignore'),
    });

    // Write Prettier config
    await ensurePrettierConfig();
    gitIgnorePatterns.push(PRETTIER_CONFIG_FILE_PATH);

    // Write `.prettierignore`
    await ensureGitignore({
      patterns: lintIgnorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.prettierignore'),
    });

    // Generate Jest config
    await ensureJestConfig();
    gitIgnorePatterns.push(JEST_CONFIG_FILE_PATH);

    // Write `.gitignore`
    await ensureGitignore({
      patterns: gitIgnorePatterns,
      comment: 'managed by pyaz',
      filepath: resolveInCwd('.gitignore'),
    });

    console.log(chalk.blue('Setup completed'));
  }
}
