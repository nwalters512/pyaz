import path from 'path';

import { getCompiledFilePath } from '../../lib/files';

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
