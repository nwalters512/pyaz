import path from 'path';

import { getCompiledFilePath } from '../../lib/files';
import { ensureJsConfigFile } from '../lib';

export const makeJestConfig = () => {
  return {
    testMatch: ['**/*.test.{[tj]s?(x),mjs}'],
    testPathIgnorePatterns: [
      '/node_modules/',
      '<rootDir>/dist/',
      '<rootDir>/lib/',
    ],
    prettierPath: require.resolve('prettier'),
    transform: {
      '\\.(js|jsx|ts|tsx|mjs)$': getCompiledFilePath(
        path.join('config', 'jest', 'transformer.js')
      ),
    },
  };
};

export const ensureJestConfig = async (): Promise<string> => {
  return await ensureJsConfigFile({
    filepath: 'jest.config.js',
    config: makeJestConfig(),
  });
};
