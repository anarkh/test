import { parse, stringify } from 'yaml';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export const readYml = (filePath: string) => {
  const yml = readFileSync(resolve(__dirname, filePath), 'utf8');
  return parse(yml);
}

console.log(readYml('../jest-coverage.yml'));