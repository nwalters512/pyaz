import type { Linter } from 'eslint';
import path from 'path';

import { ensureJsConfigFile } from './lib';

const OFF = 'off';

export const ESLINT_CONFIG_FILE_PATH = '.eslintrc.js';

export const makeEslintConfig = (): Linter.Config => ({
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': OFF,
  },
});

export const ensureEslintConfig = async () => {
  const eslintPatchPath = require.resolve(
    '@rushstack/eslint-patch/modern-module-resolution',
    {
      paths: [path.resolve(__dirname, '..', '..')],
    }
  );
  await ensureJsConfigFile({
    filepath: ESLINT_CONFIG_FILE_PATH,
    // Enables https://github.com/microsoft/rushstack/tree/master/stack/eslint-patch
    preamble: `require('${eslintPatchPath}');`,
    config: makeEslintConfig(),
  });
};
