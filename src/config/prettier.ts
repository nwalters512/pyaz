import { ensureJsConfigFile } from './lib';

export const makePrettierConfig = () => ({
  singleQuote: true,
});

export const ensurePrettierConfig = async (): Promise<string> => {
  return await ensureJsConfigFile({
    filepath: '.prettierrc..js',
    config: makePrettierConfig(),
  });
};
