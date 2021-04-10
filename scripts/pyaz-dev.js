// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');
const fs = require('fs-extra');
const path = require('path');
const glob = require('globby');
const child = require('child_process');

const SRC_FOLDER = path.resolve(__dirname, '..', 'src');
const DEV_BUILD_FOLDER = path.resolve(__dirname, '..', 'pyaz-dev');

async function build() {
  await fs.remove(DEV_BUILD_FOLDER);
  await fs.ensureDir(DEV_BUILD_FOLDER);

  const files = await glob(`${SRC_FOLDER}/**/*.{js,ts}`);

  await esbuild.build({
    entryPoints: files,
    format: 'cjs',
    outdir: DEV_BUILD_FOLDER,
  });
}

async function execDev() {
  const args = [
    path.join(DEV_BUILD_FOLDER, 'cli.js'),
    ...process.argv.slice(2),
  ];
  const res = child.spawnSync(
    process.execPath,
    [...process.execArgv, ...args],
    {
      stdio: 'inherit',
    }
  );
  if (res.status !== 0) {
    process.exit(1);
  }
}

async function main() {
  await build();
  await execDev();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
