import fs from 'fs-extra';
import { resolveInCwd } from '../lib/cwd';

export const PYAZ_CONFIG_FILE_PATH = 'pyaz.config.ts';

export const hasPyazConfig = async () => {
  return fs.pathExists(PYAZ_CONFIG_FILE_PATH);
};
export const loadPyazConfig = async () => {
  const cwdPath = resolveInCwd(PYAZ_CONFIG_FILE_PATH);
  if (!fs.pathExists(cwdPath)) {
    // No user-provided config exists; we're running in zero-config mode.
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pyazConfig = require(cwdPath);

  // Handle the case where this is transformed to have a `default` property
  if (pyazConfig.default) return pyazConfig.default;
  return pyazConfig;
};
