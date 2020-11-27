import { runBin } from './execute';

export const runTypescript = async () => {
  await runBin({
    packageName: 'typescript',
    binName: 'tsc',
  });
};
