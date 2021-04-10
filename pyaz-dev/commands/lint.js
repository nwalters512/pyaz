import chalk from "chalk";
import {runPrettier} from "../lib/prettier";
import {runEslint} from "../lib/eslint";
export default async (args) => {
  console.log(chalk.blue("Linting..."));
  await runPrettier({});
  await runEslint({});
  console.log(chalk.blue("Linting complete"));
};
