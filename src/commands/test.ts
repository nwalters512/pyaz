import { runJest } from '../lib/jest';

export default async () => {
  await runJest(process.argv);
};
