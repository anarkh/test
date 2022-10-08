import { parse } from 'yaml';
import { readFileSync } from 'fs';
// import { Context } from 'koa';
import path from 'path';
import { FunctionNode } from './types';

interface TestMock {
  c: string;
}
interface Options {
  a: number;
  b: TestMock[];
}

/**
 * @param {string} filePath ./test.yml
 * @param options 2
 * @returns {number} 7
 */
export function readYml (filePath = '', options: FunctionNode): any {
  if (options.a === 6) {
    const yml = readFileSync(path.resolve(__dirname, filePath), 'utf8');
    return parse(yml);
  }
  // if (((A-6)*2+1)%2) {
  //   const yml = readFileSync(path.resolve(__dirname, filePath), 'utf8');
  //   return parse(yml);
  // }

  return options;
}