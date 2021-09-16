// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClassNames } from '@emotion/core';
import { FieldProps } from '@bfc/extension-client';
import { FieldLabel } from '@bfc/adaptive-form';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import React, { useCallback, useMemo, useState } from 'react';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

import { PowerAutomateFlow } from './PowerAutomateFlow';
import { buttonStyles } from './styles';

interface SelectFlowMenuProps extends Omit<FieldProps, 'onChange'> {
  flows: PowerAutomateFlow[];
  onChange: (item?: IContextualMenuItem) => void;
}

const SelectFlowMenu: React.FC<SelectFlowMenuProps> = (props) => {
  const { label, description, id, required, flows, onChange, onBlur, onFocus, value = '' } = props;
  const menuId = useMemo(() => getId('select-flow-menu'), []);

  const allItems: IContextualMenuItem[] = useMemo(() => {
    return flows.map((f) => ({
      key: f.id,
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
    const selected = allItems.find((i) => i.key === value.id);
    return selected?.text;
  }, [items, value]);

  const handleItemClick = useCallback(
    (_e, item?: IContextualMenuItem) => {
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

export const SelectFlow: React.FC<FieldProps> = (props) => {
  const { onChange } = props;
  const flows: PowerAutomateFlow[] = [
    {
      id: 'abcdefg',
      displayName: 'Test Flow #1',
      inputProperties: [
        {
          name: 'inputProperty1',
        },
      ],
    },
    {
      id: 'hijklmno',
      displayName: 'Test Flow #2',
    },
  ];
  const handleChange = (item?: IContextualMenuItem) => {
    if (item) {
      onChange(item.data);
    } else {
      onChange(null);
    }
  };
  return <SelectFlowMenu {...props} flows={flows} onChange={handleChange} />;
};
