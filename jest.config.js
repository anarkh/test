/**
 * @description Jest单元测试配置文件
 */
 module.exports = {
  // 项目根目录
  rootDir: __dirname,
  // 测试用例存放位置
  testMatch: [
    '<rootDir>/test/**/*spec.[jt]s?(x)',
  ],
  // 测试代码引用源代码的路径解析
  moduleNameMapper: {
    '@shared/(.*)': '<rootDir>/packages/shared/$1',
    '@components/(.*)': '<rootDir>/packages/shared/components/$1',
    '@packages/(.*)': '<rootDir>/packages/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
  // 默认忽略bvt测试，命令行手动加参数来执行bvt
  testPathIgnorePatterns: ['bvt'],
  // 是否统计覆盖率
  collectCoverage: true,
  // 统计覆盖率的分母来源，设置为源代码路径
  collectCoverageFrom: [
    'packages/**/*.js',
  ],
  // 覆盖率报告的输出目录
  coverageDirectory: 'coverage',
  // 覆盖率忽略以下地址
  coveragePathIgnorePatterns: ['/node_modules/'],
  // 覆盖率报告的格式
  coverageReporters: ['text', 'lcov', 'clover', 'json'],
};
