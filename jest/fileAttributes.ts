import { parse, relative, resolve } from "path";
import ts from "typescript";
import { MatchPath, createMatchPath }  from "tsconfig-paths";
/**
 * 获取文件的路径集合类
 */
export class FileAttributes {
  baseDir: string;
  fileName: string;
  filePath: string;
  testFileName: string;
  testFilePath: string;
  mockDir: string;
  fileDir: string;
  testFileDir: string;
  tsConfigPath: string;
  parsedCommandLine: ts.ParsedCommandLine;
  matchPath: MatchPath;
  testRelativePath: string;
  jestConfigPath: string;

  constructor(options) {
    const filePath = resolve(options.baseDir, options.filePath);
    const fileObj = parse(filePath);
    this.tsConfigPath = ts.findConfigFile(filePath, ts.sys.fileExists);
    this.baseDir = options.baseDir;
    
    this.fileName = `${fileObj.name}${fileObj.ext}`;
    this.filePath = filePath;
    this.fileDir = fileObj.dir;

    const relativePath = relative(options.baseDir, fileObj.dir);
    this.testFileName = `${fileObj.name}.spec${fileObj.ext}`;
    this.testFilePath = resolve(options.baseDir, 'test', relativePath, this.testFileName);
    this.testFileDir = resolve(options.baseDir, 'test', relativePath);
    this.testRelativePath = relative(this.testFileDir, this.filePath);

    this.mockDir = resolve(options.baseDir, 'test/mock');

    const config = ts.readConfigFile(this.tsConfigPath, ts.sys.readFile);
    this.parsedCommandLine = ts.parseJsonConfigFileContent(config.config, ts.sys, this.baseDir);

    this.matchPath = createMatchPath(this.baseDir, this.parsedCommandLine.options.paths);
    this.getJestConfiguration();
  }

  /**
   * 获取mock文件的路径和类型
   * relative: 使用相对路径进行依赖引用
   * global: 使用包引用
   */
  getMockFilePath(name: string) {
    const matchPath = this.matchPath(name);
    if (matchPath !== undefined) {
      const relativePath = relative(this.baseDir, matchPath);
      const filePath = resolve(this.mockDir, `${relativePath}.mock.ts`);
      return {
        type: 'path',
        filePath,
      };
    } else if (name.startsWith('.')) {
      const importFilePath = resolve(this.fileDir, name);
      const relativePath = relative(this.baseDir, importFilePath);
      const filePath = resolve(this.mockDir, `${relativePath}.mock.ts`);
      return {
        type: 'relative',
        filePath,
        relativePath: relative(this.testFileDir, importFilePath),
      };
    } else {
      const filePath = resolve(this.mockDir, `${name}.mock.ts`);
      return {
        type: 'global',
        filePath,
      };
    }
  }
  /**
   * 获取jest配置
   */
  getJestConfiguration(){
    this.jestConfigPath = resolve(this.baseDir, 'jest.config.js');
    // this.jestConfig = require(jestConfigPath);
  }
}