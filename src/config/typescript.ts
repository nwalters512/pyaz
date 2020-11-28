import { ensureJsonConfigFile } from './lib';
export const TYPESCRIPT_CONFIG_FILE_PATH = 'tsconfig.json';

export const makeTypescriptConfig = () => {
  return {
    compilerOptions: {
      // Write `.d.ts` files
      declaration: true,

      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      importHelpers: true,
      module: 'commonjs',
      outDir: 'dist',
      noUnusedLocals: true,
      resolveJsonModule: true,
      rootDir: 'src',
      strict: true,
      target: 'ES2017',
    },
    include: ['src/'],
    exclude: ['node_modules/'],
  };
};

export const ensureTypescriptConfig = async () => {
  await ensureJsonConfigFile({
    filepath: TYPESCRIPT_CONFIG_FILE_PATH,
    config: makeTypescriptConfig(),
  });
};
