// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClassNames } from '@emotion/core';
import { FieldProps, SDKKinds } from '@bfc/extension-client';
import { FieldLabel } from '@bfc/adaptive-form';
import {
  IContextualMenuItem,
  ContextualMenuItemType,
  IContextualMenuListProps,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import React from 'react';

export interface SelectFlowMenuProps extends FieldProps {
  flows: string[];
}

export const SelectFlow: React.FC<FieldProps> = (props) => {
  return <SelectFlowMenu {...props} flows={[]} />;
};

export const SelectFlowMenu: React.FC<SelectFlowMenuProps> = (props) => {
  const { label, description, id, required, value = '' } = props;

  const items: IContextualMenuItem[] = [
    {
      key: 'flows',
      itemType: ContextualMenuItemType.Section,
      sectionProps: {
        items: [
          {
            key: 'testingKey',
            text: 'testingText',
          },
        ],
      },
    },
  ];

  return (
    <React.Fragment>
      <FieldLabel description={description} id={id} label={label} required={required} />
      <ClassNames>
        {({ css }) => (
          <DefaultButton
            id={id}
            menuProps={{
              items,
            }}
          />
        )}
      </ClassNames>
    </React.Fragment>
  );
};

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
