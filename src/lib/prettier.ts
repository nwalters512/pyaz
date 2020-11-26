import chalk from 'chalk';
import dedent from 'dedent';
import fs from 'fs-extra';
import prettier from 'prettier';

import { makePrettierConfig } from '../config/prettier';
import { resolveInCwd } from './cwd';
import { runBin } from './execute';
import { resolveIgnoreFile } from './ignore';

const DEFAULT_PATHS = ['**/*.{js,ts,jsx,tsx,md,less,css}'];

interface RunPrettierOptions {
  fix?: boolean;
  check?: boolean;
  paths?: string[];
}

export const formatFile = (filepath: string, fileContents: string): string => {
  return prettier.format(fileContents, {
    filepath,
    ...makePrettierConfig(),
  });
};

const prettierConfigPath = resolveInCwd('.prettierrc.js');

export const ensureConfigFile = async () => {
  const prettierConfig = makePrettierConfig();
  const configFileContents = dedent`
  /**
   * This file is managed automatically by pyaz.
   * Do not edit this file directly.
   */

  module.exports = ${JSON.stringify(prettierConfig, null, 2)};
  `;
  const formattedConfigFile = formatFile('.prettierrc.js', configFileContents);
  await fs.writeFile(prettierConfigPath, formattedConfigFile);
  console.log(chalk.dim('Wrote Jest config to jest.config.js'));
};

export const runPrettier = async ({
  fix = false,
  paths: pathsOption = [],
}: RunPrettierOptions) => {
  const paths: string[] = pathsOption?.length ? pathsOption : DEFAULT_PATHS;

  await ensureConfigFile();
  const args = ['--config', prettierConfigPath];

  if (fix) {
    args.push('--write');
  } else {
    args.push('--list-different');
  }

  const ignoreFile = await resolveIgnoreFile('.prettierignore');
  if (ignoreFile) {
    args.push('--ignore-path', ignoreFile);
  }

  args.push(...paths);

  try {
    await runBin({
      packageName: 'prettier',
      args,
      options: {
        stdio: 'inherit',
      },
    });
  } catch (exitCode) {
    if (exitCode === 2) {
      console.log(chalk.yellow('No files matched the specified paths'));
    } else {
      // https://prettier.io/docs/en/cli.html#--check
      if (!fix && exitCode === 1) {
        console.error(
          chalk.red('The above file(s) are not formatted correctly')
        );
      } else {
        console.error(
          chalk.red(`Prettier exited with exit code ${chalk.bold(exitCode)}`)
        );
      }
    }
  }
};
