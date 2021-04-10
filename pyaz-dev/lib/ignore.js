import fs from "fs-extra";
import {resolveInCwd} from "./cwd";
export const resolveIgnoreFile = async (filePath) => {
  if (filePath) {
    const resolvedFilePath = resolveInCwd(filePath);
    if (await fs.pathExists(resolvedFilePath)) {
      return resolvedFilePath;
    }
  }
  return void 0;
};
