import {Command} from "@oclif/command";
import {runJest} from "../lib/jest";
const _Test = class extends Command {
  async run() {
    const {argv} = this.parse(_Test);
    await runJest(argv);
  }
};
let Test = _Test;
Test.description = "Run unit and integration tests";
Test.args = [{name: "file"}];
Test.strict = false;
export default Test;
