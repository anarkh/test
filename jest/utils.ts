export const logger = (...args: any) => {
  if (process.env.node_env === 'development') {
    console.log(...args);
  }
}

export function isBinaryExpressionOperatorToken(token) {
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