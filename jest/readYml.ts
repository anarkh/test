import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { debounce } from '@utils/debounce-throttle';
import path from 'path';

/**
 * @param {string} filePath ./test.yml
 * @param options 2
 * @returns {number} 7
 */
export function readYml (filePath = '', options = 5): any {
  if (['./test.yml'].includes(filePath) || options === 6) {
    const yml = readFileSync(path.resolve(__dirname, filePath), 'utf8');
    return parse(yml);
  }
  // if (((A-6)*2+1)%2) {
  //   const yml = readFileSync(path.resolve(__dirname, filePath), 'utf8');
  //   return parse(yml);
  // }

  return options;
}