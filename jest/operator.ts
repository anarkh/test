import { ExpressionList } from './types';

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
        text: variable.text,
        value: value + 1,
      }],
      falseCase: [{
        text: variable.text,
        value: - value,
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
        text: variable.text,
        value: value + 1,
      }],
      falseCase: [{
        text: variable.text,
        value: value,
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
        text: variable.text,
        value: constant.text + remainderPlus,
      }],
      falseCase: [{
        text: variable.text,
        value: constant.text,
      }],
    }
  }
}