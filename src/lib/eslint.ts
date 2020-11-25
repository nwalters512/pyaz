import { CLIEngine, ESLint } from 'eslint';

const DEFAULT_PATHS = ['.'];

export const runEslint = async ({ fix = false, paths: pathsOption = [] }) => {
  const paths: string[] = pathsOption?.length ? pathsOption : DEFAULT_PATHS;

  const eslint = new ESLint({ fix });

  const results = await eslint.lintFiles(paths);

  if (fix) {
    await ESLint.outputFixes(results);
  }

  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);

  console.log(resultText);
};
