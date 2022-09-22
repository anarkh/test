jest.mock('yaml', () => {
  const originalModule = jest.requireActual('yaml');
  return {
    __esModule: true,
    ...originalModule,
    parse: jest.fn().mockReturnValue(3),
  };
});
jest.mock('@utils/debounce-throttle', () => {
  const originalModule = jest.requireActual('@utils/debounce-throttle');
  return {
    __esModule: true,
    ...originalModule,
    test: jest.fn().mockResolvedValue({
      host: '127.0.0.1',
      port: 3000,
      uri: '127.0.0.1: 3000',
    }),
  };
});
import { readYml } from '../../jest/readYml';
describe('readYml', () => {
  // {"errno":-2,"syscall":"open","code":"ENOENT","path":"/Users/bytedance/github/test/jest/test.yml"}
  test('注释生成测试用例: filePath:./test.yml options:2', () => {
    const result = readYml('./test.yml', 2);
    expect(result).toEqual(7);
  });

  test('方法默认值生成测试用例: filePath: options:5', () => {
    const result = readYml('', 5);
    expect(result).toEqual(5);
  });
  // {"errno":-2,"syscall":"open","code":"ENOENT","path":"/Users/bytedance/github/test/jest/test.yml"}
  test('filePath:./test.yml options:7', () => {
    const result = readYml('./test.yml', 7);
    expect(result).toEqual('');
  });

  test('filePath:mock../test.yml options:7', () => {
    const result = readYml('mock../test.yml', 7);
    expect(result).toEqual(7);
  });
});
