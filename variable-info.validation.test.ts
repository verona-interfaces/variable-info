import Ajv, { ValidateFunction } from 'ajv';
import fs from 'fs';
import path from 'path';
import {
  isValidVariableIdentifier,
  validateVariableList,
  VariableValidationError,
  VariableValidationErrorCode
} from './variable-info.interface';

interface VariableValidationCases {
  identifierCases: {
    valid: string[];
    invalid: Array<{ value: string; code: VariableValidationErrorCode }>;
  };
  variableListCases: Array<{
    name: string;
    variables: Array<{ id: string; alias?: string }>;
    errors: VariableValidationError[];
  }>;
}

const validationCases: VariableValidationCases = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'test/variable-validation-cases.json'),
  'utf8'
));
const schema = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'variable-info.schema.json'),
  'utf8'
));
const validateSchema: ValidateFunction = new Ajv({ allowUnionTypes: true }).compile(schema);

describe('variable identifiers', () => {
  test.each(validationCases.identifierCases.valid)('accepts %p', value => {
    expect(isValidVariableIdentifier(value)).toBe(true);
  });

  test.each(validationCases.identifierCases.invalid)('rejects $value', ({ value, code }) => {
    expect(isValidVariableIdentifier(value)).toBe(false);
    expect(validateVariableList([{ id: value }])).toEqual([
      expect.objectContaining({ code, variableIndex: 0, property: 'id', value })
    ]);
  });

  test('does not trim or rename values', () => {
    expect(isValidVariableIdentifier(' a')).toBe(false);
    expect(isValidVariableIdentifier('a ')).toBe(false);
  });

  test.each(['id', 'alias'] as const)(
    'JSON schema and TypeScript validator agree for %s',
    property => {
      validationCases.identifierCases.valid.forEach(value => {
        const variable = { id: 'fallback', type: 'STRING', [property]: value };
        expect(validateSchema(variable)).toBe(isValidVariableIdentifier(value));
      });
      validationCases.identifierCases.invalid.forEach(({ value }) => {
        const variable = { id: 'fallback', type: 'STRING', [property]: value };
        expect(validateSchema(variable)).toBe(isValidVariableIdentifier(value));
      });
    }
  );
});

describe('variable list validation', () => {
  test.each(validationCases.variableListCases)('$name', ({ variables, errors }) => {
    expect(validateVariableList(variables)).toEqual(errors);
  });
});
