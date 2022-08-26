import ts from "typescript";

interface Parameters {
  name: string; // 参数名
  type: string; // 参数类型
  typeFlag: ts.TypeFlags; // 参数类型flag
  defaultValue: any; // 默认值
  tag: Tag[]; // 注释中参数值
}
export interface FunctionNode {
  name: string; // 方法名
  parameters: Parameters[]; // 参数列表
  type:  string; // 返回值类型
  typeFlag: ts.TypeFlags; // 返回值类型 flag
  body: ts.Block; // 方法体
  tag: Tag; // 注释中返回值
}
export interface Case {
  text: string;
  kind: number;
  value?: any;
}
export interface ExpressionList {
  kind: number;
  text: string;
  value?: any;
  weight?: number;
  trueCase?: Case[];
  falseCase?: Case[];
}

export interface Tag {
  text: string;
  type: string;
  typeFlag: number;
}

export type TagKind = Tag;

export interface TestStatement {
  doc: string;
  name: string;
  body: string;
  expect: string;
  assert: any;
}

export interface DescribeStatement {
  name: string;
  test: TestStatement[];
}