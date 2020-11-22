import path from 'path';

export const getCompiledFilePath = (filePath: string): string => {
  const compiledRoot = path.resolve(__dirname, '..', '..', 'lib');
  return path.join(compiledRoot, filePath);
};
