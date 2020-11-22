import { Command, flags } from "@oclif/command";
import chalk = require("chalk");

export default class Lint extends Command {
  static description = "Check code for formatting errors and best practices";

  async run() {
    console.log(chalk.cyan("Linting"));
    console.log(chalk.cyan("Linting complete"));
  }
}
