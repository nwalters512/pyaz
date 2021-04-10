import {ensureTypescriptConfig} from "../config/typescript";
import {runBin} from "./execute";
export const runTypescript = async () => {
  await ensureTypescriptConfig();
  await runBin({
    packageName: "typescript",
    binName: "tsc"
  });
};
