jest.mock('yaml', () => {
  const originalModule = jest.requireActual('yaml');
  return {
    __esModule: true,
    ...originalModule,
    parse: jest.fn().mockReturnValue(3),
  };
});
import { test } from '../../auto-jest/readYml';
describe('test', () => {
  test('注释生成测试用例: filePath:./test.yml options:2', () => {
    const result = test('./test.yml', '2');
    expect(result).toEqual(7);
  });

  test('方法默认值生成测试用例: filePath: options:"any"', () => {
    const result = test('', '"any"');
    expect(result).toEqual('');
  });

  test('filePath:test options:object', () => {
    const result = test('test', { a: 6 });
    expect(result).toEqual('');
  });

  test('filePath:test1 options:object', () => {
    const result = test('test1', { a: 6 });
    expect(result).toEqual('');
  });
});
