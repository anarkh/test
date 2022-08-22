import ts from "typescript";

interface Parameters {

  name: string;
  type: string;
  typeFlag: ts.TypeFlags;
  defaultValue: any;
}
export interface FunctionNode {

  name: string;
  parameters: Parameters;
  type:  string;
  typeFlag: ts.TypeFlags;
  body: ts.Block;
}
interface Case {
  text: string;
  value: any;
}
export interface ExpressionList {
  kind: number;
  text: string;
  weight?: number;
  trueCase?: Case[];
  falseCase?: Case[];
}