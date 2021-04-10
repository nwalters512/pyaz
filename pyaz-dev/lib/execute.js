import path from "path";
import spawn from "cross-spawn";
import chalk from "chalk";
import {cwdWithTrailingSlash} from "./cwd";
const resolveBin = (packageName, binName) => {
  const packageJson = require(`${packageName}/package.json`);
  const binPath = typeof packageJson.bin === "string" ? packageJson.bin : packageJson.bin[binName || packageName];
  return require.resolve(path.join(packageName, binPath));
};
const spawnPromise = (commandPath, args, options) => {
  const childProcess = spawn(commandPath, args, options);
  return new Promise((resolve, reject) => {
    childProcess.on("exit", (exitCode) => {
      if (exitCode === 0) {
        resolve(exitCode);
        return;
      }
      reject(exitCode);
    });
  });
};
export const logCommand = (executableName, args) => {
  let logCommand2 = `$ ${executableName}`;
  if (args && args.length > 0) {
    logCommand2 += ` ${args.join(" ")}`;
  }
  logCommand2 = logCommand2.split(cwdWithTrailingSlash()).join("");
  console.log(chalk.dim(logCommand2));
};
export const runBin = ({
  packageName,
  binName,
  args,
  options
}) => {
  const resolvedBin = resolveBin(packageName, binName);
  logCommand(resolvedBin, args);
  return spawnPromise(resolvedBin, args, {stdio: "inherit", ...options});
};
