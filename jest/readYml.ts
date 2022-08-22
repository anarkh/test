import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { debounce } from '@utils/debounce-throttle';
import path from 'path';

/**
 * @param filePath 5
 * @param options 6
 * @returns 7
 */
export const readYml = (filePath: string, options: number): any => {
  if (filePath !== '' && ( options === 1 || options === 2 )) {
    const yml = readFileSync(path.resolve(__dirname, filePath), 'utf8');
    return parse(yml);
  }
  // if (((A-6)*2+1)%2) {
  //   const yml = readFileSync(path.resolve(__dirname, filePath), 'utf8');
  //   return parse(yml);
  // }

  return options;
}
const test = (a: number): number => {
  debounce(readYml, 300);
  return a + 1;
};
const test2 = 1;

export {test, test2};