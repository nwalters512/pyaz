import {Command} from "@oclif/command";
import chalk from "chalk";
import ensureGitignore from "ensure-gitignore";
import {ensureEslintConfig, ESLINT_CONFIG_FILE_PATH} from "../config/eslint";
import {ensureJestConfig, JEST_CONFIG_FILE_PATH} from "../config/jest";
import {
  ensurePrettierConfig,
  PRETTIER_CONFIG_FILE_PATH
} from "../config/prettier";
import {
  ensureTypescriptConfig,
  TYPESCRIPT_CONFIG_FILE_PATH
} from "../config/typescript";
import {resolveInCwd} from "../lib/cwd";
export default class Setup extends Command {
  async run() {
    console.log(chalk.blue("Setting things up..."));
    const lintIgnorePatterns = ["/lib", "/dist", "/node_modules"];
    const gitIgnorePatterns = [...lintIgnorePatterns];
    await ensureTypescriptConfig();
    gitIgnorePatterns.push(TYPESCRIPT_CONFIG_FILE_PATH);
    await ensureEslintConfig();
    gitIgnorePatterns.push(ESLINT_CONFIG_FILE_PATH);
    await ensureGitignore({
      patterns: lintIgnorePatterns,
      comment: "managed by pyaz",
      filepath: resolveInCwd(".eslintignore")
    });
    await ensurePrettierConfig();
    gitIgnorePatterns.push(PRETTIER_CONFIG_FILE_PATH);
    await ensureGitignore({
      patterns: lintIgnorePatterns,
      comment: "managed by pyaz",
      filepath: resolveInCwd(".prettierignore")
    });
    await ensureJestConfig();
    gitIgnorePatterns.push(JEST_CONFIG_FILE_PATH);
    await ensureGitignore({
      patterns: gitIgnorePatterns,
      comment: "managed by pyaz",
      filepath: resolveInCwd(".gitignore")
    });
    console.log(chalk.blue("Setup completed"));
  }
}
Setup.description = "Generate and update config files";
