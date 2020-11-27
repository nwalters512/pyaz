import path from 'path';

export const resolveInCwd = (filePath: string): string => {
  return path.resolve(process.cwd(), filePath);
};

export const cwdWithTrailingSlash = (): string => {
  return process.cwd().endsWith('/') ? process.cwd() : `${process.cwd()}/`;
};

export const resolveInCwdWithLeadingSlash = (filePath: string): string => {
  if (filePath[0] !== '/') {
    filePath = '/' + filePath;
  }
  return filePath;
};
