import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { ExportMock } from './exportMock';
import { FileAttributes } from './fileAttributes';
import { ImportMock } from './importMock';
import prettier from 'prettier';
import { FunctionNode, TestStatement, DescribeStatement } from './types';
import { parse, resolve, dirname } from 'path';
import { runCLI } from 'jest';

/**
 * 生成jest单测文件
 */
export class CreateFile {
  filename: string;
  testFilePath: string;
  import: string;
  describe: any[];
  imports: string[];
  fileAttributes: FileAttributes;
  importMock: ImportMock;
  exportMock: ExportMock;
  jestReportPath: string;
  testFileDir: string;
  constructor(options) {
    this.testFileDir = options.fileAttributes.testFileDir;
    this.testFilePath = options.fileAttributes.testFilePath;
    this.fileAttributes = options.fileAttributes;
    this.imports = [];
    this.describe = [];
    this.importMock = new ImportMock(options);
    this.jestReportPath = resolve(__dirname, './custom-reporter.js');
  }

  init() {
    this.createFile();
  }

  createImport(options): void {
    const result = this.importMock.produce(options);
    if (result) {
      this.imports.push(result);
    }
  }

  createFunctionImport(functionNodes: FunctionNode[]): void {
    const result = functionNodes.map(functionNode => {
      return functionNode.name;
    });
    if (result) {
      const importFrom = parse(this.fileAttributes.testRelativePath);
      this.imports.push(`import { ${result.join(', ')} } from '${importFrom.dir}/${importFrom.name}';`);
    }
  }


  writeDescribe(describeStatement: DescribeStatement): string {
    if (describeStatement.test.length === 0) {
      return '';
    }
    const testString = describeStatement.test.map((test) => {
      return this.writeTest(test);
    });
    return `describe('${describeStatement.name}', () => {
      ${testString.join('\n')}
    });`;
  }
  writeTest(testStatement: TestStatement): string {
    const jsDoc = testStatement.doc ? `// ${testStatement.doc}` : '';
    return `${jsDoc}
    test('${testStatement.name}', () => {
      ${testStatement.body}
      expect(${testStatement.expect}).toEqual(${testStatement.assert});
    });`;
  }
  resetAssert(assertionResult, index: number): void {
    let testIndex = 0;
    const failureDetails = assertionResult.failureDetails[0];
    this.describe.forEach((describeStatement) => {
      if (testIndex <= index) {
        describeStatement.test.forEach((test) => {
          if (testIndex === index) {
            if (failureDetails.matcherResult) {
              test.assert = failureDetails.matcherResult.actual;
            } else {
              test.doc = JSON.stringify(failureDetails);
            }
          }
          testIndex++;
        });
      }
    });
  }
  createDescribe(node): void {
    const exportMock = new ExportMock({
      fileAttributes: this.fileAttributes,
      node: node,
    });
    const result = exportMock.produce();
    if (result) {
      this.describe.push(result);
    }
  }
  prettier(code: string): string {
    return prettier.format(code, {
      printWidth: 140,
      tabWidth: 2,
      singleQuote: true,
      jsxBracketSameLine: true,
      trailingComma: 'es5',
      semi: true,
      arrowParens: 'always',
      proseWrap: 'always',
      parser: 'babel',
    });

  }

  createFile(): void {
    const describeString = this.describe.map((describeStatement) => {
      return this.writeDescribe(describeStatement);
    });
    const code = [].concat(this.imports, describeString);
    makeDirs(this.testFileDir);
    writeFileSync(this.testFilePath, code.join(''));

    runCLI({
      silent: true,
      json: true,
      reporters: [this.jestReportPath],
      outputFile: './testCache.json',
      _: [this.testFilePath],
      $0: ''
    }, [this.fileAttributes.jestConfigPath]).then((res) => {
      res.results.testResults[0].testResults.forEach((test, index) => {
        if (test.status === 'failed') {
          this.resetAssert(test, index);
        }
      });
      const describeString = this.describe.map((describeStatement) => {
        return this.writeDescribe(describeStatement);
      });
      const code = [].concat(this.imports, describeString);
      const prettierCode = this.prettier(code.join(''));
      writeFileSync(this.testFilePath, prettierCode);
    });
  }
}
const makeDirs = path => {
  if (existsSync(path)) {
      return true;
  }
  if (makeDirs(dirname(path))) {
      mkdirSync(path);
      return true;
  }
};