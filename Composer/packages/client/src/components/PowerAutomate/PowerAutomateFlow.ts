// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface PowerAutomateFlowVariable {
  name: string;
  value?: string | number | boolean | undefined;
}

export interface PowerAutomateFlow {
  id: string;
  displayName: string;
  inputProperties?: PowerAutomateFlowVariable[] | undefined;
  outputProperties?: PowerAutomateFlowVariable[] | undefined;
}
