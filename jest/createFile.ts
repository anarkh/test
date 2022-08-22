import { createWriteStream } from 'fs';
import { ExportMock } from './exportMock';
import { FileAttributes } from './fileAttributes';
import { ImportMock } from './importMock';
import prettier from 'prettier';
import ts from 'typescript';

/**
 * 生成jest单测文件
 */
export class CreateFile {
  filename: string;
  testFilePath: string;
  import: string;
  describe: string[];
  imports: string[];
  fileAttributes: FileAttributes;
  importMock: ImportMock;
  exportMock: ExportMock;
  constructor(options) {
    this.testFilePath = options.fileAttributes.testFilePath;
    this.fileAttributes = options.fileAttributes;
    this.imports = [];
    this.describe = [];
    this.importMock = new ImportMock(options);
  }

  init() {
    this.createFile();
  }

  createImport(options) {
    const result = this.importMock.produce(options);
    if (result) {
      this.imports.push(result);
    }
  }

  createDescribe(node, jsDocTags?: ts.JSDocTag[]) {
    const exportMock = new ExportMock({
      fileAttributes: this.fileAttributes,
      node: node,
      jsDocTags,
    });
    const result = exportMock.produce();
    if (result) {
      this.describe.push(result);
    }
  }

  createFile() {
    const ws = createWriteStream(this.testFilePath);
    const code = [].concat(this.imports, this.describe);
    const n = prettier.format(code.join(''), {
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
    ws.write(n);
    ws.end();
  }
}
