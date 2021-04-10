import {runBin} from "./execute";
import {ensureJestConfig} from "../config/jest";
export const runJest = async (args) => {
  await ensureJestConfig();
  await runBin({
    packageName: "jest",
    args,
    options: {
      stdio: "inherit"
    }
  });
};
