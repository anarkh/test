import ts from 'typescript';
import { Case, ExpressionList } from './types';
import { concatExpression, kindToType, mockUnValueFromStringType, mockValueFromStringType, parseValue } from './utils';

export const mathCalculate = (left: ExpressionList, right: ExpressionList, operate: ExpressionList, isReverse = false): ExpressionList => {
  const leftNumber = Number(left.text);
  const rightNumber = Number(right.text);

  let result;
  if (isReverse) {
    switch (operate.kind) {
      case 39: 
        result = leftNumber - rightNumber;
      case 40:
        result = leftNumber + rightNumber;
      case 41: 
        result = leftNumber / rightNumber;
      case 43:
        result = leftNumber * rightNumber;
      case 44:
        result = leftNumber + rightNumber;
    }
  } else {
    switch (operate.kind) {
      case 39: 
        result = leftNumber+rightNumber;
      case 40:
        result = leftNumber-rightNumber;
      case 41: 
        result = leftNumber*rightNumber;
      case 43:
        result = leftNumber/rightNumber;
      case 44:
        result = leftNumber%rightNumber;
    }
  }

  return {
    text: result,
    kind: 8,
  }
}

const changeCase = (variable: ExpressionList): ExpressionList => {
  return {
    ...variable,
    trueCase: variable.falseCase,
    falseCase: variable.trueCase,
  }
}

const getPropertyValue = (expression: ts.PropertyAccessExpression, value) => {
  const trueMock = {};
  const falseMock = {};
  trueMock[expression.name.getText()] = value.trueMock;
  falseMock[expression.name.getText()] = value.falseMock;

  const result = { trueMock, falseMock };
  if (ts.isPropertyAccessExpression(expression.expression)) {
    return getPropertyValue(expression.expression, result);
  }

  return result;
}
const getPropertyKey = (expression) => {
  if (ts.isPropertyAccessExpression(expression.expression)) {
    return getPropertyKey(expression.expression);
  }

  return expression.expression.escapedText;
}

const typeOfExpression = (variable: ExpressionList, constant: ExpressionList) => {
  const trueCase = mockValueFromStringType(constant.text);
  const falseCase = mockUnValueFromStringType(constant.text);
  if (ts.isPropertyAccessExpression(variable.expression)) {
    const { trueMock, falseMock } = getPropertyValue(variable.expression, {
      trueMock: trueCase.value,
      falseMock: falseCase.value,
    });
    const text = getPropertyKey(variable.expression);
    return {
      trueCase: [{
        text,
        kind: 524288,
        value: trueMock,
      }],
      falseCase: [{
        text,
        kind: 524288,
        value: falseMock,
      }],
    };
  } else {
    const text = variable.expression.getText();
    return {
      trueCase: [{
        text,
        kind: trueCase.kind,
        value: trueCase.value,
      }],
      falseCase: [{
        text,
        kind: falseCase.kind,
        value: falseCase.value,
      }],
    }
  }
}
export const plus = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  if (variable.kind === -1) {
    const value = variable.trueCase[0].value;
    if (value === -constant.text) {
      return changeCase(variable);
    } else {
      variable.trueCase[0].value -= Number(constant.text);
      return variable;
    }
  } else {
    const value = Number(constant.text);
    return {
      text: 'result',
      kind: -1,
      trueCase: [{
        text: `${value + 1}`,
        kind: variable.kind,
      }],
      falseCase: [{
        text: `${- value}`,
        kind: variable.kind,
      }],
    }
  }
}
export const minus = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  if (variable.kind === -1) {
    const value = variable.trueCase[0].value;
    if (value === constant.text) {
      return changeCase(variable);
    } else {
      variable.trueCase[0].value += Number(constant.text);
      return variable;
    }
  } else {
    const value = Number(constant.text);
    return {
      text: 'result',
      kind: -1,
      trueCase: [{
        text: `${value + 1}`,
        kind: variable.kind,
      }],
      falseCase: [{
        text: `${value}`,
        kind: variable.kind,
      }],
    }
  }
}
export const asterisk = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  return variable;
}
export const slash = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  return variable;
}
export const percent = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  const constantValue = Number(constant.text);
  const value = variable.kind === -1? variable.trueCase[0].value : variable.text;
  const remainderPlus = constantValue === 1 ? 0.5 : constantValue + 1;
  const remainder = value%constantValue;
  if (variable.kind === -1) {
    if (remainder === 0) {
      const result = changeCase(variable);
      result.trueCase[0].value = variable.falseCase[0].value + remainderPlus;
      return result;
    } else {
      variable.falseCase[0].value = value + remainder;
      return variable;
    }
  } else {
    return {
      text: 'result',
      kind: -1,
      trueCase: [{
        text: constant.text + remainderPlus,
        kind: variable.kind,
      }],
      falseCase: [{
        text: constant.text,
        kind: variable.kind,
      }],
    }
  }
}
export const ampersandAmpersand = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  const trueCase = concatExpression(variable.trueCase, constant.trueCase, true);
  const falseCase = concatExpression(variable.trueCase, constant.falseCase, true);

  return {
    text: variable.text,
    kind: variable.kind,
    trueCase,
    falseCase,
  }
}
export const barBar = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  const trueCase = concatExpression(variable.falseCase, constant.trueCase);
  const falseCase = concatExpression(variable.falseCase, constant.falseCase);
  return {
    text: variable.text,
    kind: variable.kind,
    trueCase,
    falseCase,
  }
}
export const exclamationEquals = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  if (ts.SyntaxKind.TypeOfExpression === variable.kind) {
    const text = variable.expression.getText();
    const kind = variable.expression.kind;
    return {
      text,
      kind,
      trueCase: [{
        text,
        kind: mockUnValueFromStringType(constant.text).kind,
        value: mockUnValueFromStringType(constant.text).value,
      }],
      falseCase: [{
        text,
        kind: mockValueFromStringType(constant.text).kind,
        value: mockValueFromStringType(constant.text).value,
      }],
    }
  }
  const value = parseValue(constant.kind, constant.text);
  return {
    text: variable.text,
    kind: variable.kind,
    trueCase: [{
      text: variable.text,
      kind: constant.kind,
      value: value + 1,
    }],
    falseCase: [{
      text: variable.text,
      kind: constant.kind,
      value: value,
    }],
  }
}
export const equalsEqualsEquals = (variable: ExpressionList, constant: ExpressionList): ExpressionList => {
  if (ts.SyntaxKind.TypeOfExpression === variable.kind) {
    const text = variable.expression.getText();
    const kind = variable.expression.kind;
    const { trueCase, falseCase} = typeOfExpression(variable, constant);
    return {
      text,
      kind,
      trueCase,
      falseCase,
    }
  }

  const value = parseValue(constant.kind, constant.text);
  if (variable.kind === 206 && ts.isPropertyAccessExpression(variable.expression)) {
    const { trueMock, falseMock } = getPropertyValue(variable.expression, value);
  
    return {
      text: variable.text,
      kind: variable.kind,
      trueCase: [{
        text: variable.text,
        kind: 524288,
        value: trueMock,
      }],
      falseCase: [{
        text: variable.text,
        kind: 524288,
        value: falseMock,
      }],
    }
  }
  
  return {
    text: variable.text,
    kind: variable.kind,
    trueCase: [{
      text: variable.text,
      kind: constant.kind,
      value: value,
    }],
    falseCase: [{
      text: variable.text,
      kind: constant.kind,
      value: value + 1,
    }],
  }
}
export const includes = (variable: ExpressionList): ExpressionList => {
  let trueCase: Case; 
  let falseCase: Case; 
  if (ts.isPropertyAccessExpression(variable.expression) && ts.isArrayLiteralExpression(variable.expression.expression)) {
    const elements = variable.expression.expression.elements;
    if (elements.length > 0) {
      const typeFlag = kindToType.get(elements[0].kind);
      trueCase = {
        text: variable.text,
        kind: typeFlag,
        value: parseValue(elements[0].kind, elements[0].getText(), true),
      };
      const falseValue = elements.reduce((previousValue, currentValue) => {
        const value = parseValue(currentValue.kind, currentValue.getText(), true);
        return `${previousValue}.${value}`;
      }, 'mock');
      falseCase = {
        text: variable.text,
        kind: 4,
        value: falseValue,
      };
      return {
        text: variable.text,
        kind: variable.kind,
        trueCase: [trueCase],
        falseCase: [falseCase],
      };
    }
  }
  return {
    text: variable.text,
    kind: variable.kind,
    trueCase: [],
    falseCase: [{
      text: variable.text,
      kind: 4,
      value: 'mock',
    }],
  };
}