import { ensureTypeScriptConfig } from '../config/typescript';
import { runBin } from './execute';

interface RunTypeScriptOptions {
  noEmit?: boolean;
  configPath?: string;
}

export const runTypeScript = async ({
  noEmit,
  configPath,
}: RunTypeScriptOptions = {}) => {
  const args = [];

  if (noEmit) {
    args.push('--noEmit');
  }

  if (configPath) {
    args.push('-p', configPath);
  }

  await ensureTypeScriptConfig();
  await runBin({
    packageName: 'typescript',
    binName: 'tsc',
    args,
  });
};
