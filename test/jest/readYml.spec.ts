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
import { readYml, test1 } from '../../jest/readYml';
describe('readYml', () => {
  // {"errno":-2,"syscall":"open","code":"ENOENT","path":"/Users/bytedance/github/test/jest/test.yml"}
  test('注释生成测试用例: filePath:./test.yml options:2', () => {
    const result = readYml('./test.yml', 2);
    expect(result).toEqual(7);
  });

  test('方法默认值生成测试用例: filePath:mock options:5', () => {
    const result = readYml('mock', 5);
    expect(result).toEqual(5);
  });
  // {"errno":-2,"syscall":"open","code":"ENOENT","path":"/Users/bytedance/github/test/jest/1"}
  test('filePath:1 options:2', () => {
    const result = readYml('1', 2);
    expect(result).toEqual('');
  });

  test('filePath:1 options:3', () => {
    const result = readYml('1', 3);
    expect(result).toEqual(3);
  });
});
describe('test1', () => {
  test('a:5', () => {
    const result = test1(5);
    expect(result).toEqual(6);
  });

  test('a:6', () => {
    const result = test1(6);
    expect(result).toEqual(7);
  });

  test('a:7', () => {
    const result = test1(7);
    expect(result).toEqual(11);
  });
});
