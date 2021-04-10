import path from "path";
export const resolveInCwd = (filePath) => {
  return path.resolve(process.cwd(), filePath);
};
export const cwdWithTrailingSlash = () => {
  return process.cwd().endsWith("/") ? process.cwd() : `${process.cwd()}/`;
};
export const resolveInCwdWithLeadingSlash = (filePath) => {
  if (filePath[0] !== "/") {
    filePath = "/" + filePath;
  }
  return filePath;
};
