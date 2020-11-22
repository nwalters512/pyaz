import fs from 'fs-extra';
import path from 'path';
import dedent from 'dedent';

import { resolveInCwd } from './cwd';
import { runBin } from './execute';
import { makeJestConfig } from '../config/jest';
import { formatFile } from './prettier';
import chalk from 'chalk';

export const ensureConfigFile = async () => {
  const jestConfigPath = resolveInCwd('jest.config.js');

  const jestConfig = makeJestConfig();
  const configFileContents = dedent`
  /**
   * This file is managed automatically by pyaz.
   * Do not edit this file directly.
   */

  module.exports = ${JSON.stringify(jestConfig)};
  `;
  const formattedConfigFile = formatFile('jest.config.js', configFileContents);
  await fs.writeFile(jestConfigPath, formattedConfigFile);
  console.log(chalk.dim('Wrote Jest config to jest.config.js'));
};

export const runJest = async (args: readonly string[]) => {
  await ensureConfigFile();
  await runBin({
    packageName: 'jest',
    args,
    options: {
      stdio: 'inherit',
    },
  });
};
