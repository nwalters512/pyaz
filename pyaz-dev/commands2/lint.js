import {Command} from "@oclif/command";
import chalk from "chalk";
import {runPrettier} from "../lib/prettier";
import {runEslint} from "../lib/eslint";
const _Lint = class extends Command {
  async run() {
    const {argv} = this.parse(_Lint);
    console.log(chalk.blue("Linting..."));
    await runPrettier({paths: argv});
    await runEslint({paths: argv});
    console.log(chalk.blue("Linting complete"));
  }
};
let Lint = _Lint;
Lint.description = "Check code for formatting errors and best practices";
Lint.args = [{name: "file"}];
Lint.strict = false;
export default Lint;
