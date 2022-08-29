import { FileAttributes } from './fileAttributes';
import { logger, isBinaryExpressionOperatorToken, operatorWeight, OperatorKind, tagKindToString, parseValue, mockValue } from './utils';
import { FunctionNode, ExpressionList, TestStatement, DescribeStatement, Case } from './types';
import ts from 'typescript';
import { ampersandAmpersand, asterisk, barBar, equalsEqualsEquals, exclamationEquals, mathCalculate, minus, percent, plus, slash } from './operator';

/**
 * 获取import的mock文件，并生成代码字符串
 */
export class ExportMock {
  fileAttributes: FileAttributes;
  node: FunctionNode;
  constructor(options) {
    this.fileAttributes = options.fileAttributes;
    this.node = options.node;
  }

  beforeAll() {
    const code = 'beforeAll(() => {});';
    return code;
  }
  afterAll() {
    const code = 'afterAll(() => {});';
    return code;
  }
  beforeEach() {
    const code = 'beforeEach(() => {});';
    return code;
  }
  afterEach() {
    const code = 'afterAll(() => {});';
    return code;
  }
  /**
   * 根据注释生成测试用例
   */
  jSDocTest(describeStatement: DescribeStatement): void {
    const hasParametersDoc = this.node.parameters.every(parameter => {
      return parameter.tag.length > 0;
    });
    if (hasParametersDoc && this.node.tag) {
      const testName = this.node.parameters.map(parameter => {
        return `${parameter.name}:${parameter.tag[0].text}`;
      }).join(' ');
      const body = `const result = ${this.node.name}(${this.node.parameters.map(parameter => {
        return tagKindToString(parameter.tag[0].typeFlag, parameter.tag[0].text);
      }).join(', ')});`;

      const testStatement = {
        doc: '',
        name: `注释生成测试用例: ${testName}`,
        body,
        expect: 'result',
        assert: this.node.tag.text,
      }
      describeStatement.test.push(testStatement);
    }
  }
  /**
   * 根据默认值生成测试用例
   */
  defaultValueTest(describeStatement: DescribeStatement): void {
    const hasDefaultValue = this.node.parameters.some(parameter => {
      return parameter.defaultValue !== undefined;
    });
    if (hasDefaultValue) {
      const parameters = this.node.parameters.map(parameter => {
        const value = parameter.defaultValue ?? mockValue(parameter.typeFlag);
        return {
          name: parameter.name,
          typeFlag: parameter.typeFlag,
          value,
        };
      });
      const testName = parameters.map(parameter => {
        return `${parameter.name}:${parameter.value}`;
      }).join(' ');
      const body = `const result = ${this.node.name}(${parameters.map(parameter => {
        return tagKindToString(parameter.typeFlag, parameter.value);
      }).join(', ')});`;

      const testStatement = {
        doc: '',
        name: `方法默认值生成测试用例: ${testName}`,
        body,
        expect: 'result',
        assert: '\'\'',
      }
      describeStatement.test.push(testStatement);
    }
  }
  test(testInfo: Case[]): TestStatement {
    const name = testInfo.map(element => {
      return `${element.text}:${element.value}`;
    }).join(' ');
    const body = `const result = ${this.node.name}(${testInfo.map(element => {
      return tagKindToString(element.kind, element.value, true);
    }).join(', ')});`;

    return {
      doc: '',
      name,
      body,
      expect: 'result',
      assert: '\'\'',
    }
  }
  // kind = 221
  // 解析条件语句二叉树结构为中缀表达式
  binaryExpression(expression: ts.BinaryExpression, list) {
    if (ts.isBinaryExpression(expression.left)) {
      this.binaryExpression(expression.left, list);
    } else if (ts.isParenthesizedExpression(expression.left)) {
      const parenthesizedExpression = expression.left.expression as ts.BinaryExpression;
      list.push({
        text: '(',
        kind: 212,
        weight: operatorWeight(212),
      });
      this.binaryExpression(parenthesizedExpression, list);
      list.push({
        text: ')',
        kind: 212,
        weight: operatorWeight(212),
      });
    }  else {
      list.push({
        text: expression.left.getText(),
        kind: expression.left.kind,
      });
    }
    // isBinaryExpressionOperatorToken
    list.push({
      text: OperatorKind[expression.operatorToken.kind],
      kind: expression.operatorToken.kind,
      weight: operatorWeight(expression.operatorToken.kind),
    });
    if (ts.isBinaryExpression(expression.right)) {
      this.binaryExpression(expression.right, list);
    } else if (ts.isParenthesizedExpression(expression.right)) {
      const parenthesizedExpression = expression.right.expression as ts.BinaryExpression;
      list.push({
        text: '(',
        kind: 212,
        weight: operatorWeight(212),
      });
      this.binaryExpression(parenthesizedExpression, list);
      list.push({
        text: ')',
        kind: 212,
        weight: operatorWeight(212),
      });
    } else {
      list.push({
        text: expression.right.getText(),
        kind: expression.right.kind,
      });
    }
  }
  // 条件语句转化为后缀表达式
  transformExpression (expressionList: ExpressionList[]) {
    const output = [];
    const temp = [];
    expressionList.forEach(element => {
      if (element.kind === 212) {
        if (element.text === '(') {
          temp.push(element);
        } else {
          while(temp.length > 0) {
            const popElement = temp.pop();
            if (popElement.text === '(') {
              break;
            }
            output.push(popElement);
          } 
        }
      } else if (isBinaryExpressionOperatorToken(element.kind)) {
        while(temp.length > 0 && temp[temp.length -1].kind !== 212 && temp[temp.length -1].weight >= element.weight) {
          output.push(temp.pop());
        }
        temp.push(element);
      } else {
        output.push(element);
      }
    });

    const result = output.concat(temp.reverse());
    result.forEach(element => {
      element.text = parseValue(element.kind, element.text, true);
    });
    return result;
  }
  formart(expression: ExpressionList) {
    if (expression.kind === ts.SyntaxKind.NumericLiteral) { /* SyntaxKind.NumericLiteral */
      return expression.text;
    } else {
    }
  }

  isVariable (expression: ExpressionList) {
    if (expression.kind === ts.SyntaxKind.Identifier || expression.kind === -1) {
      return true;
    }

    return false;
  }
  calculate(variable: ExpressionList, constant: ExpressionList, operator: ExpressionList) {
    if (operator.kind === ts.SyntaxKind.PlusToken) {
      return plus(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.MinusToken) {
      return minus(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.AsteriskToken) {
      return asterisk(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.SlashToken) {
      return slash(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.PercentToken) {
      return percent(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
      return ampersandAmpersand(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.BarBarToken) {
      return barBar(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.EqualsEqualsToken) {
      return equalsEqualsEquals(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.ExclamationEqualsToken) {
      return exclamationEquals(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.EqualsEqualsEqualsToken) {
      return equalsEqualsEquals(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken) {
      return exclamationEquals(variable, constant);
    } else if (operator.kind === ts.SyntaxKind.LessThanToken) {
      return {
        kind: 79,
        text: variable.text < constant.text,
      };
    } else if (operator.kind === ts.SyntaxKind.LessThanEqualsToken) {
      return {
      }
    }
  }
  calculateIdentifier(expressionList: ExpressionList[], result) {
    const identifier = [];
    let identifierResult;
    expressionList.forEach(expression => {
      if (isBinaryExpressionOperatorToken(expression.kind)) {
        const left = identifier.pop();
        let right = identifierResult;
        if (right === undefined) {
          right = identifier.pop();
        }
        
      } else {
        identifier.push(expression);
      }
    });
  }
  // 解析一元一次方程式
  oneDimensionalEquation(expressionList: ExpressionList[], result: number) {
    const identifierList = [];
    const operatorList = [];
    let resultExpression = {
      kind: 8,
      text: result.toString(),
    }
    expressionList.reverse().forEach(expression => {
      if (!isBinaryExpressionOperatorToken(expression.kind) && identifierList.length > 0) {
        let left = null;
        while(identifierList.length > 0) {
          if (left === null) {
            left = identifierList.pop();
          }

          const right = identifierList.pop();

          left = mathCalculate(left, right, operatorList.pop());
        }
        resultExpression = mathCalculate(resultExpression, left, operatorList.pop(), true);
      }
      if (isBinaryExpressionOperatorToken(expression.kind)) {
        operatorList.push(expression);
      } else {
        identifierList.push(expression);
      }
    });

  }
calculateExpression (expressionList: ExpressionList[]): ExpressionList {
  const identifier = [];
  expressionList.forEach(expression => {
    if (isBinaryExpressionOperatorToken(expression.kind)) {
      const right = identifier.pop();
      const left = identifier.pop();
      if (this.isVariable(left)) {
        const result = this.calculate(left, right, expression);
        identifier.push(result);
      } else if (this.isVariable(right)) {
        const result = this.calculate(right, left, expression);
        identifier.push(result);
      }
    } else {
      identifier.push(expression);
    }
  });
  return identifier[0];
}
  ifStatement(statement: ts.IfStatement, describeStatement: DescribeStatement): void {
    if (ts.isBinaryExpression(statement.expression)) {
      const expressionList = [];
      this.binaryExpression(statement.expression, expressionList);
      const transformE = this.transformExpression(expressionList);
      // logger(transformE);
      if(transformE.every(item => item.weight > 10)) {
        logger('暂不支持计算表达式');
        return;
      }
      const result = this.calculateExpression(transformE);
      describeStatement.test.push(this.test(result.trueCase));
      if (statement.elseStatement && ts.isIfStatement(statement.elseStatement)) {
        this.ifStatement(statement.elseStatement, describeStatement);
      } else {
        describeStatement.test.push(this.test(result.falseCase));
      }
    }
  }
 
  produce() {
    logger(this.node);
    const describeStatement = {
      name: this.node.name,
      test: [],
    };
    this.jSDocTest(describeStatement);
    this.defaultValueTest(describeStatement);
    // console.log(this.node.body.statements);
    this.node.body.statements.forEach((statement)=> {
      if (ts.isIfStatement(statement)) {
        this.ifStatement(statement, describeStatement);
      }
    });
    return describeStatement;
  }
}