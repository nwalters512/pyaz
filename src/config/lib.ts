import chalk from 'chalk';
import dedent from 'dedent';
import fs from 'fs-extra';

import { resolveInCwd } from '../lib/cwd';
import { formatFile } from '../lib/prettier';

export interface EnsureConfigFileOptions {
  filepath: string;
  config: unknown;
  /**
   * Allows you to place arbitrary JavaScript at the top of the file. Mostly
   * useful for adding imports.
   */
  preamble?: string;
}

export const ensureJsConfigFile = async ({
  filepath,
  preamble = '',
  config,
}: EnsureConfigFileOptions) => {
  const configFilePath = resolveInCwd(filepath);

  const configFileContents = dedent`
  /** This file is managed by pyaz. Changes will be discarded. */

  ${preamble}

  module.exports = ${JSON.stringify(config, null, 2)};
  `;
  const formattedConfigFile = formatFile(filepath, configFileContents);
  await fs.writeFile(configFilePath, formattedConfigFile);
  console.log(chalk.dim(`Wrote config to ${filepath}`));
};

export const ensureJsonConfigFile = async ({
  filepath,
  config,
}: EnsureConfigFileOptions) => {
  const configFilePath = resolveInCwd(filepath);

  const configFileContents = dedent`
  /** This file is managed by pyaz. Changes will be discarded. */

  ${JSON.stringify(config, null, 2)}
  `;
  const formattedConfigFile = formatFile(filepath, configFileContents);
  await fs.writeFile(configFilePath, formattedConfigFile);
  console.log(chalk.dim(`Wrote config to ${filepath}`));
};
