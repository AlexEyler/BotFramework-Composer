// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SDKKinds } from '@botframework-composer/types';

import { SelectFlow } from './SelectFlow';

export default {
  uiSchema: {
    [SDKKinds.BeginPowerAutomate]: {
      form: {
        properties: {
          flow: {
            field: SelectFlow,
          },
        },
      },
    },
  },
};
