import fs from 'fs-extra';
import { resolveInCwd } from './cwd';

export const resolveIgnoreFile = async (
  filePath?: string
): Promise<string | undefined> => {
  if (filePath) {
    const resolvedFilePath = resolveInCwd(filePath);
    if (await fs.pathExists(resolvedFilePath)) {
      return resolvedFilePath;
    }
  }

  const defaultFilePath = resolveInCwd('.gitignore');
  if (await fs.pathExists(defaultFilePath)) {
    return defaultFilePath;
  }

  return undefined;
};
