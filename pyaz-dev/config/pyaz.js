import fs from "fs-extra";
import {resolveInCwd} from "../lib/cwd";
export const PYAZ_CONFIG_FILE_PATH = "pyaz.config.ts";
export const hasPyazConfig = async () => {
  return fs.pathExists(PYAZ_CONFIG_FILE_PATH);
};
export const loadPyazConfig = async () => {
  const cwdPath = resolveInCwd(PYAZ_CONFIG_FILE_PATH);
  if (!fs.pathExists(cwdPath)) {
    return null;
  }
  const pyazConfig = require(cwdPath);
  if (pyazConfig.default)
    return pyazConfig.default;
  return pyazConfig;
};
