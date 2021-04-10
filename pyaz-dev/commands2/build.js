import {Command} from "@oclif/command";
import chalk from "chalk";
import fs from "fs-extra";
import {resolveInCwd} from "../lib/cwd";
import {runTypescript} from "../lib/typescript";
export default class Build extends Command {
  async run() {
    console.log(chalk.blue("Building..."));
    await fs.remove(resolveInCwd("dist"));
    await runTypescript();
    console.log(chalk.blue("Building completed"));
  }
}
Build.description = "Compiles input files";
