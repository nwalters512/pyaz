import { ensureJsConfigFile } from './lib';

export const PRETTIER_CONFIG_FILE_PATH = '.prettierrc.js';

export const makePrettierConfig = () => ({
  singleQuote: true,
});

export const ensurePrettierConfig = async () => {
  await ensureJsConfigFile({
    filepath: PRETTIER_CONFIG_FILE_PATH,
    config: makePrettierConfig(),
  });
};
