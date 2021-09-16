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
import React, { useCallback, useMemo, useState } from 'react';
import { SharedColors } from '@uifabric/fluent-theme';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

export interface PowerAutomateFlowVariable {
  name: string;
  value?: string | number | boolean | undefined;
}

export interface PowerAutomateFlow {
  flowId: string;
  displayName: string;
  inputProperties?: PowerAutomateFlowVariable[] | undefined;
  outputProperties?: PowerAutomateFlowVariable[] | undefined;
}

export interface SelectFlowMenuProps extends Omit<FieldProps, 'onChange'> {
  flows: PowerAutomateFlow[];
  onChange: (item?: IContextualMenuItem) => void;
}

export const SelectFlow: React.FC<FieldProps> = (props) => {
  const { onChange } = props;
  const flows: PowerAutomateFlow[] = [
    {
      flowId: 'abcdefg',
      displayName: 'Test Flow #1',
    },
    {
      flowId: 'hijklmno',
      displayName: 'Test Flow #2',
    },
  ];
  const handleChange = (item?: IContextualMenuItem) => {
    if (item) {
      onChange(item.key);
    } else {
      onChange(null);
    }
  };
  return <SelectFlowMenu {...props} flows={flows} onChange={handleChange} />;
};

const buttonStyles: IButtonStyles = {
  root: { outline: '1px solid transparent', padding: '0 8px', textAlign: 'left' },
  rootFocused: {
    outlineWidth: '0px',
    border: `1px solid ${SharedColors.cyanBlue10}`,
    selectors: {
      '::after': {
        content: '',
        // need to use !important to override global focus class specificity
        border: `1px solid ${SharedColors.cyanBlue10} !important`,
        outline: 'none !important',
        inset: '0 !important',
      },
    },
  },
  rootHovered: { backgroundColor: 'initial' },
  rootPressed: {
    backgroundColor: 'initial',
    outlineWidth: '0px',
    border: `1px solid ${SharedColors.cyanBlue10}`,
    selectors: {
      '::after': {
        content: '',
        // need to use !important to override global focus class specificity
        border: `1px solid ${SharedColors.cyanBlue10} !important`,
        outline: 'none !important',
        inset: '0 !important',
      },
    },
  },
  rootChecked: { backgroundColor: 'initial' },
  rootExpanded: { backgroundColor: 'initial' },
  rootExpandedHovered: { backgroundColor: 'initial' },
  flexContainer: { justifyContent: 'space-between' },
  label: { margin: '0', fontWeight: 'normal' },
};

export const SelectFlowMenu: React.FC<SelectFlowMenuProps> = (props) => {
  const { label, description, id, required, flows, onChange, onBlur, onFocus, value = '' } = props;
  const menuId = useMemo(() => getId('select-flow-menu'), []);

  const allItems: IContextualMenuItem[] = useMemo(() => {
    return flows.map((f) => ({
      key: f.flowId,
      text: f.displayName,
      isSelected: value === f.displayName,
      data: f,
    }));
  }, [flows.length]);
  const [flowItems, setFlowItems] = useState(allItems);

  const items = useMemo<IContextualMenuItem[]>(
    () => [
      {
        key: 'flows',
        itemType: ContextualMenuItemType.Section,
        sectionProps: {
          items: flowItems,
        },
      },
    ],
    [flowItems]
  );

  const selectedLabel = useMemo(() => {
    const selected = allItems.find((i) => i.key === value);
    return selected?.text;
  }, [items, value]);

  const handleItemClick = useCallback(
    (e, item?: IContextualMenuItem) => {
      setFlowItems(allItems);
      onChange(item);
    },
    [flowItems]
  );

  return (
    <React.Fragment>
      <FieldLabel description={description} id={id} label={label} required={required} />
      <ClassNames>
        {({ css }) => (
          <DefaultButton
            id={id}
            menuProps={{
              id: menuId,
              items,
              onItemClick: handleItemClick,
              useTargetWidth: true,
              className: css`
                .ms-ContextualMenu-list .ms-ContextualMenu-list {
                  // 10 items @ 36px each + 2px padding
                  max-height: 362px;
                  overflow-y: scroll;
                }
              `,
            }}
            styles={buttonStyles}
            text={selectedLabel || ' '}
            onBlur={() => onBlur?.(id, value)}
            onFocus={(e) => onFocus?.(id, value, e)}
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
          flowId: {
            field: SelectFlow,
          },
        },
      },
    },
  },
};
