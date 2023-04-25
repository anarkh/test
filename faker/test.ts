import { Options } from './types';
import { Context } from 'koa';

/**
 * @param {string} filePath ./test.yml
 * @param filePath 'test'
 * @param options 2
 * @returns {number} 7
 */
export function test(filePath: Context, options: Options): any {
  const b = options.a;
  if (b === 6) {
    return filePath;
  }

  return options;
}

export function test2(filePath: string, options: Options): any {
  const b = options.a;
  if (b === 6 && filePath === 'test') {
    return filePath;
  }

  return options;
}
