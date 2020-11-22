import path from 'path';

import { runBin } from './execute';
import { resolveIgnoreFile } from './ignore';

const DEFAULT_PATHS = '**/*.{js,ts,jsx,tsx,md,less,css}';
const PRETTIER_CONFIG_PATH = path.resolve(
  __dirname,
  '..',
  '..',
  'config',
  'prettier.js'
);

interface RunPrettierOptions {
  fix?: boolean;
  check?: boolean;
  paths?: string[];
}

export const runPrettier = async ({
  fix = false,
  paths: pathsOption = [],
}: RunPrettierOptions) => {
  const paths = pathsOption && pathsOption.length ? pathsOption : DEFAULT_PATHS;

  const args = ['--config', PRETTIER_CONFIG_PATH];

  if (fix) {
    args.push('--write');
  } else {
    args.push('--check');
  }

  const ignoreFile = await resolveIgnoreFile('.prettierignore');
  if (ignoreFile) {
    args.push('--ignore-path', ignoreFile);
  }

  args.push(...paths);

  await runBin({
    packageName: 'prettier',
    args,
  });
};
