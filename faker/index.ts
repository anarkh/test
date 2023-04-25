import * as TJS from 'typescript-json-schema';
import * as jsf from 'json-schema-faker';
import { JSONSchema7 } from 'json-schema';

const settings = {
  required: true,
  defaultProps: true,
};
const compilerOptions = {
  strictNullChecks: true,
};
const program = TJS.getProgramFromFiles(['/Users/bytedance/github/test/faker/test.ts'], compilerOptions);
const shapeSchema = TJS.generateSchema(program, 'Context', settings) as JSONSchema7;
console.log(shapeSchema);
jsf.JSONSchemaFaker.format('a', null);
const syncValue = jsf.JSONSchemaFaker.generate(shapeSchema);
console.log(syncValue);
console.log(jsf.JSONSchemaFaker.generate({ type: 'null' }));
