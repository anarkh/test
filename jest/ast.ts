import ts from "typescript";
import { CreateFile } from './createFile';
import { FileAttributes } from './fileAttributes';
import { logger } from './utils';

// const resultFile = ts.createSourceFile("someFileName.ts", readFileSync(file).toString(), ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);

class AutoJest {
  sourceFile: ts.SourceFile;
  typeChecker: ts.TypeChecker;
  testFile: CreateFile;
  constructor(options) {
    const filePath = options.fileAttributes.filePath;
    const program = ts.createProgram({
      rootNames: [filePath],
      options: options.fileAttributes.parsedCommandLine.options,
    });
    this.typeChecker = program.getTypeChecker();
    this.sourceFile = program.getSourceFile(filePath);
    this.testFile = new CreateFile(options);
    this.init();
  }

  init() {
    ts.forEachChild(this.sourceFile, (node) => {
      // @ts-ignore
      if (ts.isImportDeclaration(node)) {
        this.importDeclaration(node);
      } else if (ts.isVariableStatement(node)) {
        this.variableStatement(node);
      } else if (ts.isExportDeclaration(node)) {
        this.exportDeclaration(node);
      }
    });
    this.testFile.createFile();
  }

  /**
   * 分析import引用
   * @param node
   */
  importDeclaration(node: ts.ImportDeclaration) {
    const importClause = node.importClause as ts.ImportClause;
    const moduleSpecifier = node.moduleSpecifier as ts.StringLiteral;
    // 默认导入
    const defaultImport = importClause?.name?.escapedText;
    // 解构导入
    const bindings = importClause?.namedBindings as ts.NamedImports;
    // names就是解构的变量名
    const names = bindings?.elements.map((item) => item.name.escapedText);
    // if (defaultImport) {
    //   console.log(`import ${defaultImport} from ${moduleSpecifier.text}`);
    // } else {
    //   console.log(`import { ${names.join(" ")} } from ${moduleSpecifier.text}`);
    // }
    
    this.testFile.createImport({
      names,
      defaultImport,
      from: moduleSpecifier.text,
    });
  }
  // 获取默认参数
  getDefaultValue(node) {
    let defaultValue = node.getText();
    if (ts.isAsExpression(node)) {
      defaultValue = node.getText();
    } else if (ts.isArrayLiteralExpression(node)) {
      defaultValue = [];
      node.elements.forEach((element) => {
        defaultValue.push(element.getText());
      });
    }
  }
  // 分析导出方法
  analyzeFunction(node: ts.VariableDeclaration) {
    if (ts.isArrowFunction(node.initializer)) {
      const initializer = node.initializer as ts.ArrowFunction;
      const returnType = this.typeChecker.getTypeFromTypeNode(initializer.type);
      const parameters = initializer.parameters.map((element) => {
        if (ts.isParameter(element)) {
          const name = element.name.getText();
          const type = this.typeChecker.typeToString(
            this.typeChecker.getTypeAtLocation(element)
          );
          const typeFlag = this.typeChecker
            .getTypeAtLocation(element)
            .getFlags();
          let defaultValue: any;
          if (element.initializer) {
            defaultValue = element.initializer.getText();
            if (ts.isAsExpression(element.initializer)) {
              defaultValue = element.initializer.getText();
            } else if (ts.isArrayLiteralExpression(element.initializer)) {
              defaultValue = element.initializer.elements.map((value) => {
                if (ts.isNumericLiteral(value)) {
                  return parseInt(value.getText());
                }
                return value.getText();
              });
            }
          }
          return {
            name,
            type,
            typeFlag,
            defaultValue,
          };
        }
      });
      return {
        name: node.name.getText(),
        parameters,
        type: this.typeChecker.typeToString(returnType),
        typeFlag: returnType.getFlags(),
        body: initializer.body,
      }
    }

  }
  /**
   * 分析变量定义
   * @param node
   * @return
   */
  variableStatement(node: ts.VariableStatement) {
    // @ts-ignore
    console.log('---------------------', ts.getJSDocAugmentsTag(node));
    const modifiers = node.modifiers;
    // isExportModifier
    if (modifiers?.[0]?.kind === 93) {
      const declarations = node.declarationList
        .declarations[0] as ts.VariableDeclaration;
      const functionNode = this.analyzeFunction(declarations);
      this.testFile.createDescribe(functionNode);
    }
  }

  exportDeclaration(node: ts.ExportDeclaration) {
    node.exportClause.forEachChild((node: ts.ExportSpecifier) => {
      const functionName = node.name.getText();
      // 循环页面节点，找到对应的方法
      ts.forEachChild(this.sourceFile, (node) => {
        if (ts.isVariableStatement(node)) {
          const child = node.getChildAt(0);
          if (ts.isVariableDeclarationList(child)) {
            if (child.declarations.length > 0) {
              const declarationName = child.declarations[0].name.getText();
              if (functionName === declarationName) {
                this.analyzeFunction(child.declarations[0]);
              }
            }
          }
        }
      });
    })
  }
}

// console.log((sourceFile as any).imports[0]);
// importDeclaration((sourceFile as any).imports[0]);
// const symbol = typeChecker.getSymbolAtLocation(sourceFile);
// console.log(symbol.exports.get('readYml'));
// symbol.exports.forEach((value, key) => {
//   console.log('---------------------------');
//   console.log(key);
//   console.log(value.declarations[0]);
// })

const main = () => {
  const fileAttributes = new FileAttributes({
    baseDir: process.env.PWD,
    filePath: './jest/readYml.ts',
  });
  logger(fileAttributes);
  const autoJest = new AutoJest({
    fileAttributes: fileAttributes,
  });
};
main();
