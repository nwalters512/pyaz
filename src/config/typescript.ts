import globby from 'globby';
import path from 'path';

import { ensureJsonConfigFile } from './lib';
import { loadPyazConfig } from './pyaz';

export const TYPESCRIPT_CONFIG_FILE_PATH = 'tsconfig.json';
export const TYPESCRIPT_BUILD_CONFIG_FILE_PATH = 'tsconfig.build.json';

export const makeBaseCompilerOptions = () => ({
  allowSyntheticDefaultImports: true,
  downlevelIteration: true,
  esModuleInterop: true,
  isolatedModules: true,
  noUnusedLocals: true,
  resolveJsonModule: true,
  strict: true,
});

export const makeTypeScriptConfig = async () => {
  const pyazConfig = await loadPyazConfig();
  const pyazIgnores = pyazConfig?.ignore ?? [];

  // This config should include all TypeScript files, not just those in `src/`.
  const typeScriptFiles = await globby('**/*.{ts,tsx}', { gitignore: true });
  const typeScriptDirs = [
    ...new Set(
      typeScriptFiles.map((file) => {
        const components = file.split(path.sep);
        if (components.length === 1) {
          // Just a file - no need for a glob
          return components[0];
        }
        // This corresponds to a directory - include all files underneath it.
        return `${components[0]}/**/*`;
      })
    ),
  ];

  return {
    compilerOptions: {
      ...makeBaseCompilerOptions(),
    },
    include: typeScriptDirs,
    exclude: ['node_modules', ...pyazIgnores],
  };
};

export const makeTypeScriptBuildConfig = async () => {
  return {
    compilerOptions: {
      ...makeBaseCompilerOptions(),
      declaration: true,
      emitDeclarationOnly: true,
      rootDir: 'src',
      outDir: 'dist',
    },
    include: ['src/'],
    exclude: ['/node_modules'],
  };
};

export const ensureTypeScriptConfig = async () => {
  // This config file will be used during linting and will also be picked up by
  // the editor. It includes all TypeScript files in the project, even those
  // that won't be transpiled into built output. This ensures that things like
  // local utility scripts get typechecked and linted correctly.
  await ensureJsonConfigFile({
    filepath: TYPESCRIPT_CONFIG_FILE_PATH,
    config: await makeTypeScriptConfig(),
  });

  // This config file is used solely for generating `.d.ts` files during build. It
  // does not include any files that won't be transpiled by Babel/esbuild.
  await ensureJsonConfigFile({
    filepath: TYPESCRIPT_BUILD_CONFIG_FILE_PATH,
    config: await makeTypeScriptBuildConfig(),
  });
};
