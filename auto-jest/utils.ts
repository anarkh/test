import ts from 'typescript';
import { ExpressionList } from './types';

export const logger = (...args: any) => {
  if (process.env.node_env === 'development') {
    console.log(...args);
  }
};

export function isBinaryExpressionOperatorToken(token: number) {
  switch (token) {
    case 41 /* SyntaxKind.AsteriskToken */:
    case 43 /* SyntaxKind.SlashToken */:
    case 44 /* SyntaxKind.PercentToken */:
    case 39 /* SyntaxKind.PlusToken */:
    case 40 /* SyntaxKind.MinusToken */:
    case 47 /* SyntaxKind.LessThanLessThanToken */:
    case 48 /* SyntaxKind.GreaterThanGreaterThanToken */:
    case 49 /* SyntaxKind.GreaterThanGreaterThanGreaterThanToken */:
    case 29 /* SyntaxKind.LessThanToken */:
    case 31 /* SyntaxKind.GreaterThanToken */:
    case 32 /* SyntaxKind.LessThanEqualsToken */:
    case 33 /* SyntaxKind.GreaterThanEqualsToken */:
    case 102 /* SyntaxKind.InstanceOfKeyword */:
    case 101 /* SyntaxKind.InKeyword */:
    case 127 /* SyntaxKind.AsKeyword */:
    case 34 /* SyntaxKind.EqualsEqualsToken */:
    case 35 /* SyntaxKind.ExclamationEqualsToken */:
    case 36 /* SyntaxKind.EqualsEqualsEqualsToken */:
    case 37 /* SyntaxKind.ExclamationEqualsEqualsToken */:
    case 50 /* SyntaxKind.AmpersandToken */:
    case 52 /* SyntaxKind.CaretToken */:
    case 51 /* SyntaxKind.BarToken */:
    case 55 /* SyntaxKind.AmpersandAmpersandToken */:
    case 56 /* SyntaxKind.BarBarToken */:
    case 74 /* SyntaxKind.BarEqualsToken */:
    case 73 /* SyntaxKind.AmpersandEqualsToken */:
    case 78 /* SyntaxKind.CaretEqualsToken */:
    case 70 /* SyntaxKind.LessThanLessThanEqualsToken */:
    case 71 /* SyntaxKind.GreaterThanGreaterThanEqualsToken */:
    case 72 /* SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken */:
    case 64 /* SyntaxKind.PlusEqualsToken */:
    case 65 /* SyntaxKind.MinusEqualsToken */:
    case 66 /* SyntaxKind.AsteriskEqualsToken */:
    case 68 /* SyntaxKind.SlashEqualsToken */:
    case 69 /* SyntaxKind.PercentEqualsToken */:
    case 63 /* SyntaxKind.EqualsToken */:
    case 27 /* SyntaxKind.CommaToken */:
    case 60 /* SyntaxKind.QuestionQuestionToken */:
    case 75 /* SyntaxKind.BarBarEqualsToken */:
    case 76 /* SyntaxKind.AmpersandAmpersandEqualsToken */:
    case 77 /* SyntaxKind.QuestionQuestionEqualsToken */:
      return true;
    default:
      return false;
  }
}

export const operatorWeight = (operator: number) => {
  switch (operator) {
    case 212 /* SyntaxKind.ParenthesizedExpression */:
      return 19;
    case 41:
    case 43:
    case 44:
      return 13;
    case 39:
    case 40:
      return 12;
    case 29:
    case 31:
    case 32:
    case 33:
    case 101:
    case 102:
      return 10;
    case 34:
    case 35:
    case 36:
    case 37:
      return 9;
    case 50:
      return 8;
    case 52:
      return 7;
    case 51:
      return 6;
    case 55:
      return 5;
    case 56:
    case 60:
      return 4;
    default:
      return 0;
  }
};

export const OperatorKind = {
  27: ',',
  29: '<',
  31: '>',
  32: '<=',
  33: '>=',
  34: '==',
  35: '!=',
  36: '===',
  37: '!==',
  39: '+',
  40: '-',
  41: '*',
  43: '/',
  44: '%',
  50: '&',
  51: '|',
  52: '^',
  55: '&&',
  56: '||',
  60: '??',
  95: 'false',
  101: 'in',
  102: 'InstanceOf',
  104: 'null',
  110: 'true',
};

const typeFlagsMap = new Map([
  [1, (value: string) => `'${value}'`],
  [4, (value: string) => `'${value}'`],
  [8, (value: string) => value],
  [524288, (value) => JSON.stringify(value)],
  [65536, () => 'null'],
  [32768, () => 'undefined'],
]);
const syntaxKindMap = new Map<number, any>([
  [8, (value: string) => value],
  [10, (value: string) => `'${value}'`],
  [206, (value) => value],
  [104, () => 'null'],
  [153, () => 'undefined'],
]);
// 根据type的类型转换值为在字符串中的显示值
export const tagKindToString = (kind: number, value: string, isSyntaxKind = false, typeNode?) => {
  if (typeNode?.kind === 179) {
    return value;
  }
  const result = isSyntaxKind ? syntaxKindMap.get(kind) : typeFlagsMap.get(kind);
  if (result) {
    return result(value);
  }

  return value;
};

export const kindToType = new Map<number, number>([
  [8, 8],
  [10, 4],
  [206, 524288],
  [204, 524288],
  [104, 65536],
  [153, 32768],
]);

const parseTypeFlags = new Map<number, any>([
  [4, (value = '') => value.replace(/^["|'](.*)["|']$/g, '$1')],
  [8, (value = '1') => Number(value)],
  [65536, () => null],
  [32768, () => undefined],
  [524288, (value) => value?.replace(/^["|'](.*)["|']$/g, '$1')],
]);
const parseSyntaxKind = new Map<number, any>([
  [8, (value = '1') => Number(value)],
  [10, (value = '') => value.replace(/^["|'](.*)["|']$/g, '$1')],
  [104, () => null],
  [153, () => undefined],
]);
// 根据type的类型转换值为正常类型值
export const parseValue = (kind: number, value: string, isSyntaxKind = false, typeNode?) => {
  if (typeNode?.kind === 179) {
    return value;
  }
  const result = isSyntaxKind ? parseSyntaxKind.get(kind) : parseTypeFlags.get(kind);
  if (result) {
    return result(value);
  }

  return value;
};
export const concatExpression = (variable: ExpressionList[], constant: ExpressionList[], validate = false) => {
  const variableList = Array.isArray(variable) ? [].concat(variable) : [];
  constant?.forEach((element) => {
    let repeat = false;
    for (let i = 0; i < variableList.length; i++) {
      if (variableList[i].text === element.text) {
        if (validate && variableList[i].value !== element.value) {
          console.warn(`条件判断存在冲突：${JSON.stringify(variableList[i])} - ${JSON.stringify(element)}，请检查是否满足逻辑表达式`);
        }
        variableList[i] = element;
        repeat = true;
        break;
      }
    }
    if (!repeat) {
      variableList.push(element);
    }
  });

  return variableList;
};
const typeFlags = new Map<number, any>([
  [1, 'any'],
  [4, 'mock'],
  [8, 1],
  [65536, null],
  [32768, undefined],
  [524288, ['test']],
]);
// 返回mock值
export const mockValue = (kind: number) => {
  return typeFlags.get(kind);
};
const mockKindValue = new Map<number, any>([
  [130, 'mock'],
  [133, true],
  [150, 'mock'],
  [147, 1],
]);
export const mockSymbolValue = (symbol: ts.Symbol, typeChecker: ts.TypeChecker) => {
  const value = {};
  if (symbol?.members) {
    const name = symbol.escapedName;
    symbol.members.forEach((member) => {
      const valueDeclaration = member.valueDeclaration as any;
      if (valueDeclaration?.questionToken || member.escapedName === 'T' || valueDeclaration?.type === undefined) {
        return;
      }
      const mockValue = mockKindValue.get(valueDeclaration.type.kind);
      if (mockValue) {
        value[valueDeclaration.name.escapedText] = mockValue;
      } else if (ts.isArrayTypeNode(valueDeclaration.type)) {
        const arr = [];
        const type = typeChecker.getTypeAtLocation(valueDeclaration.type.elementType).getSymbol();
        if (type?.escapedName !== name) {
          arr.push(mockSymbolValue(type, typeChecker));
        }
        value[valueDeclaration.name.escapedText] = arr;
      } else if (ts.isTypeReferenceNode(valueDeclaration.type)) {
        const referenceSymbol = typeChecker.getTypeAtLocation(valueDeclaration.type).getSymbol();
        value[valueDeclaration.name.escapedText] = mockSymbolValue(referenceSymbol, typeChecker);
      }
    });
  }
  return value;
};

const typeString = new Map<string, any>([
  ['string', { value: 'mock', kind: 10 }],
  ['number', { value: 1, kind: 8 }],
  ['object', { value: {}, kind: 524288 }],
  ['function', { value: () => {}, kind: 16384 }],
  ['undefined', { value: undefined, kind: 32768 }],
]);
// 返回mock值
export const mockValueFromStringType = (type: string) => {
  const data = type.replace(/"|'/g, '');
  return typeString.get(data);
};

const unTypeString = new Map<string, any>([
  ['string', { value: 1, kind: 8 }],
  ['number', { value: 'mock', kind: 4 }],
  ['object', { value: 'mock', kind: 4 }],
  ['function', { value: 'mock', kind: 4 }],
  ['undefined', { value: 'mock', kind: 4 }],
]);
// 返回mock值
export const mockUnValueFromStringType = (type: string) => {
  const data = type.replace(/"|'/g, '');
  return unTypeString.get(data);
};

// 设置测试用例显示值
export const testNameView = (name: any) => {
  if (Array.isArray(name)) {
    return 'array';
  } else if (typeof name === 'object') {
    return 'object';
  }

  return name;
};
