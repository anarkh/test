import { ExpressionList, TagKind } from "./types";

export const logger = (...args: any) => {
  if (process.env.node_env === 'development') {
    console.log(...args);
  }
}

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
}


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
}

const typeFlagsMap = new Map([
  [ 4, (value: string) => `'${value}'` ],
  [ 8, (value: string) => value ],
]);
const syntaxKindMap = new Map<number, any>([
  [ 8, (value: string) => value ],
  [ 10, (value: string) => `'${value}'` ],
]);
// 根据type的类型转换值为在字符串中的显示值
export const tagKindToString = (kind: number, value: string, isSyntaxKind = false) => {
  const result = isSyntaxKind ? syntaxKindMap.get(kind) : typeFlagsMap.get(kind);
  if (result) {
    return result(value);
  }

  return value;
};

export const kindToType = new Map<number, number>([
  [ 8, 8 ],
  [ 10, 4 ],
]);

const parseTypeFlags = new Map<number, any>([
  [ 4, (value: string) => value.replace(/^["|'](.*)["|']$/g,"$1") ],
  [ 8, (value: string) => Number(value) ],
]);
const parseSyntaxKind = new Map<number, any>([
  [ 8, (value: string) => Number(value) ],
  [ 10, (value: string) => value.replace(/^["|'](.*)["|']$/g,"$1") ],
]);
// 根据type的类型转换值为正常类型值
export const parseValue = (kind: number, value: string, isSyntaxKind = false) => {
  const result = isSyntaxKind ? parseSyntaxKind.get(kind) : parseTypeFlags.get(kind);
  if (result) {
    return result(value);
  }

  return value;
};
export const concatExpression = (variable: ExpressionList[], constant: ExpressionList[], validate = false) => {
  const variableList = [].concat(variable);
  constant.forEach(element => {
    let repeat = false;
    for (let i = 0; i < variableList.length; i++) {
      if (variableList[i].text === element.text) {
        if (validate && variableList[i].value !== element.value) {
          throw Error(`条件判断异常，${element.text}无法满足逻辑表达式`);
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
}
const typeFlags = new Map<number, any>([
  [ 4, 'mock' ],
  [ 8, 1 ],
]);
// 返回mock值
export const mockValue = (kind: number) => {
  return typeFlags.get(kind);
}
const typeString = new Map<string, any>([
  [ 'string', { value: 'mock', kind: 4 } ],
  [ 'number', { value: 1, kind: 8 } ],
]);
// 返回mock值
export const mockValueFromStringType = (type: string) => {
  return typeString.get(type);
}

const unTypeString = new Map<string, any>([
  [ 'string', { value: 1, kind: 8 } ],
  [ 'number', { value: 'mock', kind: 4 } ],
]);
// 返回mock值
export const mockUnValueFromStringType = (type: string) => {
  return unTypeString.get(type);
}
