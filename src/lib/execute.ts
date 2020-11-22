import path from 'path';
import spawn from 'cross-spawn';
import type { SpawnOptions } from 'child_process';

// Inspired by https://github.com/seek-oss/sku/blob/master/lib/runBin.js

const resolveBin = (packageName: string, binName?: string): string => {
  const packageJson = require(`${packageName}/package.json`);
  const binPath =
    typeof packageJson.bin === 'string'
      ? packageJson.bin
      : packageJson.bin[binName || packageName];

  return require.resolve(path.join(packageName, binPath));
};

const spawnPromise = (
  commandPath: string,
  args?: readonly string[],
  options?: SpawnOptions
) => {
  const childProcess = spawn(commandPath, args, options);

  return new Promise((resolve, reject) => {
    childProcess.on('exit', (exitCode) => {
      if (exitCode === 0) {
        resolve(exitCode);
        return;
      }
      reject(exitCode);
    });
  });
};

interface ExecuteBinOptions {
  packageName: string;
  binName?: string;
  args?: readonly string[];
  options?: SpawnOptions;
}

export const runBin = ({
  packageName,
  binName,
  args,
  options,
}: ExecuteBinOptions) =>
  spawnPromise(resolveBin(packageName, binName), args, options);
