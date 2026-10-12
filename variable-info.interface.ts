export type VariableInfoValueType = string | number | boolean;

export interface VariableValue {
  value: VariableInfoValueType;
  label: string;
}
export interface VariableInfo {
  id: string;
  alias?: string;
  type: 'STRING' | 'INTEGER' | 'NUMBER' | 'BOOLEAN' | 'ATTACHMENT' | 'JSON' | 'NO_VALUE' | 'CODED';
  format: 'TEXT_SELECTION' | 'IMAGE' | 'CAPTURE_IMAGE' | 'AUDIO' | 'GGB_FILE' | 'NON_NEGATIVE' |
  'LATEX' | 'MATH_ML' | 'MATH_TABLE' | 'MATH_TEXT_MIX' | 'GGB_VARIABLE' | '';
  multiple: boolean;
  nullable: boolean;
  values: VariableValue[];
  valuePositionLabels: string[];
  valuesComplete?: boolean;
}

export class VariableList {
  variables: VariableInfo[] = [];

  constructor(varInfos: VariableInfo[] | null) {
    // later clean/validate if necessary
    this.variables = varInfos || [];
  }
}

export type VariableValidationErrorCode =
  'EMPTY_IDENTIFIER' |
  'INVALID_CHARACTERS' |
  'DUPLICATE_ID' |
  'DUPLICATE_ALIAS' |
  'PUBLIC_IDENTIFIER_COLLISION';

export interface VariableValidationError {
  code: VariableValidationErrorCode;
  variableIndex: number;
  property: 'id' | 'alias';
  value: unknown;
  conflictingVariableIndex?: number;
}

type VariableIdentifiers = Pick<VariableInfo, 'id' | 'alias'>;
type IdentifierProperty = VariableValidationError['property'];

const variableIdentifierPattern = /^[0-9A-Za-z_-]+$/;

/**
 * Checks a single variable identifier without modifying it.
 */
export function isValidVariableIdentifier(value: unknown): value is string {
  return typeof value === 'string' && variableIdentifierPattern.test(value);
}

/**
 * Validates identifiers and their uniqueness within a complete variable list.
 * Public identifiers are aliases when present and technical ids otherwise.
 */
export function validateVariableList(
  variables: ReadonlyArray<VariableIdentifiers>
): VariableValidationError[] {
  const errors: VariableValidationError[] = [];

  variables.forEach((variable, variableIndex) => {
    addIdentifierError(errors, variable.id, variableIndex, 'id');
    if (variable.alias !== undefined) {
      addIdentifierError(errors, variable.alias, variableIndex, 'alias');
    }
  });

  addDuplicateErrors(variables, 'id', 'DUPLICATE_ID', errors);
  addDuplicateErrors(variables, 'alias', 'DUPLICATE_ALIAS', errors);
  addPublicIdentifierCollisionErrors(variables, errors);

  return errors;
}

function addIdentifierError(
  errors: VariableValidationError[],
  value: unknown,
  variableIndex: number,
  property: IdentifierProperty
): void {
  if (!isValidVariableIdentifier(value)) {
    errors.push({
      code: value === '' ? 'EMPTY_IDENTIFIER' : 'INVALID_CHARACTERS',
      variableIndex,
      property,
      value
    });
  }
}

function addDuplicateErrors(
  variables: ReadonlyArray<VariableIdentifiers>,
  property: IdentifierProperty,
  code: 'DUPLICATE_ID' | 'DUPLICATE_ALIAS',
  errors: VariableValidationError[]
): void {
  const firstIndexByIdentifier = new Map<string, number>();

  variables.forEach((variable, variableIndex) => {
    const value = variable[property];
    if (!isValidVariableIdentifier(value)) return;

    const normalizedValue = value.toLowerCase();
    const conflictingVariableIndex = firstIndexByIdentifier.get(normalizedValue);
    if (conflictingVariableIndex === undefined) {
      firstIndexByIdentifier.set(normalizedValue, variableIndex);
    } else {
      errors.push({
        code,
        variableIndex,
        property,
        value,
        conflictingVariableIndex
      });
    }
  });
}

function addPublicIdentifierCollisionErrors(
  variables: ReadonlyArray<VariableIdentifiers>,
  errors: VariableValidationError[]
): void {
  const firstPublicIdentifier = new Map<string, {
    variableIndex: number;
    property: IdentifierProperty;
  }>();

  variables.forEach((variable, variableIndex) => {
    const property: IdentifierProperty = variable.alias === undefined ? 'id' : 'alias';
    const value = variable[property];
    if (!isValidVariableIdentifier(value)) return;

    const normalizedValue = value.toLowerCase();
    const conflicting = firstPublicIdentifier.get(normalizedValue);
    if (!conflicting) {
      firstPublicIdentifier.set(normalizedValue, { variableIndex, property });
    } else if (conflicting.property !== property) {
      errors.push({
        code: 'PUBLIC_IDENTIFIER_COLLISION',
        variableIndex,
        property,
        value,
        conflictingVariableIndex: conflicting.variableIndex
      });
    }
  });
}
