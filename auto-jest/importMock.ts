import { readFileSync } from 'fs';
import { parse } from 'path';
import { FileAttributes } from './fileAttributes';
import { logger } from './utils';

/**
 * 获取import的mock文件，并生成代码字符串
 */
export class ImportMock {
  fileAttributes: FileAttributes;
  constructor(options) {
    this.fileAttributes = options.fileAttributes;
  }

  produce(options) {
    const result = this.fileAttributes.getMockFilePath(options.from);
    const fileObj = parse(options.from);
    try {
      const file = readFileSync(result.filePath).toString();
      if (result.type === 'path') {
        const reg = new RegExp(`@mock/${fileObj.name}`, 'g');
        return file.replace(reg, options.from);
      } else if (result.type === 'relative') {
        const reg = new RegExp(`@mock/${fileObj.name}`, 'g');
        return file.replace(reg, result.relativePath);
      } else {
        return file;
      }
    } catch (err) {
      logger('未发现mock文件', result.filePath);
    }
  }
}