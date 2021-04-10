import path from "path";
export const getCompiledFilePath = (filePath) => {
  const compiledRoot = path.resolve(__dirname, "..", "..", "dist");
  return path.join(compiledRoot, filePath);
};
