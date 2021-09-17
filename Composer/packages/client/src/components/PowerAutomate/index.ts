// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SDKKinds } from '@botframework-composer/types';

import { SelectFlow } from './SelectFlow';
import { PowerAutomateParameterField } from './PowerAutomateParameterField';

export default {
  uiSchema: {
    [SDKKinds.BeginPowerAutomate]: {
      form: {
        properties: {
          flow: {
            field: SelectFlow,
          },
          inputParameters: {
            additionalField: true,
            field: PowerAutomateParameterField,
            label: 'Input parameters to the flow',
            properties: {
              input: true,
            },
          },
          outputProperties: {
            additionalField: true,
            field: PowerAutomateParameterField,
            label: 'Output properties to store flow return values',
            properties: {
              input: false,
            },
          },
        },
      },
    },
  },
};
