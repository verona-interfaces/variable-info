export type VariableInfoValueType = string | number | boolean;

export interface VariableValue {
  value: VariableInfoValueType;
  label: string
}
export interface VariableInfo {
  id: string;
  alias?: string;
  type: 'string' | 'integer' | 'number' | 'boolean' | 'attachment' | 'json' | 'no-value' | 'coded';
  format: 'text-selection' | 'image' | 'capture-image' | 'audio' | 'ggb-file' | 'non-negative' |
      'latex' | 'math-ml' | 'math-table' | 'math-text-mix' | 'ggb-variable' | '';
  multiple: boolean;
  nullable: boolean;
  values: VariableValue[];
  valuePositionLabels: string[];
  valuesComplete?: boolean;
  page?: string;
}

export class VariableList {
  variables: VariableInfo[] = [];

  constructor(varInfos: VariableInfo[] | null) {
    // later clean/validate if necessary
    this.variables = varInfos || [];
  }
}