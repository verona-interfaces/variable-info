export type VariableInfoValueType = string | number | boolean;

export interface VariableValue {
  value: VariableInfoValueType;
  label: string
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