import chalk from "chalk";
import prettier from "prettier";
import {
  ensurePrettierConfig,
  makePrettierConfig,
  PRETTIER_CONFIG_FILE_PATH
} from "../config/prettier";
import {runBin} from "./execute";
import {resolveIgnoreFile} from "./ignore";
const DEFAULT_PATHS = ["**/*.{js,ts,jsx,tsx,md,less,css}"];
export const formatFile = (filepath, fileContents) => {
  return prettier.format(fileContents, {
    filepath,
    ...makePrettierConfig()
  });
};
export const runPrettier = async ({
  fix = false,
  paths: pathsOption = []
}) => {
  const paths = pathsOption?.length ? pathsOption : DEFAULT_PATHS;
  await ensurePrettierConfig();
  const args = ["--config", PRETTIER_CONFIG_FILE_PATH];
  if (fix) {
    args.push("--write");
  } else {
    args.push("--list-different");
  }
  const ignoreFile = await resolveIgnoreFile(".prettierignore");
  if (ignoreFile) {
    args.push("--ignore-path", ignoreFile);
  }
  args.push(...paths);
  try {
    await runBin({
      packageName: "prettier",
      args,
      options: {
        stdio: "inherit"
      }
    });
  } catch (exitCode) {
    if (exitCode === 2) {
      console.log(chalk.yellow("No files matched the specified paths"));
    } else {
      if (!fix && exitCode === 1) {
        console.error(chalk.red("The above file(s) are not formatted correctly"));
      } else {
        console.error(chalk.red(`Prettier exited with exit code ${chalk.bold(exitCode)}`));
      }
    }
  }
};
