import path from 'path';

export const resolveInCwd = (filePath: string): string => {
  return path.resolve(process.cwd(), filePath);
};
