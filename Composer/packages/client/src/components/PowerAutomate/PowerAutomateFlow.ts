// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface PowerAutomateFlowVariable {
  name: string;
  valueType: 'string' | 'number' | 'boolean';
}

export interface PowerAutomateFlow {
  id: string;
  displayName: string;
  inputProperties?: PowerAutomateFlowVariable[] | undefined;
  outputProperties?: PowerAutomateFlowVariable[] | undefined;
}
