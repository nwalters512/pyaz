import {ESLint} from "eslint";
import {ensureEslintConfig, makeEslintConfig} from "../config/eslint";
const DEFAULT_PATHS = ["."];
export const runEslint = async ({
  fix = false,
  paths: pathsOption = []
}) => {
  const paths = pathsOption?.length ? pathsOption : DEFAULT_PATHS;
  await ensureEslintConfig();
  const eslint = new ESLint({
    fix,
    baseConfig: makeEslintConfig()
  });
  const results = await eslint.lintFiles(paths);
  if (fix) {
    await ESLint.outputFixes(results);
  } else {
    const hasResults = results.length > 0;
    const hasErrors = ESLint.getErrorResults(results).length > 0;
    if (hasResults) {
      const formatter = await eslint.loadFormatter("stylish");
      const resultText = formatter.format(results);
      console.log(resultText);
    }
    if (hasErrors) {
    }
  }
};
