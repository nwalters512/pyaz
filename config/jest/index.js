module.exports = {
  testMatch: ['**/*.test.{[tj]s?(x),mjs}'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/lib/',
  ],
  prettierPath: require.resolve('prettier'),
  transform: {
    '\\.(js|jsx|ts|tsx|mjs)$': require.resolve('./transformer'),
  },
};
