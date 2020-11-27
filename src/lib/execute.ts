import path from 'path';
import spawn from 'cross-spawn';
import type { SpawnOptions } from 'child_process';
import chalk from 'chalk';
import { cwdWithTrailingSlash } from './cwd';

// Inspired by https://github.com/seek-oss/sku/blob/master/lib/runBin.js

const resolveBin = (packageName: string, binName?: string): string => {
  // We specifically want to use Node's require(...) machinery here
  // eslint-disable-next-line @typescript-eslint/no-var-requires
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

export const logCommand = (
  executableName: string,
  args?: readonly string[]
) => {
  let logCommand = `$ ${executableName}`;
  if (args && args.length > 0) {
    logCommand += ` ${args.join(' ')}`;
  }
  logCommand = logCommand.split(cwdWithTrailingSlash()).join('');
  console.log(chalk.dim(logCommand));
};

export const runBin = ({
  packageName,
  binName,
  args,
  options,
}: ExecuteBinOptions) => {
  const resolvedBin = resolveBin(packageName, binName);
  logCommand(resolvedBin, args);
  return spawnPromise(resolvedBin, args, { stdio: 'inherit', ...options });
};
