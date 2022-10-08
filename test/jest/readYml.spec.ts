jest.mock('yaml', () => {
  const originalModule = jest.requireActual('yaml');
  return {
    __esModule: true,
    ...originalModule,
    parse: jest.fn().mockReturnValue(3),
  };
});
import { readYml } from '../../jest/readYml';
describe('readYml', () => {
  test('注释生成测试用例: filePath:./test.yml options:2', () => {
    const result = readYml('./test.yml', 2);
    expect(result).toEqual(2);
  });
  // {}
  test('方法默认值生成测试用例: filePath: options:undefined', () => {
    const result = readYml('');
    expect(result).toEqual('');
  });
  // {"errno":-2,"syscall":"open","code":"ENOENT","path":"/Users/bytedance/github/test/jest/mock"}
  test('filePath:mock options:[object Object]', () => {
    const result = readYml('mock', { a: 6 });
    expect(result).toEqual('');
  });

  test('filePath:mock options:[object Object]', () => {
    const result = readYml('mock', { a: 7 });
    expect(result).toEqual({ a: 7 });
  });
});
