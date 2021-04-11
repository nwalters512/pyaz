import chalk from 'chalk';
import ensureGitignore from 'ensure-gitignore';

import { ensureEslintConfig, ESLINT_CONFIG_FILE_PATH } from '../config/eslint';
import { ensureJestConfig, JEST_CONFIG_FILE_PATH } from '../config/jest';
import {
  ensurePrettierConfig,
  PRETTIER_CONFIG_FILE_PATH,
} from '../config/prettier';
import { loadPyazConfig } from '../config/pyaz';
import {
  ensureTypeScriptConfig,
  TYPESCRIPT_BUILD_CONFIG_FILE_PATH,
  TYPESCRIPT_CONFIG_FILE_PATH,
} from '../config/typescript';
import { resolveInCwd, resolveInCwdWithLeadingSlash } from '../lib/cwd';

export default async () => {
  console.log(chalk.blue('Setting things up...'));

  const config = await loadPyazConfig();

  const lintIgnorePatterns = [
    '/lib',
    '/dist',
    '/node_modules',
    resolveInCwdWithLeadingSlash(ESLINT_CONFIG_FILE_PATH),
    resolveInCwdWithLeadingSlash(JEST_CONFIG_FILE_PATH),
    resolveInCwdWithLeadingSlash(PRETTIER_CONFIG_FILE_PATH),
    ...(config.ignore || []),
  ];
  const gitIgnorePatterns = [
    ...lintIgnorePatterns,
    ESLINT_CONFIG_FILE_PATH,
    JEST_CONFIG_FILE_PATH,
    PRETTIER_CONFIG_FILE_PATH,
    TYPESCRIPT_BUILD_CONFIG_FILE_PATH,
    TYPESCRIPT_CONFIG_FILE_PATH,
  ];

  // Write `.gitignore`
  await ensureGitignore({
    patterns: gitIgnorePatterns,
    comment: 'managed by pyaz',
    filepath: resolveInCwd('.gitignore'),
  });

  // Write TypeScript config
  await ensureTypeScriptConfig();

  // Write ESLint config
  await ensureEslintConfig();

  // Write `.eslintignore`
  await ensureGitignore({
    patterns: lintIgnorePatterns,
    comment: 'managed by pyaz',
    filepath: resolveInCwd('.eslintignore'),
  });

  // Write Prettier config
  await ensurePrettierConfig();

  // Write `.prettierignore`
  await ensureGitignore({
    patterns: lintIgnorePatterns,
    comment: 'managed by pyaz',
    filepath: resolveInCwd('.prettierignore'),
  });

  // Write Jest config
  await ensureJestConfig();

  console.log(chalk.blue('Setup completed'));
};
