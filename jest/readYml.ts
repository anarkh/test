import { parse } from 'yaml';
import { readFileSync } from 'fs';
import { debounce } from '@utils/debounce-throttle';
import path from 'path';

/**
 * @param {string} filePath ./test.yml
 * @param options 2
 * @returns {number} 7
 */
export const readYml = (filePath = '', options = 5): any => {
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
function test1(a: number): number{
  if (a === 5) {
    debounce(readYml, 300);
  } else if (a === 6){
    return 7;
  } else {
    a = a + 3;
  }
  
  return a + 1;
};
const test2 = 1;

export {test1, test2};