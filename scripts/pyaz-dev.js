// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');
const fs = require('fs-extra');
const path = require('path');
const glob = require('globby');

const SRC_FOLDER = path.resolve(__dirname, '..', 'src');
const DEV_BUILD_FOLDER = path.resolve(__dirname, '..', 'pyaz-dev');

async function build() {
  await fs.remove(DEV_BUILD_FOLDER);
  await fs.ensureDir(DEV_BUILD_FOLDER);

  const files = await glob(`${SRC_FOLDER}/**/*.{js,ts}`);

  await esbuild.build({
    entryPoints: files,
    outdir: DEV_BUILD_FOLDER,
  });
}

async function execDev() {
  console.log('hello!');
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
