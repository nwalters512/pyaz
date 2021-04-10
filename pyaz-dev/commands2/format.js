import {Command} from "@oclif/command";
import chalk from "chalk";
import {runEslint} from "../lib/eslint";
import {runPrettier} from "../lib/prettier";
const _Format = class extends Command {
  async run() {
    const {argv} = this.parse(_Format);
    console.log(chalk.blue("Formatting..."));
    await runPrettier({fix: true, paths: argv});
    await runEslint({fix: true, paths: argv});
    console.log(chalk.blue("Formatting completed"));
  }
};
let Format = _Format;
Format.description = "Fix problems with code";
Format.args = [{name: "file"}];
Format.strict = false;
export default Format;
