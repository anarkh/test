import { parse } from 'yaml';
import { readFileSync } from 'fs';
// import { Context } from 'koa';
import path from 'path';
// import { FunctionNode } from './types';

interface TestMock {
  c: string;
}
interface Options {
  a: number;
  b: TestMock[];
}

/**
 * @param {string} filePath ./test.yml
 * @param filePath 'test'
 * @param options 2
 * @returns {number} 7
 */
export function test(filePath = '', options: any): any {
  const b = options.a;
  if (b === 6 && filePath === 'test') {
    return filePath;
  }

  return options;
}
