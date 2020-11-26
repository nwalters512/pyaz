import fs from 'fs-extra';
import dedent from 'dedent';

import { runBin } from './execute';
import { ensureJestConfig } from '../config/jest';

export const runJest = async (args: readonly string[]) => {
  await ensureJestConfig();
  await runBin({
    packageName: 'jest',
    args,
    options: {
      stdio: 'inherit',
    },
  });
};
