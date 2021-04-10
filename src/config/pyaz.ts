import fs from 'fs-extra';
import { resolveInCwd } from '../lib/cwd';
import tsNode from 'ts-node';

export interface PyazConfig {
  ignore?: string[];
}

export const PYAZ_CONFIG_FILE_PATH = 'pyaz.config.ts';

export const hasPyazConfig = async () => {
  return fs.pathExists(PYAZ_CONFIG_FILE_PATH);
};

export const loadPyazConfig = async (): Promise<PyazConfig> => {
  const cwdPath = resolveInCwd(PYAZ_CONFIG_FILE_PATH);
  if (!(await fs.pathExists(cwdPath))) {
    // No user-provided config exists; we're running in zero-config mode.
    return {};
  }

  // Transpile TS files as they're imported
  const service = tsNode.register();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pyazConfig = require(cwdPath);

  // Disable the register after requiring the config
  service.enabled(false);

  // Handle the case where this is transformed to have a `default` property
  if (pyazConfig.default) return pyazConfig.default;
  return pyazConfig;
};
